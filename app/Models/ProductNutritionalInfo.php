<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductNutritionalInfo extends Model
{
    protected $table = 'product_nutritional_info';

    protected $fillable = [
        'product_id', 'energy', 'protein', 'fat', 'carbs', 'fiber', 'vitamin_e',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
