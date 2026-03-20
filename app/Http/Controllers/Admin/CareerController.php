<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Career;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $careers = Career::latest()->paginate(15);

        return Inertia::render('Admin/Careers/Index', [
            'careers' => $careers,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Careers/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
        ]);

        Career::create($validated);

        return redirect()->route('admin.careers.index')->with('success', 'Career posting created!');
    }

    public function show(Career $career)
    {
        return Inertia::render('Admin/Careers/Show', [
            'career' => $career,
        ]);
    }

    public function edit(Career $career)
    {
        return Inertia::render('Admin/Careers/Form', [
            'career' => $career,
        ]);
    }

    public function update(Request $request, Career $career)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $career->update($validated);

        return redirect()->route('admin.careers.index')->with('success', 'Career posting updated!');
    }

    public function destroy(Career $career)
    {
        $career->delete();

        return redirect()->route('admin.careers.index')->with('success', 'Career posting deleted!');
    }
}
