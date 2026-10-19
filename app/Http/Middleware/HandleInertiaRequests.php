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

        // Default to Manila so Google Maps always gets finite coordinates.
        $latitude = is_numeric($setting?->latitude) ? (float) $setting->latitude : 14.5995;
        $longitude = is_numeric($setting?->longitude) ? (float) $setting->longitude : 120.9842;

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'station' => [
                'name' => $setting?->stationName ?? 'Fire Station',
                'contact' => $setting?->phonenumber,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'address' => $setting?->location,
            ],
        ];
    }
}
