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
            $changes =  'Create user ' . $user->name;
        } 

        Activity::create([
            'user_id'      => $creatorId, 
            'action'       => 'Create',
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
            'action'       => 'Update',
            'changes'      => $changes
        ]);
    }

    /**
     * Handle the user "deleted" event.
     */
    public function deleted(user $user): void
    {
        Activity::create([
            'user_id'      =>  Auth::user()->id, 
            'action'       => 'Delete',
            'changes'      => 'Delete user' . $user->name
        ]);
    }
    
}
