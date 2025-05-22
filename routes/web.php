<?php

use App\Http\Controllers\ItemsController;
use App\Http\Controllers\MatchSearchController;
use App\Http\Controllers\PatchesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileSearchController;
use App\Http\Controllers\TermsController;
use App\Http\Controllers\PrivacyController;

Route::get('/terms', [TermsController::class, 'index'])
     ->name('terms');

Route::get('/privacy', [PrivacyController::class, 'index'])
    ->name('privacy');

Route::get('/patch-notes', [PatchesController::class, 'index'])
    ->name('patches');

Route::get('/profile-search', [ProfileSearchController::class, 'getMatchesParallel'])
     ->name('profile.search');

Route::get('/match', [MatchSearchController::class, 'getMatchesParallel'])
     ->name('match.search');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/error', function () {
    return Inertia::render('error');
})->name('error');

Route::get('/hot-searches', function () {
    return Inertia::render('hot-searches');
})->name('searches');

Route::get('/api/profile-matches', [ProfileSearchController::class, 'getMatchesPaginated']);

Route::get('/match-search', function () {
    return Inertia::render('matchSearch');
})->name('match.search.page');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
