<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;
use App\Models\Notification;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'macAddress' => 'required'          
        ]);  

        $device = Device::with(['user'])
                        ->where('macAddress', $request->macAddress)
                        ->first();   
                             
          
        return Notification::create([
            'user_id' => $device->user->id,    
            'device_id' => $device->id,    
            'latitude' => $request->latitude,
            'longitude'=> $request->longitude,     
            'location' => $device->ysnLocation == 1 ? $device->user->location : $device->location, 
        ]);
    }
}
