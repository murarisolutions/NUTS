import { Head, Link, router } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';
import { imageUrl } from '@/utils';

export default function Cart({ cart, cartItems, subtotal, shippingFee }) {
    const updateQuantity = (itemId, quantity) => {
        if (quantity < 1) return;
        router.patch(route('cart.update', itemId), { quantity }, {
            preserveScroll: true,
        });
    };

    const removeItem = (itemId) => {
        router.delete(route('cart.destroy', itemId), {
            preserveScroll: true,
        });
    };

    const total = subtotal + shippingFee;

    return (
        <StoreLayout>
            <Head title="Shopping Cart" />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Shopping Cart</h1>
                    <p>Review your items and proceed to checkout</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {!cartItems || cartItems.length === 0 ? (
                        /* Empty Cart */
                        <div className="empty-cart">
                            <div className="empty-cart-icon">
                                <i className="fas fa-shopping-bag"></i>
                            </div>
                            <h2>Your cart is empty</h2>
                            <p>
                                Looks like you haven't added any items to your cart yet. Browse our collection of premium dry fruits and nuts.
                            </p>
                            <Link href={route('home')} className="btn btn-primary">
                                <i className="fas fa-arrow-left"></i> Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        /* Cart with Items */
                        <div className="cart-layout">
                            {/* Left Column - Cart Items */}
                            <div>
                                <div className="cart-header">
                                    <h2>Cart Items ({cartItems.length})</h2>
                                    <Link href={route('home')} className="continue-shopping">
                                        <i className="fas fa-arrow-left"></i> Continue Shopping
                                    </Link>
                                </div>

                                {/* Cart Table */}
                                <div className="cart-table-wrapper">
                                    <table className="cart-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th className="text-center">Price</th>
                                                <th className="text-center">Quantity</th>
                                                <th className="text-center">Total</th>
                                                <th className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item) => (
                                                <tr key={item.id}>
                                                    {/* Product Info */}
                                                    <td>
                                                        <div className="cart-item-product">
                                                            <div className="cart-item-image">
                                                                {imageUrl(item.product?.image) ? (
                                                                    <img
                                                                        src={imageUrl(item.product.image)}
                                                                        alt={item.product.name}
                                                                    />
                                                                ) : (
                                                                    <i className="fas fa-seedling" style={{ fontSize: '2rem', color: '#c8922c', opacity: 0.3 }}></i>
                                                                )}
                                                            </div>
                                                            <div className="cart-item-info">
                                                                <Link href={route('product.show', item.product?.slug)}>
                                                                    <h3>{item.product?.name}</h3>
                                                                </Link>
                                                                {item.productSize && (
                                                                    <span className="cart-item-size">
                                                                        {item.productSize.size_label}
                                                                    </span>
                                                                )}
                                                                {item.product?.category && (
                                                                    <span className="cart-item-category">
                                                                        {item.product.category.name || item.product.category}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Unit Price */}
                                                    <td className="cart-item-price">
                                                        ₹{parseFloat(item.unit_price).toFixed(2)}
                                                    </td>

                                                    {/* Quantity Controls */}
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className="qty-controls" style={{ display: 'inline-flex' }}>
                                                            <button
                                                                className="qty-minus"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                                style={{ opacity: item.quantity <= 1 ? 0.4 : 1 }}
                                                            >
                                                                <i className="fas fa-minus"></i>
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="qty-input"
                                                                value={item.quantity}
                                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                                min="1"
                                                                readOnly
                                                            />
                                                            <button
                                                                className="qty-plus"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                <i className="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </td>

                                                    {/* Total Price */}
                                                    <td className="cart-item-total">
                                                        ₹{parseFloat(item.total_price).toFixed(2)}
                                                    </td>

                                                    {/* Remove Button */}
                                                    <td style={{ textAlign: 'center' }}>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="btn-remove-item"
                                                            title="Remove item"
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div>
                                <div className="cart-summary">
                                    <h3>Order Summary</h3>

                                    <div className="cart-summary-row">
                                        <span>Subtotal</span>
                                        <span>₹{parseFloat(subtotal).toFixed(2)}</span>
                                    </div>

                                    <div className="cart-summary-row">
                                        <span>Shipping</span>
                                        <span>{shippingFee === 0 ? 'Free' : `₹${parseFloat(shippingFee).toFixed(2)}`}</span>
                                    </div>

                                    {subtotal < 999 && shippingFee > 0 && (
                                        <div style={{
                                            padding: '12px 16px',
                                            background: 'rgba(200, 146, 44, 0.1)',
                                            borderRadius: '12px',
                                            marginTop: '16px',
                                            fontSize: '13px',
                                            color: '#c8922c',
                                            fontWeight: 500,
                                            textAlign: 'center'
                                        }}>
                                            <i className="fas fa-info-circle"></i> Add ₹{(999 - subtotal).toFixed(2)} more for free shipping!
                                        </div>
                                    )}

                                    <div className="cart-summary-total">
                                        <span>Total</span>
                                        <span>₹{parseFloat(total).toFixed(2)}</span>
                                    </div>

                                    <Link
                                        href={route('checkout.index')}
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        Proceed to Checkout <i className="fas fa-arrow-right"></i>
                                    </Link>

                                    <Link
                                        href={route('home')}
                                        className="btn btn-outline"
                                        style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
                                    >
                                        <i className="fas fa-arrow-left"></i> Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </StoreLayout>
    );
}
