<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Setting;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        
        $setting = Setting::first();  
 
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'station' => [
                'name'  => $setting->stationName,
                'contact'  => $setting->phonenumber,
                'latitude'  => $setting->latitude,
                'longitude' => $setting->longitude,
                'address'  => $setting->location,  
            ],
        ];
    }
}
