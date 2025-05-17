<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class RiotStatusController extends Controller
{
    public function Index()
    {
        $apiKey = config('services.riot.api_key');

        $regions = [
            'br1', 'la1', 'la2', 'na1', 'oc1',
            'eun1', 'euw1', 'ru', 'tr1', 'me1', 'kr',
            'jp1', 'sg2', 'tw2', 'vn2'
        ];

        $responses = Http::pool(function (Pool $pool) use ($regions, $apiKey) {
            foreach ($regions as $region) {
                $pool->withHeaders(['X-Riot-Token' => $apiKey])
                    ->get("https://$region.api.riotgames.com/lol/status/v4/platform-data");
            }
        });

        $statuses = [];

        foreach ($regions as $index => $region) {
            $response = $responses[$index];

            if ($response->successful()) {
                $data = $response->json();
                $statuses[] = [
                    'region' => strtoupper($region),
                    'status' => $data['status']['description'] ?? 'All Systems Operational',
                    'indicator' => $data['status']['indicator'] ?? 'none',
                    'maintenances' => $data['maintenances'] ?? [],
                    'incidents' => $data['incidents'] ?? [],
                ];
            } else {
                $statuses[] = [
                    'region' => strtoupper($region),
                    'status' => 'Error fetching status',
                    'indicator' => 'error',
                    'maintenances' => [],
                    'incidents' => [],
                ];
            }
        }

        return Inertia::render('status', [
            'statuses' => $statuses
        ]);
    }
}
