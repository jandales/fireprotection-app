<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\Api\PostController;

Route::post('/post', [PostController::class, 'store'])->name('post');
   
