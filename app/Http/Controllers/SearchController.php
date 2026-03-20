<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('q', '');

        $products = Product::with('sizes', 'category')
            ->active()
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('sub_category', 'like', "%{$query}%")
                  ->orWhereHas('category', function ($c) use ($query) {
                      $c->where('name', 'like', "%{$query}%");
                  });
            })
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Search', [
            'products' => $products,
            'query' => $query,
        ]);
    }
}
