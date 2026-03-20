<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TasteFirstSetting extends Model
{
    protected $fillable = [
        'is_enabled',
        'fee_type',
        'fee_amount',
        'free_threshold',
        'refund_window_days',
        'checkout_description',
        'product_badge_text',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'fee_amount' => 'decimal:2',
        'free_threshold' => 'decimal:2',
        'refund_window_days' => 'integer',
    ];

    public static function current(): static
    {
        return static::firstOrCreate([], [
            'is_enabled' => true,
            'fee_type' => 'free',
            'fee_amount' => 0,
            'free_threshold' => 500,
            'refund_window_days' => 7,
        ]);
    }
}
