<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocationController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(LocationController::class)->prefix('locations')->group(function () {

    Route::get('/', 'index');    

    Route::post('/store','store');   

});
