<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\DeviceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/alerts', function () {
    return Inertia::render('Alerts');
})->middleware(['auth', 'verified'])->name('alerts');

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->middleware(['auth', 'verified'])->name('admin');

Route::middleware('auth')->group(function () {
    Route::get('/locations', [LocationController::Class, 'index'])->name('location');
});

Route::middleware('auth')->group(function () {
    Route::get('/residents', [ResidentController::Class, 'index'])->name('residents');
    Route::get('/residents/create', [ResidentController::Class, 'create'])->name('residents.create');
    Route::get('/residents/edit/{id}', [ResidentController::Class, 'edit'])->name('residents.edit');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () { 
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () { 
    Route::get('/user', [UserController::class, 'index'])->name('user');
    Route::patch('/user/update', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user', [UserController::class, 'destroy'])->name('user.destroy');

    Route::get('/user/devices', [DeviceController::class, 'index'])->name('user.devices');
    Route::post('/user/devices', [DeviceController::class, 'store'])->name('user.device.store');
    Route::patch('/user/devices', [DeviceController::class, 'update'])->name('user.device.update');

});

require __DIR__.'/auth.php';
