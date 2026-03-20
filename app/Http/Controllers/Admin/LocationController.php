<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();

        return Inertia::render('Admin/Locations/Index', [
            'locations' => $locations,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Locations/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'hours' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'map_url' => 'nullable|url|max:500',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('locations', 'public');
        }

        Location::create($validated);

        return redirect()->route('admin.locations.index')->with('success', 'Location created successfully!');
    }

    public function edit(Location $location)
    {
        return Inertia::render('Admin/Locations/Form', [
            'location' => $location,
        ]);
    }

    public function update(Request $request, Location $location)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'hours' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'map_url' => 'nullable|url|max:500',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('locations', 'public');
        }

        $location->update($validated);

        return redirect()->route('admin.locations.index')->with('success', 'Location updated successfully!');
    }

    public function destroy(Location $location)
    {
        $location->delete();

        return redirect()->route('admin.locations.index')->with('success', 'Location deleted!');
    }
}
