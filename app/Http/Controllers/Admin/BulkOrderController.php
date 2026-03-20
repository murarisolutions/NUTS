<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BulkOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BulkOrderController extends Controller
{
    public function index()
    {
        $bulkOrders = BulkOrder::latest()->paginate(15);

        return Inertia::render('Admin/BulkOrders/Index', [
            'bulkOrders' => $bulkOrders,
        ]);
    }

    public function show(BulkOrder $bulkOrder)
    {
        return Inertia::render('Admin/BulkOrders/Show', [
            'bulkOrder' => $bulkOrder,
        ]);
    }

    public function update(Request $request, BulkOrder $bulkOrder)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,contacted,quoted,accepted,rejected',
        ]);

        $bulkOrder->update($validated);

        return back()->with('success', 'Bulk order status updated!');
    }

    public function destroy(BulkOrder $bulkOrder)
    {
        $bulkOrder->delete();

        return redirect()->route('admin.bulk-orders.index')->with('success', 'Bulk order deleted!');
    }
}
