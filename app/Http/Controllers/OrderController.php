<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Auth::user()->orders()->with('items')->latest()->paginate(10);
        return Inertia::render('Dashboard/Orders', ['orders' => $orders]);
    }

    public function show(Order $order)
    {
        abort_if($order->user_id !== Auth::id(), 403);
        $order->load('items', 'latestRefundRequest');

        return Inertia::render('Dashboard/OrderDetail', [
            'order' => $order,
            'canRequestRefund' => $order->canRequestRefund(),
        ]);
    }

    public function confirmation(Order $order)
    {
        abort_if($order->user_id !== Auth::id(), 403);
        $order->load('items');
        return Inertia::render('OrderConfirmation', ['order' => $order]);
    }
}
