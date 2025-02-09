<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Logout;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Auth\Events\Login;
use App\Models\Activity;

class CreateActivityOnLogout
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
    public function handle(Logout $event): void
    {
        /// Create an Activity when the user logs out
        Activity::create([
            'user_id' => $event->user->id,
            'action'  => 'Logout',
            'changes' => 'User logged out',
        ]);
    }
}
