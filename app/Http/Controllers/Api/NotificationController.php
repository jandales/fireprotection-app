<?php

namespace App\Http\Controllers\Api;

use App\Events\NotificationEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Device;
use App\Models\Notification;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class NotificationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'macAddress' => 'required'          
        ]); 

        try {

            $device = Device::with(['user'])
                        ->where('macAddress', $request->macAddress)
                        ->firstOrFail(); 

            $notification = Notification::create([
                'user_id'   => $device->user->id,    
                'device_id' => $device->id, 
                'message'   => $request->message,
            ]);

            $notification->load('device');
    
            $user  = User::where('id', $notification->user_id)->first();  

            event(new NotificationEvent($notification));

            return response()->json(['message' => $notification->message], 200);


        } catch (ModelNotFoundException $e) {

            return response()->json(['message' => 'Device not exist'], 404);
            
        }     
        
    }
}
