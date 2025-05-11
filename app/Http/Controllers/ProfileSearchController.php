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
        $region   = $request->query('region');
        $nickname = rawurlencode($request->query('nickname'));
        $tagline  = rawurlencode($request->query('tagline'));
        $puuidResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
            //->get("https://$region.api.riotgames.com/lol/summoner/v4/summoners/by-name/$nickname");
            ->get("https://$region.api.riotgames.com/riot/account/v1/accounts/by-riot-id/$nickname/$tagline?}");
    
        if (!$puuidResponse->successful()) {
            return response()->json(['error' => 'Nie znaleziono gracza'], 404);
        }
        $puuid = $puuidResponse->json()['puuid'];
        $summonerResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
        ->get("https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/$puuid");
        if (!$summonerResponse->successful()) {
            return response()->json(['error' => 'Nie udało się pobrać danych summoner'], 500);
        }
        $summonerData = $summonerResponse->json();
        $matchesResponse = Http::withHeaders(['X-Riot-Token' => $apiKey])
            ->get("https://$region.api.riotgames.com/lol/match/v5/matches/by-puuid/$puuid/ids", [
                'start' => 0,
                'count' => 20
            ]);
        $matchIds = $matchesResponse->json();
        $responses = Http::pool(function (Pool $pool) use ($matchIds, $apiKey, $region) {
            foreach ($matchIds as $matchId) {
                $pool->withHeaders(['X-Riot-Token' => $apiKey])
                    ->get("https://$region.api.riotgames.com/lol/match/v5/matches/$matchId");
            }
        });
        $matchesDetails = [];
        foreach ($responses as $response) {
            if ($response->successful()) {
                $matchesDetails[] = $response->json();
            }
        }
        
        return Inertia::render('profile', [
            'data'  => $matchesDetails,
            'puuid' => $puuid,
            'summoner' => $summonerData,
            'tagline' => $tagline, 
            'nickname' => $nickname
        ]);
    }
}