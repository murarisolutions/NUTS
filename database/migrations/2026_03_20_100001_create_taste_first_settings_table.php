<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('taste_first_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_enabled')->default(true);
            $table->enum('fee_type', ['free', 'fixed', 'free_above_threshold'])->default('free');
            $table->decimal('fee_amount', 10, 2)->default(0);
            $table->decimal('free_threshold', 10, 2)->default(500);
            $table->integer('refund_window_days')->default(7);
            $table->text('checkout_description')->nullable();
            $table->text('product_badge_text')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('taste_first_settings');
    }
};
