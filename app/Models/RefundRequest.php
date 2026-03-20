<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefundRequest extends Model
{
    protected $fillable = [
        'refund_number',
        'order_id',
        'user_id',
        'status',
        'reason',
        'admin_notes',
        'rejection_reason',
        'refund_amount',
        'resolved_at',
        'resolved_by',
    ];

    protected $casts = [
        'refund_amount' => 'decimal:2',
        'resolved_at' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function resolver()
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }

    public static function generateRefundNumber(): string
    {
        $date = now()->format('Ymd');
        $count = static::whereDate('created_at', today())->count() + 1;
        return sprintf('RF-%s-%04d', $date, $count);
    }
}
