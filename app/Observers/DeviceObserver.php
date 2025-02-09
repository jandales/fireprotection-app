<?php

namespace App\Observers;

use App\Models\Device;
use App\Models\Activity;

class DeviceObserver
{
    /**
     * Handle the Device "created" event.
     */
    public function created(Device $device): void
    {
        Activity::create([
            'user_id'      => $device->user_id, 
            'action'       => 'Create',
            'changes'      => 'Device Created'
        ]);
    }

    /**
     * Handle the Device "updated" event.
     */
    public function updated(Device $device): void
    {
        Activity::create([
            'user_id'      => $device->user_id, 
            'action'       => 'Update',
            'changes'      => 'Device Updated'
        ]);
    }

    /**
     * Handle the Device "deleted" event.
     */
    public function deleted(Device $device): void
    {
        //
    }

    /**
     * Handle the Device "restored" event.
     */
    public function restored(Device $device): void
    {
        //
    }

    /**
     * Handle the Device "force deleted" event.
     */
    public function forceDeleted(Device $device): void
    {
        //
    }
}
