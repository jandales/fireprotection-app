<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Device;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\DeviceRequest;

class DeviceController extends Controller
{
    public function index() {    

        $data = Device::all();     
        return Inertia::render('User/Device', [
            'devices' => $data,
        ]);

    }

    public function store(DeviceRequest $request) {
        $devices = Device::create([
            'macAddress' => $request->macAddress,
            'ipAddress' => $request->ipAddress,
            'latitude'  => $request->latitude,
            'longitude' => $request->longtitude,
            'location' => $request->location,
            'ysnLocation' => $request->ysnLocation,
            'user_id'  => $request->user()->id,
        ]);
    }

    public function update(DeviceRequest $request) {
        
        $device = Device::find($request->id);               
        $device->macAddress = $request->macAddress;
        $device->ipAddress = $request->ipAddress;
        $device->latitude  = $request->latitude;
        $device->longitude =  $request->longtitude;
        $device->location = $request->location;
        $device->ysnLocation = $request->ysnLocation;
        $device->user_id  = $request->user()->id;
        $device->save();
      
    }
}
