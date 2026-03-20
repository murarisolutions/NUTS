<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RefundRequestController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/category/{category}', [CategoryController::class, 'show'])->name('category.show');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

// Static pages
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::post('/contact', [PageController::class, 'contactStore'])->name('contact.store');
Route::get('/bulk-order', [PageController::class, 'bulkOrder'])->name('bulk-order');
Route::post('/bulk-order', [PageController::class, 'bulkOrderStore'])->name('bulk-order.store');
Route::get('/locations', [PageController::class, 'locations'])->name('locations');
Route::get('/careers', [PageController::class, 'career'])->name('careers');
Route::get('/privacy-policy', [PageController::class, 'privacy'])->name('privacy');
Route::get('/terms-and-conditions', [PageController::class, 'terms'])->name('terms');
Route::get('/refund-policy', [PageController::class, 'refundPolicy'])->name('refund-policy');
Route::get('/shipping-policy', [PageController::class, 'shipping'])->name('shipping');

// Newsletter
Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');

// Cart (accessible to guests and authenticated users)
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

// Authenticated customer routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Addresses
    Route::resource('addresses', AddressController::class)->except(['show']);

    // Checkout
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::get('/orders/{order}/confirmation', [OrderController::class, 'confirmation'])->name('orders.confirmation');

    // Refund Requests
    Route::get('/orders/{order}/refund', [RefundRequestController::class, 'create'])->name('refund.create');
    Route::post('/orders/{order}/refund', [RefundRequestController::class, 'store'])->name('refund.store');
    Route::get('/refund-requests/{refundRequest}', [RefundRequestController::class, 'show'])->name('refund.show');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('products', App\Http\Controllers\Admin\ProductController::class);
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);

    Route::get('/orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}', [App\Http\Controllers\Admin\OrderController::class, 'update'])->name('orders.update');

    Route::get('/bulk-orders', [App\Http\Controllers\Admin\BulkOrderController::class, 'index'])->name('bulk-orders.index');
    Route::get('/bulk-orders/{bulkOrder}', [App\Http\Controllers\Admin\BulkOrderController::class, 'show'])->name('bulk-orders.show');
    Route::patch('/bulk-orders/{bulkOrder}', [App\Http\Controllers\Admin\BulkOrderController::class, 'update'])->name('bulk-orders.update');
    Route::delete('/bulk-orders/{bulkOrder}', [App\Http\Controllers\Admin\BulkOrderController::class, 'destroy'])->name('bulk-orders.destroy');

    Route::get('/reviews', [App\Http\Controllers\Admin\ReviewController::class, 'index'])->name('reviews.index');
    Route::patch('/reviews/{review}', [App\Http\Controllers\Admin\ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [App\Http\Controllers\Admin\ReviewController::class, 'destroy'])->name('reviews.destroy');

    Route::get('/contacts', [App\Http\Controllers\Admin\ContactController::class, 'index'])->name('contacts.index');
    Route::get('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'show'])->name('contacts.show');
    Route::delete('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('contacts.destroy');

    Route::resource('locations', App\Http\Controllers\Admin\LocationController::class)->except(['show']);
    Route::resource('careers', App\Http\Controllers\Admin\CareerController::class);

    Route::get('/subscribers', [App\Http\Controllers\Admin\SubscriberController::class, 'index'])->name('subscribers.index');
    Route::delete('/subscribers/{subscriber}', [App\Http\Controllers\Admin\SubscriberController::class, 'destroy'])->name('subscribers.destroy');

    // Taste First Settings
    Route::get('/taste-first/settings', [App\Http\Controllers\Admin\TasteFirstSettingController::class, 'edit'])->name('taste-first.edit');
    Route::patch('/taste-first/settings', [App\Http\Controllers\Admin\TasteFirstSettingController::class, 'update'])->name('taste-first.update');

    // Admin Refund Requests
    Route::get('/refund-requests', [App\Http\Controllers\Admin\RefundRequestController::class, 'index'])->name('refund-requests.index');
    Route::get('/refund-requests/{refundRequest}', [App\Http\Controllers\Admin\RefundRequestController::class, 'show'])->name('refund-requests.show');
    Route::patch('/refund-requests/{refundRequest}', [App\Http\Controllers\Admin\RefundRequestController::class, 'update'])->name('refund-requests.update');

    // Seal Number Override
    Route::patch('/orders/{order}/items/{orderItem}/seal', [App\Http\Controllers\Admin\OrderController::class, 'updateSealNumber'])->name('orders.update-seal');
});

require __DIR__.'/auth.php';
