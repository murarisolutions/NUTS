<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\TasteFirstSetting;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(Product $product)
    {
        $product->load('sizes', 'images', 'nutritionalInfo', 'category', 'reviews.user');

        $relatedProducts = Product::with('sizes', 'category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->active()
            ->regular()
            ->take(4)
            ->get();

        $settings = TasteFirstSetting::current();

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'tasteFirstEnabled' => $settings->is_enabled,
            'tasteFirstBadgeText' => $settings->product_badge_text,
        ]);
    }
}
