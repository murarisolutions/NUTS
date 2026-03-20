<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->boolean('has_refund_protection')->default(false)->after('notes');
            $table->decimal('refund_protection_fee', 10, 2)->default(0)->after('has_refund_protection');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['has_refund_protection', 'refund_protection_fee']);
        });
    }
};
