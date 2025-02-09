<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\EmployeeRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Device;
use App\Models\Activity;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {

        $query = User::query();

        if ($request->has('search') ) {
            $query->where(function ($q) use ($request) {
                $q->where('role', '<>', 'user')
                  ->where(function ($subQuery) use ($request) {
                      $subQuery->where('name', 'like', '%' . $request->search . '%')
                               ->orWhere('email', 'like', '%' . $request->search . '%')
                               ->orWhere('role', 'like', '%' . $request->search . '%');
                  });
            });
        }
        else {
            $query->whereNot('role', 'user');
        }
       
        $data = $query->paginate(10);

        return Inertia::render('Admin/Employee/Employee', [
            'users' => $data,
            'filter' => $request->search
        ]);
    }

    public function show($id)
    {     
        $user = User::find($id); 
        // Optionally handle related activities
        $activities = Activity::where('user_id', $user->id)->orderBy('created_at', 'DESC')->get();    
         
        return Inertia::render('Admin/Employee/Show', [
            'user' => $user,  
            'activities' => $activities,      
        ]);
    }


    public function create() {
        return Inertia::render('Admin/Employee/Create');
    }

    public function store(EmployeeRequest $request) 
    {
    
        $password = $request->role == 'administrator' ? 'admin12345_' : 'user12345_';
    
        $user = User::create([
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => Hash::make($password),
            'phonenumber' => $request->phonenumber,
            'role'        => $request->role,
            'address1'    => $request->address1,
            'address2'    => $request->address2,
            'city'        => $request->city,
            'province'    => $request->province,
            'zipcode'     => $request->zipcode,
        ]);
    
        return redirect()->back()->with('success', 'Employee created successfully!');

    }

    public function edit($id) {

        $user = User::find($id);

        return Inertia::render('Admin/Employee/Edit',[
            'user' => $user
        ]);

    }

    public function update(Request $request) {

        $request->validate([
            'name'        => 'required|string|max:255',           
            'role'        => 'required|string',
            'phonenumber' => 'required'        
        ]);

        $user = User::find($request->id);  
        $user->name         = $request->name;
        $user->phonenumber  = $request->phonenumber;
        $user->role         =  $request->role;
        $user->address1     = $request->address1;
        $user->address2     = $request->address2;
        $user->city         = $request->city;
        $user->province     = $request->province;
        $user->zipcode      = $request->zipcode;
        $user->status       = $user->master === 1 ? $user->master : $request->status;
        $user->save();

        return redirect()->back()->with('success', 'Employee updated successfully!');
        
    }

    public function destroy($id)
    {        
        // Find the user by ID, or return an error if not found
        $user = User::find($id);

        if ($user->master === 1){
            return redirect()->back()->with('error', 'User cannot be deleted');
        }
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }
    
        // Optionally handle related activities
        $activities = Activity::where('user_id', $user->id)->get();    
        
        $activities->each->delete();   // Deletes each activity associated with the user.
    
        $user->delete();  
    
        // Redirect with success message
        return redirect()->back()->with('success', 'User and related activities deleted successfully!');
    }


}
