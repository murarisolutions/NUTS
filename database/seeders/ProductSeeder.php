<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\ProductImage;
use App\Models\ProductNutritionalInfo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all()->keyBy('slug');

        // === DRY FRUITS & NUTS (12 products) ===
        $dryFruits = [
            ['name' => 'Kishmish Round Golden', 'price' => 64, 'badge' => null, 'sub_category' => 'Raisins', 'sku' => 'NN-KRG01'],
            ['name' => 'Kishmish Long Green', 'price' => 85, 'badge' => 'Imported', 'sub_category' => 'Raisins', 'sku' => 'NN-KLG01'],
            ['name' => 'Premium Almond', 'price' => 128, 'badge' => 'Premium', 'sub_category' => 'Almonds', 'is_featured' => true, 'sku' => 'NN-ALM01'],
            ['name' => 'Almond Roasted & Salted', 'price' => 148, 'badge' => null, 'sub_category' => 'Almonds', 'sku' => 'NN-ALMRS01'],
            ['name' => 'Premium Walnut Kernels', 'price' => 230, 'badge' => 'Premium', 'sub_category' => 'Walnut', 'is_featured' => true, 'sku' => 'NN-WAL01'],
            ['name' => 'Premium Cashew', 'price' => 168, 'badge' => 'Premium', 'sub_category' => 'Cashews', 'is_featured' => true, 'sku' => 'NN-CSH01'],
            ['name' => 'Cashew Roasted & Salted', 'price' => 188, 'badge' => null, 'sub_category' => 'Cashews', 'sku' => 'NN-CSHRS01'],
            ['name' => 'Anjeer (Premium Dried Figs)', 'price' => 270, 'badge' => 'Premium', 'sub_category' => 'Figs', 'is_featured' => true, 'sku' => 'NN-ANJ01'],
            ['name' => 'Premium Pista', 'price' => 176, 'badge' => 'Premium', 'sub_category' => 'Pistachio', 'is_featured' => true, 'sku' => 'NN-PIS01'],
            ['name' => 'Pistachio Roasted & Salted', 'price' => 196, 'badge' => null, 'sub_category' => 'Pistachio', 'sku' => 'NN-PISRS01'],
            ['name' => 'Premium Makhana', 'price' => 180, 'badge' => null, 'sub_category' => 'Makhana', 'sku' => 'NN-MAK01'],
            ['name' => 'Afghan Kishmish (Wet)', 'price' => 105, 'badge' => 'Imported', 'sub_category' => 'Raisins', 'sku' => 'NN-AFK01'],
        ];

        $this->seedProducts($dryFruits, $categories['dry-fruits']->id);

        // === DATES (3 products) ===
        $dates = [
            ['name' => 'Dry Dates (Chuara)', 'price' => 46, 'badge' => null, 'sub_category' => 'Dry Dates', 'sku' => 'NN-DDT01'],
            ['name' => 'Wet Dates Safawi', 'price' => 105, 'badge' => 'Premium', 'sub_category' => 'Safawi Dates', 'is_featured' => true, 'sku' => 'NN-SAF01'],
            ['name' => 'Wet Dates Ajwa', 'price' => 190, 'badge' => 'Premium', 'sub_category' => 'Ajwa Dates', 'is_featured' => true, 'sku' => 'NN-AJW01'],
        ];

        $this->seedProducts($dates, $categories['dates']->id);

        // === SEEDS (7 products) ===
        $seeds = [
            ['name' => 'Pumpkin Seeds', 'price' => 88, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'NN-PMP01'],
            ['name' => 'Sunflower Seeds', 'price' => 68, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'NN-SUN01'],
            ['name' => 'Chia Seeds', 'price' => 80, 'badge' => 'Superfood', 'sub_category' => 'Seeds', 'sku' => 'NN-CHI01'],
            ['name' => 'Sabja Seeds (Basil)', 'price' => 55, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'NN-SAB01'],
            ['name' => 'Watermelon Seeds', 'price' => 108, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'NN-WML01'],
            ['name' => 'Jeera (Cumin Seeds)', 'price' => 45, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'NN-JRA01'],
            ['name' => 'Flax Seeds', 'price' => 38, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'NN-FLX01'],
        ];

        $this->seedProducts($seeds, $categories['seeds']->id);
    }

    private function seedProducts(array $products, int $categoryId): void
    {
        foreach ($products as $data) {
            $slug = Str::slug($data['name']);

            $primaryImagePath = "products/demo/{$slug}-1.jpg";

            $product = Product::create([
                'name' => $data['name'],
                'slug' => $slug,
                'category_id' => $categoryId,
                'sub_category' => $data['sub_category'] ?? null,
                'price' => $data['price'],
                'badge' => $data['badge'] ?? null,
                'is_featured' => $data['is_featured'] ?? false,
                'is_gift_box' => false,
                'price_on_request' => false,
                'image' => $primaryImagePath,
                'sku' => $data['sku'] ?? null,
                'rating' => round(4.0 + (mt_rand(0, 10) / 10), 1),
            ]);

            // Create product images (4 for kishmish-round-golden, 3 for others)
            $imageCount = $slug === 'kishmish-round-golden' ? 4 : 3;
            for ($i = 1; $i <= $imageCount; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => "products/demo/{$slug}-{$i}.jpg",
                    'is_primary' => $i === 1,
                    'sort_order' => $i - 1,
                ]);
            }

            // Create size variants
            $basePrice = $data['price'];
            $sizes = [
                ['label' => '100g', 'grams' => 100, 'multiplier' => 1, 'is_default' => true],
                ['label' => '250g', 'grams' => 250, 'multiplier' => 2.4],
                ['label' => '500g', 'grams' => 500, 'multiplier' => 4.5],
                ['label' => '1kg', 'grams' => 1000, 'multiplier' => 8.5],
            ];

            foreach ($sizes as $size) {
                ProductSize::create([
                    'product_id' => $product->id,
                    'size_label' => $size['label'],
                    'size_grams' => $size['grams'],
                    'price' => round($basePrice * $size['multiplier'], 2),
                    'original_price' => round($basePrice * $size['multiplier'] * 1.2, 2),
                    'stock' => 100,
                    'is_default' => $size['is_default'] ?? false,
                ]);
            }

            // Add nutritional info
            ProductNutritionalInfo::create([
                'product_id' => $product->id,
                'energy' => rand(400, 650) . ' kcal',
                'protein' => rand(10, 25) . 'g',
                'fat' => rand(20, 55) . 'g',
                'carbs' => rand(15, 30) . 'g',
                'fiber' => rand(5, 15) . 'g',
                'vitamin_e' => rand(5, 30) . 'mg',
            ]);
        }
    }
}
