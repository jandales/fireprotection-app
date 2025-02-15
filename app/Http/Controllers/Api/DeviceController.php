<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;
use App\Models\UserSetting;

class DeviceController extends Controller
{
    public function store(Request $request)
    {       
       
        
        $validated = $request->validate([
            'code' => 'required',
            'macAddress' => 'required|unique:devices'          
        ]); 

        $setting = UserSetting::where('code', $request->code)->firstOrFail();    

        if (!$setting) {
            return response()->json(['error' => 'User setting not found.'], 404);
        }



        try {
        
            if(Device::count() > 0){
                $lastDeviceId = Device::orderBy('id', 'desc')->first()->id;
                $device_name = 'Device-' . $lastDeviceId + 1; 
            }else {
                $device_name = 'Device-1';
            }
           
            
            $device = Device::create([
                'name'        => $device_name,
                'macAddress'  => $request->macAddress,
                'ipAddress'   => $request->ipAddress,
                'latitude'    => $request->latitude,
                'longitude'   => $request->longitude,
                'location'    => $request->location,
                'ysnLocation' => 0,
                'user_id'     => $setting->user_id                
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
