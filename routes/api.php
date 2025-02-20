<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\Api\PostController;
use  App\Http\Controllers\Api\NotificationController;
use  App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Admin\DirectionsController;

Route::options('{any}', function (Request $request) {
    return response()->json('OK', 200, [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, X-Requested-With, Authorization',
    ]);
})->where('any', '.*');

Route::post('/post', [PostController::class, 'store'])->name('post');
Route::post('/notifications/store', [NotificationController::class, 'store'])->name('notifications.store');
Route::post('/devices/store', [DeviceController::class, 'store'])->name('devices.store');
Route::get('/devices/index', [DeviceController::class, 'index'])->name('devices.index');

Route::get('/directions', [DirectionsController::class, 'getDirections']);
