<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;


Route::get('/hot-searches', [SearchController::class, 'hotSearches']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
