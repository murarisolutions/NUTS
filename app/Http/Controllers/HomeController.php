<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::active()->ordered()->get();

        $featuredProducts = Product::with('sizes', 'category')
            ->active()->featured()->regular()
            ->take(8)->get();

        $giftBoxes = Product::with('category')
            ->active()->giftBoxes()
            ->take(4)->get();

        $testimonials = Review::approved()
            ->whereNull('product_id')
            ->orWhere(function ($q) {
                $q->approved();
            })
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'giftBoxes' => $giftBoxes,
            'testimonials' => $testimonials,
        ]);
    }
}
