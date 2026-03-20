<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function __construct(private CartService $cartService) {}

    public function index()
    {
        $cart = $this->cartService->getCurrentCart();

        return Inertia::render('Cart', [
            'cart' => $cart,
            'cartItems' => $cart ? $cart->items->load('product', 'productSize') : [],
            'subtotal' => $this->cartService->getSubtotal(),
            'shippingFee' => $this->cartService->getShippingFee(),
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_size_id' => 'required|exists:product_sizes,id',
            'quantity' => 'integer|min:1|max:10',
        ]);

        $this->cartService->addItem(
            $request->product_id,
            $request->product_size_id,
            $request->get('quantity', 1)
        );

        return back()->with('success', 'Item added to cart!');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $this->cartService->updateQuantity($cartItem, $request->quantity);

        return back()->with('success', 'Cart updated!');
    }

    public function destroy(CartItem $cartItem)
    {
        $this->cartService->removeItem($cartItem);

        return back()->with('success', 'Item removed from cart!');
    }
}
