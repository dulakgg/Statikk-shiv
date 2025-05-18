<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class RiotStatusController extends Controller
{
    public function index()
    {
        
        $statuses = Cache::get('riot.statuses', []);

        return Inertia::render('status', [
            'statuses' => $statuses,
        ]);
    }

}
