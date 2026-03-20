<?php

namespace App\Http\Middleware;

use App\Models\BulkOrder;
use App\Models\Contact;
use App\Models\Order;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $cartService = app(CartService::class);

        $adminBadges = [];
        if ($request->user() && $request->user()->role === 'admin') {
            $adminBadges = [
                'pendingOrders' => Order::where('status', 'pending')->count(),
                'unreadContacts' => Contact::where('is_read', false)->count(),
                'pendingBulkOrders' => BulkOrder::where('status', 'pending')->count(),
            ];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cartCount' => $cartService->getCartCount(),
            'adminBadges' => $adminBadges,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
