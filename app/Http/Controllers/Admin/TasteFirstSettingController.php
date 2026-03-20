<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TasteFirstSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TasteFirstSettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/TasteFirst/Settings', [
            'settings' => TasteFirstSetting::current(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'is_enabled' => 'required|boolean',
            'fee_type' => 'required|in:free,fixed,free_above_threshold',
            'fee_amount' => 'required|numeric|min:0',
            'free_threshold' => 'required|numeric|min:0',
            'refund_window_days' => 'required|integer|min:1|max:90',
            'checkout_description' => 'nullable|string|max:500',
            'product_badge_text' => 'nullable|string|max:100',
        ]);

        TasteFirstSetting::current()->update($validated);

        return back()->with('success', 'Taste First settings updated successfully!');
    }
}
