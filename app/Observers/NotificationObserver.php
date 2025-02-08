<?php

namespace App\Observers;

use App\Models\Notification;
use App\Models\Activity;

class NotificationObserver
{
    /**
     * Handle the Notification "created" event.
     */
    public function created(Notification $notification): void
    {         
         Activity::create([
            'user_id'      => $notification->user_id, 
            'action'       => 'Created',
            'changes'      => 'Sent Fire Notification'
        ]);
    }
    
}
