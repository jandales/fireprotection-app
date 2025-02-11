<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoogleDirectionsService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.google_maps.key');
    }

    public function getDirections($origin, $destination, $mode = 'driving')
    {
        $url = "https://maps.googleapis.com/maps/api/directions/json";

     
        $response = Http::get($url, [
            'origin' => $origin,
            'destination' => $destination,
            'mode' => $mode,
            'key' => $this->apiKey,
        ]);    

        return $response->json();
    }
}
