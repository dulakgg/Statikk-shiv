<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileSearchController;
use App\Http\Controllers\RiotStatusController;
use App\Http\Controllers\QueueStatusController;

Route::get('/queue', [QueueStatusController::class, 'index'])
    ->name('queue.status');

Route::get('/status', [RiotStatusController::class, 'index'])
    ->name('riot.status');

Route::get('/profile-search', [ProfileSearchController::class, 'getMatchesParallel'])
     ->name('profile.search');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/hot-searches', function () {
    return Inertia::render('hot-searches');
})->name('searches');

Route::get('/privacy-policy', function () {
    $path = public_path('privacy-policy.pdf');
    return response()->file($path, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="privacy-policy.pdf"'
    ]);
});

Route::get('/terms-of-service', function () {
    $path = public_path('terms-of-service.pdf');
    return response()->file($path, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="terms-of-service.pdf"'
    ]);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
