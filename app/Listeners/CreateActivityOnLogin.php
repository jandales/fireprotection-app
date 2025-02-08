<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Auth\Events\Login;
use App\Models\Activity;

class CreateActivityOnLogin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
         // Create an Activity when the user logs in
         Activity::create([
            'user_id' => $event->user->id,
            'action'  => 'Login',
            'changes' => 'User logged in.',
        ]);
    }
}
