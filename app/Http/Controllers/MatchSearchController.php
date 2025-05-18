<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;
use Inertia\Inertia;

class MatchSearchController extends Controller
{
    public function getMatchesParallel(Request $request)
    {
        $nickname = $request->query('nickname');
        $profileIconYAY = $request->query('profileiconwow');
        $taglineRaw = str_replace('#', '', $request->query('tagline', ''));
        $tagline = rawurlencode($taglineRaw);
        $apiKey = config('services.riot.api_key');
        $clusterMap = [
            'br1' => 'americas',  'la1' => 'americas', 'la2' => 'americas',
            'na1' => 'americas',  'oc1' => 'americas',
            'eun1'=> 'europe',    'euw1'=> 'europe',   'ru'  => 'europe',
            'tr1' => 'europe',    'me1' => 'europe',
            'kr'  => 'asia',      'jp1' => 'asia',     'sg2' => 'asia',
            'tw2' => 'asia',      'vn2' => 'asia',
        ];

        $region  = strtolower($request->query('region', 'euw1'));
        $cluster = $clusterMap[$region] ?? 'europe';
        $matchId = $request->query('matchId');
        if (! $matchId) {
            return Inertia::render('error', [
                'message' => 'No matchId provided.'
            ]);
        }
        $matchResponse = Http::withHeaders([
            'X-Riot-Token' => $apiKey,
        ])->get("https://{$cluster}.api.riotgames.com/lol/match/v5/matches/{$matchId}");

        if (! $matchResponse->successful()) {
            return Inertia::render('error', [
                'message' => 'Failed to fetch match details.'
            ]);
        }
        $matchDetail = $matchResponse->json();
        $participantPuuids = data_get($matchDetail, 'metadata.participants', []);
        $summonerResponses = Http::pool(function (Pool $pool) use ($participantPuuids, $apiKey, $region) {
            foreach ($participantPuuids as $puuid) {
                $pool->withHeaders([
                    'X-Riot-Token' => $apiKey,
                ])->get("https://{$region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{$puuid}");
            }
        });
        $participants = [];
        foreach ($summonerResponses as $response) {
            if (! $response->successful()) {
                continue;
            }

            // 1️⃣ Get the participant’s match‐level data
            $summoner = $response->json();  
            $puuid     = $summoner['puuid'];

            // 2️⃣ Fetch account info (gameName & tagLine) by PUUID
            $accResponse = Http::withHeaders([
                'X-Riot-Token' => $apiKey,
            ])->get("https://{$cluster}.api.riotgames.com/riot/account/v1/accounts/by-puuid/{$puuid}");

            if ($accResponse->successful()) {
                $accData = $accResponse->json();
                // 3️⃣ Merge in the fields you want
                $summoner['gameName'] = $accData['gameName'];  
                $summoner['tagLine']  = $accData['tagLine'];
            } else {
                // fallback if account lookup fails
                $summoner['gameName'] = null;
                $summoner['tagLine']  = null;
            }

            // 4️⃣ Add to your participants list
            $participants[] = $summoner;
        }
        return Inertia::render('match', [
            'matchDetail'  => $matchDetail,
            'participants' => $participants,
            'region'       => $region,
            'matchId'      => $matchId,
            'puuid'        => $participantPuuids,
            'nickname'     => $nickname,
            'tagline'      => $tagline,
            'profileicon'  => $profileIconYAY,
        ]);
    }
}
