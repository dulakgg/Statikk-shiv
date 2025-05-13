<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProfileSearchController extends Controller
{
    public function getMatchesParallel(Request $request) {

        // dd(Auth::user());
        $apiKey = config('services.riot.api_key');
        $clusterMap = [
            'br1' => 'americas',
            'la1' => 'americas',
            'la2' => 'americas',
            'na1' => 'americas',
            'oc1' => 'americas',
            'eun1' => 'europe',
            'euw1' => 'europe',
            'ru'   => 'europe',
            'tr1'  => 'europe',
            'me1'  => 'europe',
            'kr'   => 'asia',
            'jp1'  => 'asia',
            'sg2'  => 'asia',
            'tw2'  => 'asia',
            'vn2'  => 'asia',
        ];
        $region = $request->query('region');
        $cluster = $clusterMap[strtolower($region)] ?? 'europe';
        $nickname = rawurlencode($request->query('nickname'));
        $tagline  = rawurlencode($request->query('tagline'));
        $puuidResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
            ->get("https://$cluster.api.riotgames.com/riot/account/v1/accounts/by-riot-id/$nickname/$tagline?}");
    
        if (!$puuidResponse->successful()) {
            return response()->json(['error' => 'Nie znaleziono gracza'], 404);
        }
        $puuid = $puuidResponse->json()['puuid'];
        $summonerResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
        ->get("https://$region.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/$puuid");
        if (!$summonerResponse->successful()) {
            return response()->json(['error' => 'Nie udało się pobrać danych summoner'], 500);
        }
        $summonerData = $summonerResponse->json();
        $matchesResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
            ->get("https://$cluster.api.riotgames.com/lol/match/v5/matches/by-puuid/$puuid/ids", [
                'start' => 0,
                'count' => 10
            ]);
        $matchIds = $matchesResponse->json();
        $responses = Http::pool(function (Pool $pool) use ($matchIds, $apiKey, $cluster) {
            foreach ($matchIds as $matchId) {
                $pool->withHeaders(['X-Riot-Token' => $apiKey])
                    ->get("https://$cluster.api.riotgames.com/lol/match/v5/matches/$matchId");
            }
        });
        $matchesDetails = [];
        foreach ($responses as $response) {
            if ($response->successful()) {
                $matchesDetails[] = $response->json();
            }
        }
        // dd($matchesDetails);
        return Inertia::render('profile', [
            'data'  => $matchesDetails,
            'puuid' => $puuid,
            'summoner' => $summonerData,
            'tagline' => $tagline, 
            'nickname' => $nickname
        ]);
    }
}