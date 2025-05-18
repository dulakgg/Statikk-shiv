<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class QueueStatusController extends Controller
{
    public function index()
{
    $statuses = Cache::get('riot.queue-statuses', []);

    return Inertia::render('QueueStatus', [
        'statuses' => $statuses,
    ]);
}
}
