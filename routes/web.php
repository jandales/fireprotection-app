<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\DeviceController;
use App\Http\Controllers\User\UserSettingController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\DeviceController as AdminDeviceController; 
use App\Http\Controllers\Admin\DirectionsController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () { 
    if (Auth::check() && Auth::user()->role === 'administrator') {    
        return redirect('/dashboard');
    }
    return redirect('/user'); 
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/alerts', function () {
    return Inertia::render('Alerts');
})->middleware(['auth', 'verified'])->name('alerts');

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->middleware(['auth', 'verified'])->name('admin');


Route::middleware('auth')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
    Route::get('/users', [AdminUserController::Class, 'index'])->name('users');
    Route::get('/users/{user}', [AdminUserController::Class, 'show'])->name('users.show'); 
});

Route::middleware('auth')->group(function () {  
    Route::get('/employees',        [EmployeeController::Class, 'index'])->name('employees');  
    Route::get('/employees/create', [EmployeeController::Class, 'create'])->name('employees.create');
    Route::post('/employees/store', [EmployeeController::Class, 'store'])->name('employees.store');
    Route::get('/employees/edit/{id}', [EmployeeController::Class, 'edit'])->name('employees.edit');
    Route::patch('/employees/update', [EmployeeController::Class, 'update'])->name('employees.update');
    Route::get('/employees/show/{id}', [EmployeeController::Class, 'show'])->name('employees.show');
    Route::delete('/employees/destoy/{id}', [EmployeeController::Class, 'destroy'])->name('employees.destroy');

    Route::get('/account', [UserController::class, 'index'])->name('account');
 
    Route::get('/settings', [SettingController::Class, 'index'])->name('settings.index');
    Route::patch('/settings/update/contact',  [SettingController::Class, 'updateContact'])->name('settings.update.contact');
    Route::patch('/settings/update/location', [SettingController::Class, 'updateLocation'])->name('settings.update.location');
    Route::patch('/settings/update/password', [SettingController::Class, 'updatePassword'])->name('settings.update.password');

    Route::get('/maps', [DirectionsController::class, 'index']);
    

});

Route::middleware('auth')->group(function () {  
    Route::get('/devices',  [AdminDeviceController::Class, 'index'])->name('devices'); 
   
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
    Route::delete('/user/devices/delete/{id}', [DeviceController::class, 'destroy'])->name('user.device.destroy');

    Route::get('/user/settings', [UserSettingController::class, 'index'])->name('user.settings');
    Route::patch('/user/settings', [UserSettingController::class, 'update'])->name('user.settings.update');
    Route::post('/user/settings/generate', [UserSettingController::class, 'generate'])->name('user.settings.generate');
    Route::put('/user/settings/changePassword', [UserSettingController::class, 'changePassword'])->name('user.settings.changePassword');

});

require __DIR__.'/auth.php';
