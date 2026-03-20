<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Services\CartService;
use App\Services\TasteFirstService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function __construct(
        private CartService $cartService,
        private TasteFirstService $tasteFirstService,
    ) {}

    public function index()
    {
        $cart = $this->cartService->getCurrentCart();

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty!');
        }

        $addresses = Auth::user()->addresses;
        $subtotal = $this->cartService->getSubtotal();

        return Inertia::render('Checkout', [
            'cartItems' => $cart->items->load('product', 'productSize'),
            'addresses' => $addresses,
            'subtotal' => $subtotal,
            'shippingFee' => $this->cartService->getShippingFee(),
            'tasteFirst' => $this->tasteFirstService->getCheckoutData($subtotal),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_name' => 'required|string|max:255',
            'shipping_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string|max:100',
            'shipping_state' => 'required|string|max:100',
            'shipping_pincode' => 'required|string|max:10',
            'payment_method' => 'required|in:cod,online',
            'refund_protection' => 'boolean',
        ]);

        $cart = $this->cartService->getCurrentCart();

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty!');
        }

        $subtotal = $this->cartService->getSubtotal();
        $shippingFee = $this->cartService->getShippingFee();

        $hasRefundProtection = $request->boolean('refund_protection') && $this->tasteFirstService->isEnabled();
        $refundFee = $hasRefundProtection ? $this->tasteFirstService->calculateFee($subtotal) : 0;

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'user_id' => Auth::id(),
            'subtotal' => $subtotal,
            'shipping_fee' => $shippingFee,
            'discount' => 0,
            'total' => $subtotal + $shippingFee + $refundFee,
            'status' => 'pending',
            'payment_method' => $request->payment_method,
            'shipping_name' => $request->shipping_name,
            'shipping_phone' => $request->shipping_phone,
            'shipping_address' => $request->shipping_address,
            'shipping_city' => $request->shipping_city,
            'shipping_state' => $request->shipping_state,
            'shipping_pincode' => $request->shipping_pincode,
            'notes' => $request->notes,
            'has_refund_protection' => $hasRefundProtection,
            'refund_protection_fee' => $refundFee,
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'product_size_id' => $item->product_size_id,
                'product_name' => $item->product->name,
                'size_label' => $item->productSize->size_label,
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
                'total_price' => $item->unit_price * $item->quantity,
            ]);
        }

        if ($hasRefundProtection) {
            $this->tasteFirstService->generateSealNumbers($order->load('items'));
        }

        $this->cartService->clearCart();

        return redirect()->route('orders.confirmation', $order)
            ->with('success', 'Order placed successfully!');
    }
}
