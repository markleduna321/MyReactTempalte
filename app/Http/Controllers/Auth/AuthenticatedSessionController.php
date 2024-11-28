<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        if (Auth::user()->role_id == 1) {
            $user = auth()->user();
            if ($user) {
                $user->update(['is_online' => true]);
            }
            return redirect()->intended(RouteServiceProvider::ADMIN);
        } else if (Auth::user()->role_id == 2) {
            $user = auth()->user();
            if ($user) {
                $user->update(['is_online' => true]);
            }
            return redirect()->intended(RouteServiceProvider::USER); 
        }
        // Additional role checks...
        
        // else if(Auth::user()->role_id == 3){
        //     return redirect()->intended(RouteServiceProvider::WAREHOUSE); 
        // }else if(Auth::user()->role_id == 4){
        //     return redirect()->intended(RouteServiceProvider::ASC); 
        // }else if(Auth::user()->role_id == 5){
        //     return redirect()->intended(RouteServiceProvider::AGENT); 
        // }else if(Auth::user()->role_id == 6){
        //     return redirect()->intended(RouteServiceProvider::CURTIS); 
        // }

        //return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = auth()->user(); // Get the authenticated user first
        if ($user) {
            $user->update(['is_online' => false]); // Update is_online status
        }

        Auth::guard('web')->logout(); // Log out the user

        $request->session()->invalidate(); // Invalidate the session
        $request->session()->regenerateToken(); // Regenerate CSRF token

        return redirect('/'); // Redirect to the login or home page
    }
}
