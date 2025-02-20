<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Models\Activity;
use App\Models\User;
use App\Models\Device;
use App\Models\Notification;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        if (Auth::check() && Auth::user()->role === 'administrator') {

            $userCount     = User::where('role', 'user')->count();
            $deviceCount   = Device::count();
            $employeeCount = User::where('role', '<>', 'user')->count();
            $notifitionCount = Notification::where('status', 'active')->count();
            $activities    = Activity::with('user')->orderBy('created_at', 'desc')->limit(10)->get();

            return Inertia::render('Dashboard', [
                'userCount'     => $userCount,
                'deviceCount'   =>  $deviceCount,
                'employeeCount' => $employeeCount,
                'notifitionCount' => $notifitionCount,
                'activities'    =>   $activities                
            ]);

        }
        return redirect('/user'); 
    }

    public function index1(){

        if (Auth::check() && Auth::user()->role === 'administrator') {           

            return Inertia::render('Admin/Dashboard', [
                'notifications' =>  Notification::paginate(10)
            ]);

        }

        return redirect('/user'); 
    }
}
