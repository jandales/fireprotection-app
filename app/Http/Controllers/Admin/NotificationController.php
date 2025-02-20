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

    public function dispatch($id) {

        $notification = Notification::find($id);
        $notification->status = 'dispatched';
        $notification->save();

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    public function close($id) {
        
        $notification = Notification::find($id);
        $notification->status = 'closed';
        $notification->save();

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    public function destroy($id) {
        
        $notification = Notification::find($id);      
        $notification->delete();

        return redirect()->back()->with('success', 'Successfully Deleted!');
    }
}
