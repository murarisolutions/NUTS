<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BulkOrder extends Model
{
    protected $fillable = [
        'company_name', 'contact_person', 'email', 'phone',
        'product_category', 'quantity', 'special_requirements', 'status',
    ];
}
