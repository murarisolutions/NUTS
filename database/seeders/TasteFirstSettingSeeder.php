<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TasteFirstSettingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('taste_first_settings')->insertOrIgnore([
            'is_enabled' => true,
            'fee_type' => 'free',
            'fee_amount' => 0,
            'free_threshold' => 500,
            'refund_window_days' => 7,
            'checkout_description' => 'Get a free sample pack with your order. Taste it first — if unsatisfied, return the sealed main pack for a full refund!',
            'product_badge_text' => 'Taste First Guarantee',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
