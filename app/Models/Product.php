<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'category_id', 'sub_category',
        'price', 'original_price', 'badge', 'is_featured', 'is_gift_box',
        'price_on_request', 'grade', 'origin', 'shelf_life', 'image',
        'sku', 'rating', 'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'rating' => 'decimal:1',
        'is_featured' => 'boolean',
        'is_gift_box' => 'boolean',
        'price_on_request' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function sizes()
    {
        return $this->hasMany(ProductSize::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function nutritionalInfo()
    {
        return $this->hasOne(ProductNutritionalInfo::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeGiftBoxes($query)
    {
        return $query->where('is_gift_box', true);
    }

    public function scopeRegular($query)
    {
        return $query->where('is_gift_box', false);
    }

    public function getDefaultSize()
    {
        return $this->sizes()->where('is_default', true)->first()
            ?? $this->sizes()->first();
    }
}
