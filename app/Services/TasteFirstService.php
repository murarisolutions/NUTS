<?php

namespace App\Services;

use App\Models\Order;
use App\Models\TasteFirstSetting;

class TasteFirstService
{
    public function isEnabled(): bool
    {
        return TasteFirstSetting::current()->is_enabled;
    }

    public function calculateFee(float $subtotal): float
    {
        $settings = TasteFirstSetting::current();

        if (!$settings->is_enabled) {
            return 0;
        }

        return match ($settings->fee_type) {
            'free' => 0,
            'fixed' => (float) $settings->fee_amount,
            'free_above_threshold' => $subtotal >= (float) $settings->free_threshold ? 0 : (float) $settings->fee_amount,
            default => 0,
        };
    }

    public function getCheckoutData(float $subtotal): array
    {
        $settings = TasteFirstSetting::current();

        return [
            'enabled' => $settings->is_enabled,
            'fee' => $this->calculateFee($subtotal),
            'fee_type' => $settings->fee_type,
            'fee_amount' => (float) $settings->fee_amount,
            'free_threshold' => (float) $settings->free_threshold,
            'description' => $settings->checkout_description,
        ];
    }

    public function generateSealNumbers(Order $order): void
    {
        foreach ($order->items as $index => $item) {
            $item->update([
                'seal_number' => sprintf('SEAL-%d-%03d', $order->id, $index + 1),
            ]);
        }
    }

    public function calculateRefundAmount(Order $order): float
    {
        return (float) $order->total - (float) $order->refund_protection_fee;
    }
}
