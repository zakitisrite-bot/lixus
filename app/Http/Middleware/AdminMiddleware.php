<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     * Only users with the 'admin' role may access admin routes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            if ($request->user()) {
                // Authenticated but not admin → redirect to home
                return redirect()->route('home')->with('error', "Accès non autorisé. Vous n'avez pas les droits d'administration.");
            }
            // Not authenticated → redirect to login
            return redirect()->route('login');
        }

        return $next($request);
    }
}
