<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PrivacyController extends Controller
{
    /**
     * Show the Terms of Service React page.
     */
    public function index()
    {
        return Inertia::render('privacy', []);
    }
}
