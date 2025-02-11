<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index(Request $request){
        
        $query  = Notification::query();  

        $search = $request->search;
        
        if ($request->has('search') ) {            
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }      
        
        $data = $query->with('device')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Notification', [
            'notifications' => $data,
            'filter' => $search,
        ]);
    }
}
