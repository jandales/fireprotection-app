<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Device;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {

        $query = User::query();

        if ($request->has('search') ) {
            $query
                ->where('role', 'user')
                ->where('name', 'like', '%' . $request->search . '%');
        }
        else {
            $query->where('role', 'user');
        }
       
        $data = $query->paginate(10);

        return Inertia::render('Admin/User', [
            'users' => $data,
            'filter' => $request->search
        ]);
    }

    public function show(User $user)
    {        
        $devices = Device::where('user_id', $user->id)->get();

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'devices' => $devices
        ]);

    }

    
}
