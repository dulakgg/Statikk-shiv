<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class QueueStatusController extends Controller
{
    public function index()
    {
        $apiKey = config('services.riot.api_key');

        $regions = [
            'br1', 'la1', 'la2', 'na1', 'oc1',
            'eun1', 'euw1', 'ru', 'tr1', 'me1', 'kr',
            'jp1', 'sg2', 'tw2', 'vn2'
        ];

        $responses = Http::pool(function ($pool) use ($regions, $apiKey) {
            foreach ($regions as $region) {
                $pool->withHeaders(['X-Riot-Token' => $apiKey])
                    ->get("https://$region.api.riotgames.com/lol/status/v4/platform-data");
            }
        });

        $statuses = [];

        // Typical queues you want to show status for
        $queues = [
            'RANKED_SOLO_5x5' => 'Ranked Solo/Duo',
            'RANKED_FLEX_SR' => 'Ranked Flex',
            'ARAM' => 'ARAM',
            'NORMAL' => 'Normal Draft',
        ];

        foreach ($regions as $index => $region) {
            $response = $responses[$index];

            if ($response->successful()) {
                $data = $response->json();

                // Extract queue status from incidents or maintenances descriptions
                $queueStatus = [];
                foreach ($queues as $queueKey => $queueName) {
                    $queueStatus[$queueKey] = 'Operational';
                }

                // Check incidents and maintenances for queue impact keywords (basic heuristic)
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

        return Inertia::render('QueueStatus', [
            'statuses' => $statuses,
        ]);
    }
}
