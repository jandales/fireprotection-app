<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SettingController extends Controller
{
    public function index()
    {
        $data = Setting::firstOrFail();

        return Inertia::render('Admin/Setting', [
            'settings' => $data
        ]);
    }

    public function updateContact(Request $request)
    {
        $setting = Setting::first();
        $setting->stationName  = $request->station;
        $setting->email        = $request->email;
        $setting->phonenumber  = $request->phonenumber;
        $setting->mobilenumber = $request->mobilenumber;
        $setting->save();

        return back()->with([
                'setting' => $setting,
                'message' => 'Location updated successfully!'
        ]);
    }

    public function updateLocation(Request $request) 
    {     
        
        $setting = Setting::first();
        $setting->latitude   = $request->latitude;
        $setting->longitude  = $request->longitude;
        $setting->location   = $request->location;
        $setting->save();

        return back()->with([
                'setting' => $setting,
                'message' => 'Location updated successfully!'
        ]);
    }

    public function updatePassword(Request $request) {

        $request->validate([
            'oldpassword' => ['required'],
            'newpassword' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
        ]);

        if (!Hash::check($request->oldpassword, auth()->user()->password)) {
            return back()->withErrors([
                'oldpassword' => 'The old password is incorrect.'
            ]);
        }

        // Update the password
        $user = Auth::user();
        $user->password = Hash::make($request->newpassword);
        $user->save();

        return back()->with('success', 'Password updated successfully!');

    }
}
