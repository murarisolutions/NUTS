# 📸 Image Storage Guide - Namma Nuts

## Directory Structure

```
public/images/          ← Logo & static brand images (YOU add these manually)
├── logo.png           ← Main NAMMA NUTS logo (transparent)
├── logo-compact.png   ← Compact version for header
├── logo-icon.png      ← Icon only for favicon
├── logo-white.png     ← White version (optional)
├── og-image.png       ← Social media sharing image
└── banners/           ← Homepage hero banners
    ├── hero-1.jpg     ← Premium collection banner (1920x800px)
    ├── hero-2.jpg     ← Natural & fresh banner (1920x800px)
    └── hero-3.jpg     ← Gift packaging banner (1920x800px)
```

## How to Add Images

### Step 1: Generate Logo Variations
Use AI tools (ChatGPT, Gemini) to create:
- Transparent background versions
- Different sizes for different uses
- Icon-only version for favicon

### Step 2: Save Files Here
1. Download generated images
2. Rename them correctly (logo.png, logo-compact.png, etc.)
3. Copy/paste them into this directory (`public/images/`)

### Step 3: Add Hero Banners
1. Generate or design 3 hero banners (1920x800px)
2. Save as hero-1.jpg, hero-2.jpg, hero-3.jpg
3. Copy them into `banners/` subdirectory

### Step 4: Test
Visit: http://localhost:8000/test-images.html
This will show which images are found (✓) or missing (✗)

## Product/Category Images

**DO NOT add product images here!**

Product images are uploaded via Admin Panel and stored in:
- `storage/app/public/products/`
- `storage/app/public/categories/`
- `storage/app/public/locations/`

They are accessed via `/storage/products/...` (symlink already created)

## Image Specifications

| Type | Size | Format | Location |
|------|------|--------|----------|
| Main Logo | 2000x800px | PNG (transparent) | /images/logo.png |
| Compact Logo | 800x300px | PNG (transparent) | /images/logo-compact.png |
| Icon | 512x512px | PNG (transparent) | /images/logo-icon.png |
| Hero Banners | 1920x800px | JPG (optimized) | /images/banners/*.jpg |
| Products | 800x800px | JPG | Via Admin Panel |
| Categories | 800x600px | JPG | Via Admin Panel |

## Quick Test

```bash
# Start server
php artisan serve

# Visit test page
open http://localhost:8000/test-images.html
```

---
Need help? The website code is already configured to use these paths!
