<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class FetchQueueStatus extends Command
{
    protected $signature = 'riot:fetch-queue-status';
    protected $description = 'Fetch and cache Riot Games queue status for all regions';

    public function handle()
    {
        $apiKey = config('services.riot.api_key');

        $regions = [
            'br1', 'la1', 'la2', 'na1', 'oc1',
            'eun1', 'euw1', 'ru', 'tr1', 'me1', 'kr',
            'jp1', 'sg2', 'tw2', 'vn2'
        ];

        $queues = [
            'RANKED_SOLO_5x5' => 'Ranked Solo/Duo',
            'RANKED_FLEX_SR' => 'Ranked Flex',
            'ARAM' => 'ARAM',
            'NORMAL' => 'Normal Draft',
        ];

        $this->info('Fetching Riot queue status...');

        $responses = Http::timeout(3)
            ->retry(2, 300)
            ->pool(function (Pool $pool) use ($regions, $apiKey) {
                return array_map(fn($region) =>
                    $pool->withHeaders(['X-Riot-Token' => $apiKey])
                         ->get("https://$region.api.riotgames.com/lol/status/v4/platform-data"),
                    $regions
                );
            });

        $statuses = [];

        foreach ($regions as $i => $region) {
            $response = $responses[$i];

            if ($response->successful()) {
                $data = $response->json();

                $queueStatus = [];
                foreach ($queues as $queueKey => $queueName) {
                    $queueStatus[$queueKey] = 'Operational';
                }

                $issues = array_merge($data['incidents'] ?? [], $data['maintenances'] ?? []);
                foreach ($issues as $issue) {
                    $desc = strtolower($issue['updates'][0]['translations'][0]['content'] ?? '');
                    foreach ($queues as $queueKey => $queueName) {
                        if (strpos($desc, strtolower($queueName)) !== false) {
                            $queueStatus[$queueKey] = 'Affected';
                        }
                    }
                }

                $statuses[] = [
                    'region' => strtoupper($region),
                    'status' => $data['status']['description'] ?? 'All Systems Operational',
                    'indicator' => $data['status']['indicator'] ?? 'none',
                    'queueStatus' => $queueStatus,
                ];
            } else {
                $statuses[] = [
                    'region' => strtoupper($region),
                    'status' => 'Error fetching status',
                    'indicator' => 'error',
                    'queueStatus' => [],
                ];
            }
        }

        Cache::put('riot.queue-statuses', $statuses, now()->addMinutes(5));

        $this->info('Riot queue status cached successfully.');

        return 0;
    }
}
