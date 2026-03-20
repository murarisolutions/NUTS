<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductSize;
use Illuminate\Support\Facades\Auth;

class CartService
{
    public function getOrCreateCart(): Cart
    {
        if (Auth::check()) {
            $cart = Cart::where('user_id', Auth::id())->first();
            if (!$cart) {
                $cart = Cart::create(['user_id' => Auth::id()]);
            }
            return $cart;
        }

        $sessionId = session()->getId();
        $cart = Cart::where('session_id', $sessionId)->first();
        if (!$cart) {
            $cart = Cart::create(['session_id' => $sessionId]);
        }
        return $cart;
    }

    public function addItem(int $productId, int $productSizeId, int $quantity = 1): CartItem
    {
        $cart = $this->getOrCreateCart();
        $size = ProductSize::findOrFail($productSizeId);

        $existingItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->where('product_size_id', $productSizeId)
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $quantity,
            ]);
            return $existingItem;
        }

        return CartItem::create([
            'cart_id' => $cart->id,
            'product_id' => $productId,
            'product_size_id' => $productSizeId,
            'quantity' => $quantity,
            'unit_price' => $size->price,
        ]);
    }

    public function updateQuantity(CartItem $item, int $quantity): CartItem
    {
        $item->update(['quantity' => $quantity]);
        return $item;
    }

    public function removeItem(CartItem $item): void
    {
        $item->delete();
    }

    public function getCartCount(): int
    {
        $cart = $this->getCurrentCart();
        return $cart ? $cart->items->sum('quantity') : 0;
    }

    public function getCurrentCart(): ?Cart
    {
        if (Auth::check()) {
            return Cart::with('items.product', 'items.productSize')
                ->where('user_id', Auth::id())
                ->first();
        }

        return Cart::with('items.product', 'items.productSize')
            ->where('session_id', session()->getId())
            ->first();
    }

    public function mergeGuestCart(): void
    {
        if (!Auth::check()) return;

        $sessionId = session()->getId();
        $guestCart = Cart::where('session_id', $sessionId)->first();

        if (!$guestCart) return;

        $userCart = Cart::where('user_id', Auth::id())->first();

        if (!$userCart) {
            $guestCart->update(['user_id' => Auth::id(), 'session_id' => null]);
            return;
        }

        foreach ($guestCart->items as $guestItem) {
            $existingItem = $userCart->items()
                ->where('product_id', $guestItem->product_id)
                ->where('product_size_id', $guestItem->product_size_id)
                ->first();

            if ($existingItem) {
                $existingItem->update([
                    'quantity' => $existingItem->quantity + $guestItem->quantity,
                ]);
            } else {
                $guestItem->update(['cart_id' => $userCart->id]);
            }
        }

        $guestCart->delete();
    }

    public function clearCart(): void
    {
        $cart = $this->getCurrentCart();
        if ($cart) {
            $cart->items()->delete();
        }
    }

    public function getSubtotal(): float
    {
        $cart = $this->getCurrentCart();
        if (!$cart) return 0;

        return $cart->items->sum(fn($item) => $item->unit_price * $item->quantity);
    }

    public function getShippingFee(): float
    {
        return $this->getSubtotal() >= 999 ? 0 : 49;
    }
}
