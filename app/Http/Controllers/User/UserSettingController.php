<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserSetting;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class UserSettingController extends Controller
{
    public function index()
    {
        $data = UserSetting::where('user_id', Auth()->user()->id)->first();
        return Inertia::render('User/Setting', [
            'settings' => $data
        ]);
    }

    public function update(Request $request)
    {
        
        $validated = $request->validate([
            'perpage' => 'required|numeric',  
            'ysnHomeLocationAsDefault' => 'boolean'        
        ]);
               
        $setting = UserSetting::where('user_id', Auth()->user()->id)->first();
        $setting->update($validated);

    }

    public function generate(Request $request) {

        $code = Str::upper(Str::random(5)) . rand(0, 9);
       
        $setting = UserSetting::where('user_id', $request->user()->id)->first();
        $setting->code = $code;
        $setting->save();
    }
}
