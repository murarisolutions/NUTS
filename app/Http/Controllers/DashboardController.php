<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $recentOrders = $user->orders()->with('items')->latest()->take(5)->get();

        return Inertia::render('Dashboard/Index', [
            'recentOrders' => $recentOrders,
        ]);
    }
}
