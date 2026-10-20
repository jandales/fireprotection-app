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
        
        $query = Notification::query();
        $search = $request->input('search');
        $status = $request->input('status', 'all');

        if ($request->filled('search')) {
            $query->where(function ($query) use ($search) {
                $query->where('location', 'like', '%' . $search . '%')
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', '%' . $search . '%')
                            ->orWhere('email', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('device', function ($deviceQuery) use ($search) {
                        $deviceQuery->where('name', 'like', '%' . $search . '%')
                            ->orWhere('macAddress', 'like', '%' . $search . '%')
                            ->orWhere('location', 'like', '%' . $search . '%');
                    });
            });
        }

        if ($status === 'active') {
            $query->whereIn('status', ['active', 'dispatched']);
        } elseif ($status === 'closed') {
            $query->where('status', 'closed');
        } else {
            $status = 'all';
        }

        $data = $query->with(['user', 'device'])->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Notification', [
            'notifications' => $data,
            'filter' => $search,
            'statusFilter' => $status,
            'stats' => [
                'all' => Notification::count(),
                'active' => Notification::whereIn('status', ['active', 'dispatched'])->count(),
                'closed' => Notification::where('status', 'closed')->count(),
            ],
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
