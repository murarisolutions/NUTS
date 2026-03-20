<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Nuts & Dry Fruits',
                'slug' => 'dry-fruits',
                'description' => 'Explore our handpicked collection of premium nuts and dry fruits sourced from the finest farms around the world. Pure, natural, and packed with nutrition.',
                'icon_class' => 'fas fa-seedling',
                'sort_order' => 1,
            ],
            [
                'name' => 'Dates',
                'slug' => 'dates',
                'description' => 'Discover our exquisite collection of premium dates sourced from the finest date farms. Rich, sweet, and packed with natural goodness.',
                'icon_class' => 'fas fa-circle',
                'sort_order' => 2,
            ],
            [
                'name' => 'Berries',
                'slug' => 'berries',
                'description' => 'Explore our premium collection of dried berries, each carefully selected for exceptional taste and nutrition.',
                'icon_class' => 'fas fa-apple-whole',
                'sort_order' => 3,
            ],
            [
                'name' => 'Seeds & More',
                'slug' => 'seeds',
                'description' => 'Discover our premium collection of seeds, superfoods, and healthy snacking options packed with essential nutrients.',
                'icon_class' => 'fas fa-leaf',
                'sort_order' => 4,
            ],
            [
                'name' => 'DFH Exclusives',
                'slug' => 'dfh-exclusives',
                'description' => 'Discover our signature blends and exclusive mixes crafted by our nutrition experts. Each mix is carefully formulated for specific health benefits.',
                'icon_class' => 'fas fa-star',
                'sort_order' => 5,
            ],
            [
                'name' => 'Gift Boxes',
                'slug' => 'gift-boxes',
                'description' => 'Discover our beautifully crafted gift boxes, perfect for every occasion. Each box is carefully curated with premium dry fruits and nuts.',
                'icon_class' => 'fas fa-gift',
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
