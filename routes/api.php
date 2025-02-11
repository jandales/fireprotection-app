<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\Api\PostController;
use  App\Http\Controllers\Api\NotificationController;
use  App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Admin\DirectionsController;

Route::post('/post', [PostController::class, 'store'])->name('post');
Route::post('/notifications/store', [NotificationController::class, 'store'])->name('notifications.store');
Route::post('/devices/store', [DeviceController::class, 'store'])->name('notifications.store');
Route::get('/devices/index', [DeviceController::class, 'index'])->name('notifications.index');

Route::get('/directions', [DirectionsController::class, 'getDirections']);
