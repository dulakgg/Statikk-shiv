<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class FetchRiotStatus extends Command
{
    protected $signature = 'riot:fetch-status';
    protected $description = 'Fetch and cache Riot Games server status for all regions';

    public function handle()
    {
        $apiKey = config('services.api.key');

        $regions = [
            'br1', 'la1', 'la2', 'na1', 'oc1',
            'eun1', 'euw1', 'ru', 'tr1', 'me1', 'kr',
            'jp1', 'sg2', 'tw2', 'vn2'
        ];

        $this->info('Fetching Riot server status...');

        $responses = Http::timeout(3)
            ->retry(2, 300)
            ->pool(function (Pool $pool) use ($regions, $apiKey) {
                return array_map(fn($region) =>
                    $pool->withHeaders(['X-Riot-Token' => $apiKey])
                         ->get("https://$region.api.riotgames.com/lol/status/v4/platform-data"),
                    $regions
                );
            });

        $results = [];

        foreach ($regions as $i => $region) {
            $response = $responses[$i];

            $data = $response->successful()
                ? $response->json()
                : null;

            $results[] = [
                'region' => strtoupper($region),
                'status' => $data['status']['description'] ?? 'All Systems Operational',
                'indicator' => $data['status']['indicator'] ?? 'none',
                'maintenances' => $data['maintenances'] ?? [],
                'incidents' => $data['incidents'] ?? [],
                'error' => $data ? false : true,
            ];
        }

        Cache::put('riot.statuses', $results, now()->addMinutes(5));

        $this->info('Riot server status cached successfully.');

        return 0;
    }
}
