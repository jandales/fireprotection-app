<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
  
    public function index()
    {
        return Inertia::render('User/Profile');
    }

   public function edit(Request $request): Response
   {
       return Inertia::render('Dashboard', [
           'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
           'status' => session('status'),
       ]);
   }

 
   public function update(UserUpdateRequest $request)
   {    
        $user = $request->user();
        $user->fill($request->validated());
        
       
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');            
            $user->avatar = '/storage/' . $path; 
        }

        $user->save(); 

        // return Redirect::route('user');
    }

   /**
    * Delete the user's account.
    */
   public function destroy(Request $request): RedirectResponse
   {
       $request->validate([
           'password' => ['required', 'current_password'],
       ]);

       $user = $request->user();

       Auth::logout();

       $user->delete();

       $request->session()->invalidate();
       $request->session()->regenerateToken();

       return Redirect::to('/');
   }
}
