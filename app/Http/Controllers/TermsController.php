<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TermsController extends Controller
{
    /**
     * Show the Terms of Service React page.
     */
    public function index()
    {
        return Inertia::render('terms', []);
    }
}
