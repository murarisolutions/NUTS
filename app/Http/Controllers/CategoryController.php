<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(Request $request, Category $category)
    {
        $query = Product::with('sizes', 'category')
            ->where('category_id', $category->id)
            ->active();

        if ($request->filled('sub_category')) {
            $query->where('sub_category', $request->sub_category);
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $sort = $request->get('sort', 'featured');
        switch ($sort) {
            case 'price-low-high':
                $query->orderBy('price', 'asc');
                break;
            case 'price-high-low':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            case 'name-az':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->orderBy('is_featured', 'desc')->orderBy('created_at', 'desc');
        }

        $products = $query->paginate(12)->withQueryString();

        $subCategories = Product::where('category_id', $category->id)
            ->active()
            ->distinct()
            ->pluck('sub_category')
            ->filter()
            ->values();

        return Inertia::render('CategoryProducts', [
            'category' => $category,
            'products' => $products,
            'subCategories' => $subCategories,
            'filters' => $request->only(['sub_category', 'min_price', 'max_price', 'sort']),
        ]);
    }
}
