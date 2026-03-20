<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = Auth::user()->addresses;

        return Inertia::render('Dashboard/Addresses', [
            'addresses' => $addresses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/AddressForm');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|string|max:10',
            'type' => 'required|in:home,office,other',
            'is_default' => 'boolean',
        ]);

        $validated['user_id'] = Auth::id();

        if (!empty($validated['is_default'])) {
            Auth::user()->addresses()->update(['is_default' => false]);
        }

        Address::create($validated);

        return redirect()->route('addresses.index')->with('success', 'Address added successfully!');
    }

    public function edit(Address $address)
    {
        abort_if($address->user_id !== Auth::id(), 403);

        return Inertia::render('Dashboard/AddressForm', [
            'address' => $address,
        ]);
    }

    public function update(Request $request, Address $address)
    {
        abort_if($address->user_id !== Auth::id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|string|max:10',
            'type' => 'required|in:home,office,other',
            'is_default' => 'boolean',
        ]);

        if (!empty($validated['is_default'])) {
            Auth::user()->addresses()->where('id', '!=', $address->id)->update(['is_default' => false]);
        }

        $address->update($validated);

        return redirect()->route('addresses.index')->with('success', 'Address updated successfully!');
    }

    public function destroy(Address $address)
    {
        abort_if($address->user_id !== Auth::id(), 403);

        $address->delete();

        return redirect()->route('addresses.index')->with('success', 'Address deleted successfully!');
    }
}
