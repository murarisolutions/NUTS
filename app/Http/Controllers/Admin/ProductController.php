<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category', 'sizes');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Products/Form', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'sub_category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'badge' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'is_gift_box' => 'boolean',
            'price_on_request' => 'boolean',
            'grade' => 'nullable|string|max:50',
            'origin' => 'nullable|string|max:100',
            'shelf_life' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:2048',
            'sku' => 'nullable|string|max:50|unique:products',
            'is_active' => 'boolean',
            'sizes' => 'nullable|array',
            'sizes.*.size_label' => 'required_with:sizes|string',
            'sizes.*.weight' => 'required_with:sizes|string',
            'sizes.*.price' => 'required_with:sizes|numeric|min:0',
            'sizes.*.original_price' => 'nullable|numeric|min:0',
            'sizes.*.is_default' => 'boolean',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:2048',
            'primary_image_index' => 'nullable|integer|min:0',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $sizes = $validated['sizes'] ?? [];
        unset($validated['sizes'], $validated['gallery_images'], $validated['primary_image_index']);

        $product = Product::create($validated);

        foreach ($sizes as $size) {
            $product->sizes()->create($size);
        }

        // Handle gallery images
        if ($request->hasFile('gallery_images')) {
            $primaryIndex = $request->input('primary_image_index', 0);
            foreach ($request->file('gallery_images') as $index => $file) {
                $path = $file->store('products/gallery', 'public');
                $product->images()->create([
                    'image_path' => $path,
                    'is_primary' => $index == $primaryIndex,
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully!');
    }

    public function show(Product $product)
    {
        $product->load('sizes', 'images', 'nutritionalInfo', 'category', 'reviews');

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        $product->load('sizes', 'images');
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Products/Form', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'sub_category' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'badge' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'is_gift_box' => 'boolean',
            'price_on_request' => 'boolean',
            'grade' => 'nullable|string|max:50',
            'origin' => 'nullable|string|max:100',
            'shelf_life' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:2048',
            'sku' => 'nullable|string|max:50|unique:products,sku,' . $product->id,
            'is_active' => 'boolean',
            'sizes' => 'nullable|array',
            'sizes.*.id' => 'nullable|exists:product_sizes,id',
            'sizes.*.size_label' => 'required_with:sizes|string',
            'sizes.*.weight' => 'required_with:sizes|string',
            'sizes.*.price' => 'required_with:sizes|numeric|min:0',
            'sizes.*.original_price' => 'nullable|numeric|min:0',
            'sizes.*.is_default' => 'boolean',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:2048',
            'remove_gallery_images' => 'nullable|array',
            'remove_gallery_images.*' => 'integer|exists:product_images,id',
            'primary_gallery_image_id' => 'nullable|integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $sizes = $validated['sizes'] ?? [];
        unset($validated['sizes'], $validated['gallery_images'], $validated['remove_gallery_images'], $validated['primary_gallery_image_id']);

        $product->update($validated);

        $existingIds = [];
        foreach ($sizes as $size) {
            if (!empty($size['id'])) {
                $product->sizes()->where('id', $size['id'])->update($size);
                $existingIds[] = $size['id'];
            } else {
                $newSize = $product->sizes()->create($size);
                $existingIds[] = $newSize->id;
            }
        }
        $product->sizes()->whereNotIn('id', $existingIds)->delete();

        // Remove gallery images
        if ($request->filled('remove_gallery_images')) {
            $imagesToRemove = ProductImage::whereIn('id', $request->input('remove_gallery_images'))
                ->where('product_id', $product->id)
                ->get();
            foreach ($imagesToRemove as $img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
        }

        // Add new gallery images
        if ($request->hasFile('gallery_images')) {
            $maxOrder = $product->images()->max('sort_order') ?? -1;
            foreach ($request->file('gallery_images') as $index => $file) {
                $path = $file->store('products/gallery', 'public');
                $product->images()->create([
                    'image_path' => $path,
                    'is_primary' => false,
                    'sort_order' => $maxOrder + $index + 1,
                ]);
            }
        }

        // Set primary gallery image
        if ($request->filled('primary_gallery_image_id')) {
            $product->images()->update(['is_primary' => false]);
            $product->images()->where('id', $request->input('primary_gallery_image_id'))
                ->update(['is_primary' => true]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        // Delete gallery images from storage
        foreach ($product->images as $img) {
            Storage::disk('public')->delete($img->image_path);
        }

        $product->sizes()->delete();
        $product->images()->delete();
        $product->nutritionalInfo()->delete();
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
    }
}
