<?php

namespace App\Http\Controllers;

use App\Models\BulkOrder;
use App\Models\Career;
use App\Models\Contact;
use App\Models\Location;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        $testimonials = Review::approved()->latest()->take(6)->get();
        return Inertia::render('About', ['testimonials' => $testimonials]);
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function contactStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($request->only('name', 'email', 'phone', 'subject', 'message'));

        return back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }

    public function bulkOrder()
    {
        return Inertia::render('BulkOrder');
    }

    public function bulkOrderStore(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'product_category' => 'nullable|string|max:255',
            'quantity' => 'nullable|string|max:255',
            'special_requirements' => 'nullable|string',
        ]);

        BulkOrder::create($request->all());

        return back()->with('success', 'Your bulk order inquiry has been submitted! Our team will contact you within 24 hours.');
    }

    public function locations()
    {
        $locations = Location::where('is_active', true)->get();
        return Inertia::render('Locations', ['locations' => $locations]);
    }

    public function career()
    {
        $careers = Career::active()->get();
        return Inertia::render('Career', ['careers' => $careers]);
    }

    public function privacy()
    {
        return Inertia::render('PrivacyPolicy');
    }

    public function terms()
    {
        return Inertia::render('TermsAndConditions');
    }

    public function refundPolicy()
    {
        return Inertia::render('RefundPolicy');
    }

    public function shipping()
    {
        return Inertia::render('ShippingPolicy');
    }
}
