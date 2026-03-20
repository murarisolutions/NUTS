<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class GenerateDemoImages extends Command
{
    protected $signature = 'demo:generate-images';
    protected $description = 'Generate placeholder product images for demo purposes';

    // Category color schemes: [bg_colors[], accent_color, emoji]
    private array $categoryThemes = [
        'dry-fruits' => [
            'colors' => ['#8B6914', '#A0522D', '#CD853F'],
            'accent' => '#F5DEB3',
            'emoji' => 'Nuts',
        ],
        'dates' => [
            'colors' => ['#4A2810', '#6B3A1F', '#8B4513'],
            'accent' => '#DEB887',
            'emoji' => 'Dates',
        ],
        'berries' => [
            'colors' => ['#722F6B', '#8B1A4A', '#9B2335'],
            'accent' => '#FFB6C1',
            'emoji' => 'Berries',
        ],
        'seeds' => [
            'colors' => ['#2E8B57', '#3CB371', '#228B22'],
            'accent' => '#98FB98',
            'emoji' => 'Seeds',
        ],
        'dfh-exclusives' => [
            'colors' => ['#B8860B', '#DAA520', '#CD950C'],
            'accent' => '#FFD700',
            'emoji' => 'Premium',
        ],
        'gift-boxes' => [
            'colors' => ['#800020', '#8B0000', '#A0153E'],
            'accent' => '#FFD700',
            'emoji' => 'Gift',
        ],
    ];

    public function handle(): int
    {
        $this->info('Generating demo product images...');

        Storage::disk('public')->makeDirectory('products/demo');

        $products = \App\Models\Product::with('category')->get();
        $bar = $this->output->createProgressBar($products->count());

        foreach ($products as $product) {
            $categorySlug = $product->category?->slug ?? 'dry-fruits';
            $theme = $this->categoryThemes[$categorySlug] ?? $this->categoryThemes['dry-fruits'];

            for ($i = 1; $i <= 3; $i++) {
                $filename = "products/demo/{$product->slug}-{$i}.jpg";
                $colorIndex = ($i - 1) % count($theme['colors']);
                $bgColor = $theme['colors'][$colorIndex];

                $this->generateImage(
                    Storage::disk('public')->path($filename),
                    $bgColor,
                    $theme['accent'],
                    $product->name,
                    $theme['emoji'],
                    $i
                );
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Generated ' . ($products->count() * 3) . ' demo images!');

        return Command::SUCCESS;
    }

    private function generateImage(string $path, string $bgColor, string $accentColor, string $productName, string $label, int $variant): void
    {
        $width = 800;
        $height = 800;

        $img = imagecreatetruecolor($width, $height);

        // Parse colors
        $bg = $this->hexToRgb($bgColor);
        $accent = $this->hexToRgb($accentColor);

        $bgGd = imagecolorallocate($img, $bg[0], $bg[1], $bg[2]);
        $accentGd = imagecolorallocate($img, $accent[0], $accent[1], $accent[2]);
        $white = imagecolorallocate($img, 255, 255, 255);
        $darkText = imagecolorallocate($img, 40, 40, 40);

        // Fill background
        imagefill($img, 0, 0, $bgGd);

        // Draw decorative pattern based on variant
        $lightBg = imagecolorallocatealpha($img, $accent[0], $accent[1], $accent[2], 100);

        if ($variant === 1) {
            // Circle pattern
            imagefilledellipse($img, 400, 400, 500, 500, $lightBg);
            imagefilledellipse($img, 400, 400, 350, 350, $bgGd);
        } elseif ($variant === 2) {
            // Diamond pattern
            $points = [400, 100, 700, 400, 400, 700, 100, 400];
            imagefilledpolygon($img, $points, $lightBg);
        } else {
            // Rounded rect pattern (simulated)
            imagefilledrectangle($img, 100, 150, 700, 650, $lightBg);
            imagefilledellipse($img, 400, 400, 400, 400, $bgGd);
        }

        // Draw the product name (truncated)
        $displayName = mb_strlen($productName) > 20 ? mb_substr($productName, 0, 20) . '...' : $productName;

        // Use built-in fonts since we can't rely on TTF
        $fontSize = 5; // largest built-in font
        $textWidth = imagefontwidth($fontSize) * strlen($displayName);
        $textX = ($width - $textWidth) / 2;

        // Product name
        imagestring($img, $fontSize, (int) $textX, 340, $displayName, $white);

        // Category label
        $labelWidth = imagefontwidth(4) * strlen($label);
        $labelX = ($width - $labelWidth) / 2;
        imagestring($img, 4, (int) $labelX, 380, $label, $accentGd);

        // "NAMMA NUTS" branding at top
        $brandText = 'NAMMA NUTS';
        $brandWidth = imagefontwidth(3) * strlen($brandText);
        $brandX = ($width - $brandWidth) / 2;
        imagestring($img, 3, (int) $brandX, 30, $brandText, $accentGd);

        // Variant indicator at bottom
        $variantText = "View {$variant} of 3";
        $variantWidth = imagefontwidth(3) * strlen($variantText);
        $variantX = ($width - $variantWidth) / 2;
        imagestring($img, 3, (int) $variantX, 750, $variantText, $accentGd);

        // Draw accent border
        imagerectangle($img, 20, 20, $width - 21, $height - 21, $accentGd);
        imagerectangle($img, 22, 22, $width - 23, $height - 23, $accentGd);

        // Ensure directory exists
        $dir = dirname($path);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        imagejpeg($img, $path, 90);
        imagedestroy($img);
    }

    private function hexToRgb(string $hex): array
    {
        $hex = ltrim($hex, '#');
        return [
            hexdec(substr($hex, 0, 2)),
            hexdec(substr($hex, 2, 2)),
            hexdec(substr($hex, 4, 2)),
        ];
    }
}
