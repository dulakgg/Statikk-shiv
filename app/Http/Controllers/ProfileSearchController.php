<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Search;
use Illuminate\Support\Facades\DB;

class ProfileSearchController extends Controller
{
    public function getMatchesParallel(Request $request) {
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

    $region = $request->query('region', 'eun1'); // default region if none provided
    $cluster = $clusterMap[strtolower($region)] ?? 'europe';

    $puuid = $request->query('puuid');
    $nickname = $request->query('nickname');
    $taglineRaw = str_replace('#', '', $request->query('tagline', ''));
    $tagline = rawurlencode($taglineRaw);
    if ($puuid) {
        $accData = Http::withHeaders(['X-Riot-Token' => $apiKey])
            ->get("https://$cluster.api.riotgames.com/riot/account/v1/accounts/by-puuid/$puuid");
        $nickname = $accData->json()['gameName'];
        $tagline = $accData->json()['tagLine'];
    }
    if (!$puuid) {
        $puuidResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
            ->get("https://$cluster.api.riotgames.com/riot/account/v1/accounts/by-riot-id/$nickname/$tagline");
        if (!$puuidResponse->successful()) {
            return Inertia::render('error', ['message' => 'Failed to get puuid from nickname and tagline']);
        }
        $puuid = $puuidResponse->json()['puuid'];
    }

    // Now we have a puuid, fetch summoner data by puuid
    $summonerResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
        ->get("https://$region.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/$puuid");

    if (!$summonerResponse->successful()) {
        return Inertia::render('error', ['message' => 'Failed to get summoner data']);
    }
    $summonerData = $summonerResponse->json();

    // Fetch recent matches by puuid
    $matchesResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
        ->get("https://$cluster.api.riotgames.com/lol/match/v5/matches/by-puuid/$puuid/ids", [
            'start' => 0,
            'count' => 10,
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
    $profileIcon = $summonerData['profileIconId'];
if ($nickname && $tagline && $region) {
    Search::updateOrCreate(
        [
            'nickname' => $nickname,
            'tagline'  => $tagline,
            'region'   => $region,
        ],
        [
            'count'      => DB::raw('count + 1'),
            'updated_at' => now(),
        ]
    );
}


    return Inertia::render('profile', [
        'data'     => $matchesDetails,
        'puuid'    => $puuid,
        'summoner' => $summonerData,
        'tagline'  => $tagline,
        'nickname' => $nickname,
        'region'   => $region,
        'profileiconid' => $profileIcon,
    ]);
}

}