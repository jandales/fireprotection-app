<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Device;
use Inertia\Inertia;
use Inertia\Response;

class DeviceController extends Controller
{
    public function index(Request $request)
    {

        $query = Device::query();
   
        if ($request->has('search')) {
            $query->with('user')
                  ->where(function ($q) use ($request) {               
                      $q->where('name', 'like', '%' . $request->search . '%')
                        ->orWhere('macAddress', 'like', '%' . $request->search . '%');
                  })
                  ->orWhereHas('user', function ($q) use ($request) {
                      $q->where('name', 'like', '%' . $request->search . '%');                     
                  });
        }       
       
        $data = $query->paginate(10);

        return Inertia::render('Admin/Device/Index', [
            'devices' => $data,
            'filter' => $request->search
        ]);
    }

    public function maps(){

        $devices = Device::all();

        return Inertia::render('Admin/Device/Maps', [
            'devices' => $devices        
        ]);

    }
}
