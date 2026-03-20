<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number', 'user_id', 'subtotal', 'shipping_fee', 'discount',
        'total', 'status', 'payment_method', 'shipping_name', 'shipping_phone',
        'shipping_address', 'shipping_city', 'shipping_state', 'shipping_pincode',
        'notes', 'has_refund_protection', 'refund_protection_fee',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_fee' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'has_refund_protection' => 'boolean',
        'refund_protection_fee' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function refundRequests()
    {
        return $this->hasMany(RefundRequest::class);
    }

    public function latestRefundRequest()
    {
        return $this->hasOne(RefundRequest::class)->latestOfMany();
    }

    public function canRequestRefund(): bool
    {
        if (!$this->has_refund_protection) {
            return false;
        }

        if ($this->status !== 'delivered') {
            return false;
        }

        $activeStatuses = ['pending', 'under_review', 'approved'];
        if ($this->refundRequests()->whereIn('status', $activeStatuses)->exists()) {
            return false;
        }

        $settings = TasteFirstSetting::current();
        $deliveredAt = $this->updated_at;
        if ($deliveredAt->addDays($settings->refund_window_days)->isPast()) {
            return false;
        }

        return true;
    }

    public static function generateOrderNumber(): string
    {
        $date = now()->format('Ymd');
        $count = static::whereDate('created_at', today())->count() + 1;
        return sprintf('NUT-%s-%04d', $date, $count);
    }
}
