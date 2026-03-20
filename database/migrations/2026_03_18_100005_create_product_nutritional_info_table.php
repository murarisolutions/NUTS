<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_nutritional_info', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('energy')->nullable();
            $table->string('protein')->nullable();
            $table->string('fat')->nullable();
            $table->string('carbs')->nullable();
            $table->string('fiber')->nullable();
            $table->string('vitamin_e')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_nutritional_info');
    }
};
