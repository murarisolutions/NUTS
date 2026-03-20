<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BulkOrder;
use App\Models\Contact;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalOrders' => Order::count(),
                'pendingOrders' => Order::where('status', 'pending')->count(),
                'totalRevenue' => Order::where('status', '!=', 'cancelled')->sum('total'),
                'totalProducts' => Product::count(),
                'totalCustomers' => User::where('role', 'customer')->count(),
                'pendingContacts' => Contact::where('is_read', false)->count(),
                'pendingBulkOrders' => BulkOrder::where('status', 'pending')->count(),
            ],
            'recentOrders' => Order::with('user')->latest()->take(10)->get(),
        ]);
    }
}
