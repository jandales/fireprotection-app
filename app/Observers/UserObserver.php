<?php

namespace App\Observers;

use App\Models\user;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth; 

class UserObserver
{
    /**
     * Handle the user "created" event.
     */
    public function created(user $user): void
    {
        $changes = 'User Registered';
        $creatorId = $user->id;

        if(Auth::user()->id <> $user->id){
            $creatorId = Auth::user()->id;
            $changes =  'Create user' . $user->name;
        } 

        Activity::create([
            'user_id'      => $creatorId, 
            'action'       => 'Created',
            'changes'      =>  $changes
        ]);
    }

    /**
     * Handle the user "updated" event.
     */
    public function updated(user $user): void
    {
        $creatorId = $user->id;
        $changes   = 'User Updated';    

        if ($user->id == Auth::user()->id){
            $changes = 'Update Profile';
            $creatorId = $user->id;
        }
        else {
            $creatorId = Auth::user()->id;
            $changes =  'Update user ' . $user->name;
        }

        Activity::create([
            'user_id'      => $creatorId, 
            'action'       => 'Updated',
            'changes'      => $changes
        ]);
    }

    /**
     * Handle the user "deleted" event.
     */
    public function deleted(user $user): void
    {
        Activity::create([
            'user_id'      => $user->id, 
            'action'       => 'Updated',
            'changes'      => 'User Delete'
        ]);
    }

    /**
     * Handle the user "restored" event.
     */
    public function restored(user $user): void
    {
        //
    }

    /**
     * Handle the user "force deleted" event.
     */
    public function forceDeleted(user $user): void
    {
        //
    }
}
