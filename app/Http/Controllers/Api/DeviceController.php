<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;

class DeviceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'macAddress' => 'required|unique:devices'          
        ]);  


        try {

            $lastDeviceId = Device::orderBy('id', 'desc')->first()->id;

            $device_name = 'Device-' . $lastDeviceId + 1; 
            
            $device = Device::create([
                'name'        => $device_name,
                'macAddress'  => $request->macAddress,
                'ipAddress'   => $request->ipAddress,
                'latitude'    => $request->latitude,
                'longitude'   => $request->longitude,
                'location'    => $request->location,
                'ysnLocation' => $request->ysnLocation,
                'user_id'     => 1,
                // 'user_id'  => $request->user()->id,
            ]);          
    
            return response()->json(['device' => $device], 200);


        } catch (ModelNotFoundException $e) {

            return response()->json(['message' => 'Server error'], 404);
            
        }     
        
    }

    public function index(Request $request) {

        $macAddress = $request->mac;  // Retrieve 'mac' parameter
    
        if (!$macAddress) {         
            return response()->json(['message' => 'MAC address not provided'], 400);
        }

        // You can now query the device using the MAC address
        $device = Device::where('macAddress', $macAddress)->first();

        if (!$device) {
            return response()->json(['message' => 'Device not found'], 404);
        }

        return response()->json(['device' => $device], 200);

        
    }

   
}
