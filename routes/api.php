<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\RiotStatusController;

Route::get('/status', [RiotStatusController::class, 'index'])
    ->name('riot.status');

Route::get('/hot-searches', [SearchController::class, 'hotSearches']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
