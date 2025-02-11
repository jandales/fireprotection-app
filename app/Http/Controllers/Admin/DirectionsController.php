<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GoogleDirectionsService;
use Inertia\Inertia;
// use Inertia\Response;

class DirectionsController extends Controller
{
    protected $directionsService;

    public function __construct(GoogleDirectionsService $directionsService)
    {
        $this->directionsService = $directionsService;
    }

    public function index(Request $request)
    {
        return Inertia::render('DirectionsPage');
    }

    public function getDirections(Request $request)
    {
      
        $request->validate([
            'origin' => 'required|string',
            'destination' => 'required|string',
        ]);        

        $origin = $request->input('origin');
      
        $destination = $request->input('destination');  

        
        $directions = $this->directionsService->getDirections($origin, $destination);   
        
        return response()->json($directions->json());
    }
}
