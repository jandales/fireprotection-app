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
    public function index(Request $request)
    {    
        $query = Device::query();
        $query->where('user_id', Auth::user()->id);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('macAddress', 'like', '%' . $request->search . '%' );
        }        
       
        $data = $query->paginate(10);      
           
        return Inertia::render('User/Device', [
            'devices' => $data,
            'filter' => $request->search
        ]);

    }

    public function store(DeviceRequest $request)
    {        

        $lastDeviceId = optional(Device::orderBy('id', 'desc')->first())->id;
        $device_name = 'Device-' . ($lastDeviceId ? $lastDeviceId + 1 : 1);
        
        $device = Device::create([
            'name'       => $device_name,
            'macAddress' => $request->macAddress,
            'ipAddress'  => $request->ipAddress,
            'latitude'   => $request->latitude,
            'longitude'  => $request->longitude,
            'location'   => $request->location,
            'ysnLocation' => 0,
            'user_id'  => $request->user()->id,
        ]);
    }

    public function update(DeviceRequest $request)
    {          
        $device = Device::find($request->id);               
        $device->macAddress  = $request->macAddress;
        $device->ipAddress   = $request->ipAddress;
        $device->latitude    = $request->latitude;
        $device->longitude   =  $request->longitude;
        $device->location    = $request->location;
        $device->ysnLocation = $request->ysnLocation;
        $device->save();
      
    }

    public function destroy($id)
    {
        $device = Device::find($id);
        $device->delete();
    }
}
