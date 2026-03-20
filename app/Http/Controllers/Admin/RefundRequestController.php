<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RefundRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RefundRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = RefundRequest::with(['order', 'user']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('refund_number', 'like', "%{$search}%")
                  ->orWhereHas('order', fn ($q) => $q->where('order_number', 'like', "%{$search}%"))
                  ->orWhereHas('user', fn ($q) => $q->where('name', 'like', "%{$search}%"));
            });
        }

        $refundRequests = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/RefundRequests/Index', [
            'refundRequests' => $refundRequests,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function show(RefundRequest $refundRequest)
    {
        $refundRequest->load(['order.items', 'user', 'resolver']);

        return Inertia::render('Admin/RefundRequests/Show', [
            'refundRequest' => $refundRequest,
        ]);
    }

    public function update(Request $request, RefundRequest $refundRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:under_review,approved,rejected,refunded',
            'admin_notes' => 'nullable|string|max:1000',
            'rejection_reason' => 'nullable|required_if:status,rejected|string|max:500',
        ]);

        $data = [
            'status' => $validated['status'],
            'admin_notes' => $validated['admin_notes'] ?? $refundRequest->admin_notes,
        ];

        if ($validated['status'] === 'rejected') {
            $data['rejection_reason'] = $validated['rejection_reason'];
        }

        if (in_array($validated['status'], ['approved', 'rejected', 'refunded'])) {
            $data['resolved_at'] = now();
            $data['resolved_by'] = Auth::id();
        }

        $refundRequest->update($data);

        return back()->with('success', 'Refund request updated successfully!');
    }
}
