<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'name', 'address', 'phone', 'hours', 'image', 'map_url', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
