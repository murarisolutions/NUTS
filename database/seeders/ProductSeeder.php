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

        // === DRY FRUITS (24 products) ===
        $dryFruits = [
            ['name' => 'Premium Jumbo Almond', 'price' => 128, 'badge' => 'Premium', 'sub_category' => 'Almonds', 'is_featured' => true, 'sku' => 'DRYF103'],
            ['name' => 'Mamra Almond (Organic)', 'price' => 420, 'badge' => 'Organic', 'sub_category' => 'Almonds', 'is_featured' => true, 'sku' => 'DRYF102'],
            ['name' => 'Cashew Nuts Jumbo', 'price' => 168, 'badge' => 'Premium', 'sub_category' => 'Cashews', 'is_featured' => true, 'sku' => 'DRYF110'],
            ['name' => 'Cashew Nuts Medium', 'price' => 138, 'badge' => null, 'sub_category' => 'Cashews', 'sku' => 'DRYF110M'],
            ['name' => 'Top-Quality Pista Akbari', 'price' => 176, 'badge' => 'Top Quality', 'sub_category' => 'Pistachio', 'sku' => 'DRYF114'],
            ['name' => 'Premium Pista Plain (Kernel)', 'price' => 275, 'badge' => 'Premium', 'sub_category' => 'Pistachio', 'is_featured' => true, 'sku' => 'DRYF115'],
            ['name' => 'Premium Walnut Kernels', 'price' => 230, 'badge' => 'Premium', 'sub_category' => 'Walnut', 'is_featured' => true, 'sku' => 'DRYF120'],
            ['name' => 'Premium Black Raisins', 'price' => 75, 'badge' => null, 'sub_category' => 'Raisins', 'is_featured' => true, 'sku' => 'DRYF115B'],
            ['name' => 'Exquisite Raisins Afghan Special', 'price' => 105, 'badge' => 'Special', 'sub_category' => 'Raisins', 'sku' => 'DRYF117'],
            ['name' => 'Best Raisins Afghan Long', 'price' => 85, 'badge' => null, 'sub_category' => 'Raisins', 'sku' => 'DRYF118'],
            ['name' => 'Raisins Round', 'price' => 64, 'badge' => null, 'sub_category' => 'Raisins', 'sku' => 'DFH190'],
            ['name' => 'Premium Munakka Raisins', 'price' => 86, 'badge' => 'Premium', 'sub_category' => 'Raisins', 'sku' => 'DRYF119'],
            ['name' => 'Luxe Turkish Apricot Turkel', 'price' => 135, 'badge' => 'Luxe', 'sub_category' => 'Apricots', 'sku' => 'DRYF131T'],
            ['name' => 'Golden Sun-Dried Apricots', 'price' => 108, 'badge' => null, 'sub_category' => 'Apricots', 'sku' => 'DRYF131'],
            ['name' => 'Exquisite Brazil Nuts', 'price' => 410, 'badge' => 'Exotic', 'sub_category' => 'Brazil Nuts', 'sku' => 'DRYF135'],
            ['name' => 'Premium Hazelnuts', 'price' => 260, 'badge' => 'Premium', 'sub_category' => 'Hazelnuts', 'sku' => 'DRYF134'],
            ['name' => 'Deluxe Pecans', 'price' => 275, 'badge' => 'Deluxe', 'sub_category' => 'Pecans', 'sku' => 'DRYF136'],
            ['name' => 'Macadamia Nuts', 'price' => 390, 'badge' => 'Exotic', 'sub_category' => 'Macadamia', 'sku' => 'SKUDF10M1'],
            ['name' => 'Velvety Soft Dried Prunes', 'price' => 95, 'badge' => null, 'sub_category' => 'Prunes', 'sku' => 'DRY126'],
            ['name' => 'Tropical Bliss Dried Mango', 'price' => 96, 'badge' => 'New', 'sub_category' => 'Dried Fruits', 'sku' => 'DRYF127'],
            ['name' => 'Deluxe Pine Nuts (Without Shell)', 'price' => 860, 'badge' => 'Deluxe', 'sub_category' => 'Pine Nuts', 'sku' => 'DRYF130'],
            ['name' => 'Makhana Plain', 'price' => 180, 'badge' => null, 'sub_category' => 'Makhana', 'sku' => 'DRYF132'],
            ['name' => 'Rich Assortment of Mixed Dry Fruits', 'price' => 85, 'badge' => 'Bestseller', 'sub_category' => 'Mixed Fruits', 'sku' => 'DRYF123'],
            ['name' => 'Anjeer (Figs) Super Jumbo', 'price' => 270, 'badge' => 'Super Jumbo', 'sub_category' => 'Figs', 'sku' => 'DFHASJ1'],
        ];

        $this->seedProducts($dryFruits, $categories['dry-fruits']->id);

        // === DATES (6 products) ===
        $dates = [
            ['name' => 'Premium Ajwa Dates', 'price' => 190, 'badge' => 'Premium', 'sub_category' => 'Ajwa Dates', 'is_featured' => true, 'sku' => 'DFHDT101'],
            ['name' => 'Premium Medjool', 'price' => 190, 'badge' => 'Premium', 'sub_category' => 'Medjool Dates', 'is_featured' => true, 'sku' => 'DFHDT104'],
            ['name' => 'Finest Mabroom Dates', 'price' => 140, 'badge' => 'New', 'sub_category' => 'Mabroom Dates', 'sku' => 'DFHDT102'],
            ['name' => 'Safawi Sweet Delight', 'price' => 105, 'badge' => null, 'sub_category' => 'Safawi Dates', 'sku' => 'DFHDT103'],
            ['name' => 'Arabian Seedless Date', 'price' => 38, 'badge' => 'Sale', 'sub_category' => 'Seedless Dates', 'sku' => 'DFHDT105'],
            ['name' => 'Premium Dry Dates', 'price' => 46, 'badge' => null, 'sub_category' => 'Dry Dates', 'sku' => 'DFHDT107'],
        ];

        $this->seedProducts($dates, $categories['dates']->id);

        // === BERRIES (8 products) ===
        $berries = [
            ['name' => 'Dried Cranberries', 'price' => 120, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHBR102'],
            ['name' => 'Dried Blueberries', 'price' => 180, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHBR103'],
            ['name' => 'Dried Strawberries', 'price' => 150, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHB101'],
            ['name' => 'Goji Berries', 'price' => 220, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHBR105'],
            ['name' => 'Golden Berries', 'price' => 160, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHBR106'],
            ['name' => 'Mulberries', 'price' => 140, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHBR107'],
            ['name' => 'Mixed Berries Pack', 'price' => 175, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHBR108'],
            ['name' => 'Dried Cherries', 'price' => 200, 'badge' => null, 'sub_category' => 'Berries', 'sku' => 'DFHBR109'],
        ];

        $this->seedProducts($berries, $categories['berries']->id);

        // === SEEDS & MORE (10 products) ===
        $seeds = [
            ['name' => 'Flax Seeds Plain', 'price' => 38, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'DFHSD104'],
            ['name' => 'Pumpkin Seeds', 'price' => 88, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'DFHSD106'],
            ['name' => 'Sunflower Seeds', 'price' => 68, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'DFHSD105'],
            ['name' => 'Watermelon Seeds', 'price' => 108, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'DFHSD105W'],
            ['name' => 'Ginger Cubes', 'price' => 85, 'badge' => null, 'sub_category' => 'Superfoods', 'sku' => 'DFHSSD111'],
            ['name' => 'Amla Sweet', 'price' => 38, 'badge' => null, 'sub_category' => 'Amla', 'sku' => 'DFHSD112'],
            ['name' => 'Amla Pepper', 'price' => 50, 'badge' => null, 'sub_category' => 'Amla', 'sku' => 'DFHSD114'],
            ['name' => 'Chia Seeds', 'price' => 80, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'DFHSD109'],
            ['name' => 'Flax Seed Roasted', 'price' => 38, 'badge' => null, 'sub_category' => 'Seeds', 'sku' => 'DFHSD111'],
            ['name' => 'Amla Whole', 'price' => 50, 'badge' => null, 'sub_category' => 'Amla', 'sku' => 'DFHSD112W'],
        ];

        $this->seedProducts($seeds, $categories['seeds']->id);

        // === DFH EXCLUSIVES (6 products) ===
        $exclusives = [
            ['name' => 'Breakfast Mix Seeds', 'price' => 85, 'badge' => 'Exclusive', 'sub_category' => 'DFH Exclusives', 'is_featured' => true, 'sku' => 'DFHEX101'],
            ['name' => 'Trail Mix Premium', 'price' => 120, 'badge' => 'Exclusive', 'sub_category' => 'DFH Exclusives', 'sku' => 'DFHEX106'],
            ['name' => 'Energy Mix', 'price' => 95, 'badge' => 'Exclusive', 'sub_category' => 'DFH Exclusives', 'sku' => 'DFHEX108'],
            ['name' => 'Protein Power Mix', 'price' => 150, 'badge' => 'Exclusive', 'sub_category' => 'DFH Exclusives', 'sku' => 'DFHEX109'],
            ['name' => 'Immunity Booster Mix', 'price' => 130, 'badge' => 'Exclusive', 'sub_category' => 'DFH Exclusives', 'sku' => 'DFHEX110'],
            ['name' => 'Antioxidant Berry Mix', 'price' => 160, 'badge' => 'Exclusive', 'sub_category' => 'DFH Exclusives', 'sku' => 'DFHEX114'],
        ];

        $this->seedProducts($exclusives, $categories['dfh-exclusives']->id);

        // === GIFT BOXES (8 products) ===
        $giftBoxes = [
            ['name' => 'Luxury Purple Gift Box', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB01'],
            ['name' => 'Elegant Collection', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB02'],
            ['name' => 'Bottled Collection', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB03'],
            ['name' => 'Royal Box', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB04'],
            ['name' => 'Delight Collection', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB05'],
            ['name' => 'Luxe Hampers', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB06'],
            ['name' => 'Goodness Box', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB023'],
            ['name' => 'Signature Box', 'price' => 0, 'badge' => null, 'sub_category' => 'Gift Boxes', 'is_gift_box' => true, 'price_on_request' => true, 'sku' => 'DFHGB024'],
        ];

        $this->seedProducts($giftBoxes, $categories['gift-boxes']->id);
    }

    private function seedProducts(array $products, int $categoryId): void
    {
        foreach ($products as $data) {
            $slug = Str::slug($data['name']);

            // Use local demo image path
            $primaryImagePath = "products/demo/{$slug}-1.jpg";

            $product = Product::create([
                'name' => $data['name'],
                'slug' => $slug,
                'category_id' => $categoryId,
                'sub_category' => $data['sub_category'] ?? null,
                'price' => $data['price'],
                'badge' => $data['badge'] ?? null,
                'is_featured' => $data['is_featured'] ?? false,
                'is_gift_box' => $data['is_gift_box'] ?? false,
                'price_on_request' => $data['price_on_request'] ?? false,
                'image' => $primaryImagePath,
                'sku' => $data['sku'] ?? null,
                'rating' => round(4.0 + (mt_rand(0, 10) / 10), 1),
            ]);

            // Create 3 product images per product
            for ($i = 1; $i <= 3; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => "products/demo/{$slug}-{$i}.jpg",
                    'is_primary' => $i === 1,
                    'sort_order' => $i - 1,
                ]);
            }

            // Create size variants (skip for gift boxes)
            if (!($data['is_gift_box'] ?? false)) {
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
            }

            // Add nutritional info for non-gift-box products
            if (!($data['is_gift_box'] ?? false)) {
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
}
