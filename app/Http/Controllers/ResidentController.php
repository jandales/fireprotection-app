<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resident;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ResidentController extends Controller
{
    public function index()
    {
        $data = Resident::all();

        // Return the data as a JSON response
        return Inertia::render('Resident', [
            'residents' => $data,
        ]);
    }

    public function create()
    {   
        // Return the data as a JSON response
        return Inertia::render('CreateResident');
    }

    public function edit($id)
    {
        $data = Resident::with('devices.location')->find($id);

        // Return the data as a JSON response
        return Inertia::render('ResidentEdit', [
            'resident' => $data,
        ]);
    }
}
