<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('sub_category')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->string('badge')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_gift_box')->default(false);
            $table->boolean('price_on_request')->default(false);
            $table->string('grade')->nullable();
            $table->string('origin')->nullable();
            $table->string('shelf_life')->nullable();
            $table->string('image');
            $table->string('sku')->unique()->nullable();
            $table->decimal('rating', 2, 1)->default(4.5);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
