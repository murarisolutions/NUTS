<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RefundRequest;
use App\Services\TasteFirstService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RefundRequestController extends Controller
{
    public function __construct(private TasteFirstService $tasteFirstService) {}

    public function create(Order $order)
    {
        abort_if($order->user_id !== Auth::id(), 403);
        abort_if(!$order->canRequestRefund(), 403, 'This order is not eligible for a refund request.');

        $order->load('items');

        return Inertia::render('Dashboard/RefundRequest', [
            'order' => $order,
            'refundAmount' => $this->tasteFirstService->calculateRefundAmount($order),
        ]);
    }

    public function store(Request $request, Order $order)
    {
        abort_if($order->user_id !== Auth::id(), 403);
        abort_if(!$order->canRequestRefund(), 403, 'This order is not eligible for a refund request.');

        $request->validate([
            'reason' => 'required|string|min:10|max:1000',
        ]);

        RefundRequest::create([
            'refund_number' => RefundRequest::generateRefundNumber(),
            'order_id' => $order->id,
            'user_id' => Auth::id(),
            'status' => 'pending',
            'reason' => $request->reason,
            'refund_amount' => $this->tasteFirstService->calculateRefundAmount($order),
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Refund request submitted successfully!');
    }

    public function show(RefundRequest $refundRequest)
    {
        abort_if($refundRequest->user_id !== Auth::id(), 403);

        $refundRequest->load('order.items');

        return Inertia::render('Dashboard/RefundRequestDetail', [
            'refundRequest' => $refundRequest,
        ]);
    }
}
