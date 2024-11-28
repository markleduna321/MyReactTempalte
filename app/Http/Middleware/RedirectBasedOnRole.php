<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;

class RedirectBasedOnRole
{
    public function handle(Request $request, Closure $next)
    {
        $account = $request->user(); // Assuming user is authenticated and account information is available

        if ($account) {
            if ($account->role_id == 1) {
                return redirect()->intended(RouteServiceProvider::ADMIN);
            } else if ($account->role_id == 2) {
                return redirect()->intended(RouteServiceProvider::USER);
            } 
            // else if ($account->role_id == 3) {
            //     return redirect('/warehouse/dashboard');
            // } else if ($account->role_id == 4) {
            //     return redirect('/asc/dashboard');
            // } else if ($account->role_id == 5) {
            //     return redirect('/agent/dashboard');
            // }else if ($account->role_id == 6) {
            //     return redirect('/curtis/dashboard');
            // }
        }


        return $next($request);
    }
}
