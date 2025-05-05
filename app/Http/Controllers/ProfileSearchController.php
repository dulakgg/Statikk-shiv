<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class ProfileSearchController extends Controller
{
    public function show(Request $request)
    {
        $nickname = $request->query('nickname');
        $tagline  = $request->query('tagline');
        $region   = $request->query('region', 'europe');
        $apiKey   = config('services.riot.api_key');
        $accountData = Http::withOptions(['timeout' => 5])
            ->retry(2, 100)
            ->get("https://{$region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" .
                  urlencode($nickname) . "/" . urlencode($tagline), [
                'api_key' => $apiKey,
            ])
            ->throw()
            ->json();

        $puuid = $accountData['puuid'];
        $summonerData = Http::withOptions(['timeout' => 5])
            ->retry(2, 100)
            ->get("https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{$puuid}", [
                'api_key' => $apiKey,
            ])
            ->throw()
            ->json();
        $id            = $summonerData['id'];
        $accountId     = $summonerData['accountId'];
        $profileIconId = $summonerData['profileIconId'];
        $revisionDate  = Carbon::createFromTimestampMs(
            $summonerData['revisionDate']
        )->format('Y-m-d H:i:s');
        $summonerLevel = $summonerData['summonerLevel'];
        $matches = Cache::remember("matches.{$puuid}", 300, function () use (
            $region, $puuid, $apiKey
        ) {
            $matchIds = Http::withOptions(['timeout' => 5])
                ->retry(2, 100)
                ->get("https://{$region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{$puuid}/ids", [
                    'start'   => 0,
                    'count'   => 20,
                    'api_key' => $apiKey,
                ])
                ->throw()
                ->json();

            $allMatches = collect();
            foreach (array_chunk($matchIds, 5) as $chunk) {
                $responses = Http::withOptions(['timeout' => 5])
                    ->retry(2, 100)
                    ->pool(fn (Pool $pool) => collect($chunk)
                        ->map(fn ($matchId) => $pool->get(
                            "https://{$region}.api.riotgames.com/lol/match/v5/matches/{$matchId}",
                            ['api_key' => $apiKey]
                        ))->all()
                    );

                $allMatches = $allMatches->merge(
                    collect($responses)->map->json()
                );
                usleep(200_000);
            }

            return $allMatches->all();
        });
        return view('profile-search', compact(
            'nickname',
            'tagline',
            'region',
            'puuid',
            'id',
            'accountId',
            'profileIconId',
            'revisionDate',
            'summonerLevel',
            'matches'
        ));
    }
}