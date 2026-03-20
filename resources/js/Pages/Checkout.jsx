import { Head, Link, router, useForm } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';
import { imageUrl } from '@/utils';

export default function Checkout({ cartItems, addresses, subtotal, shippingFee, tasteFirst }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_name: '',
        shipping_phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_state: '',
        shipping_pincode: '',
        notes: '',
        payment_method: 'cod',
        refund_protection: false,
    });

    const refundFee = data.refund_protection ? (tasteFirst?.fee || 0) : 0;
    const total = subtotal + shippingFee + refundFee;

    const handleAddressSelect = (e) => {
        const addressId = e.target.value;
        if (!addressId) return;

        const selected = addresses.find((addr) => addr.id === parseInt(addressId));
        if (selected) {
            setData({
                ...data,
                shipping_name: selected.name || '',
                shipping_phone: selected.phone || '',
                shipping_address: selected.address || selected.address_line || '',
                shipping_city: selected.city || '',
                shipping_state: selected.state || '',
                shipping_pincode: selected.pincode || selected.zip || '',
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <StoreLayout>
            <Head title="Checkout" />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Checkout</h1>
                    <p>Complete your order</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>

                            {/* Left Column - Shipping Form */}
                            <div>
                                {/* Saved Addresses */}
                                {addresses && addresses.length > 0 && (
                                    <div style={{
                                        background: '#fff',
                                        borderRadius: '14px',
                                        border: '1px solid #e5e7eb',
                                        padding: '24px',
                                        marginBottom: '24px',
                                    }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <i className="fas fa-address-book" style={{ color: '#1a5632' }}></i>
                                            Use Saved Address
                                        </h3>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <select
                                                onChange={handleAddressSelect}
                                                defaultValue=""
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    color: '#111827',
                                                    background: '#f9fafb',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <option value="">-- Select a saved address --</option>
                                                {addresses.map((addr) => (
                                                    <option key={addr.id} value={addr.id}>
                                                        {addr.name || addr.label} - {addr.city}, {addr.state}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {/* Shipping Details Form */}
                                <div style={{
                                    background: '#fff',
                                    borderRadius: '14px',
                                    border: '1px solid #e5e7eb',
                                    padding: '28px',
                                    marginBottom: '24px',
                                }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '24px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-shipping-fast" style={{ color: '#1a5632' }}></i>
                                        Shipping Details
                                    </h3>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name <span style={{ color: '#dc2626' }}>*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={data.shipping_name}
                                                onChange={(e) => setData('shipping_name', e.target.value)}
                                            />
                                            {errors.shipping_name && (
                                                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.shipping_name}</span>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number <span style={{ color: '#dc2626' }}>*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter your phone number"
                                                value={data.shipping_phone}
                                                onChange={(e) => setData('shipping_phone', e.target.value)}
                                            />
                                            {errors.shipping_phone && (
                                                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.shipping_phone}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Shipping Address <span style={{ color: '#dc2626' }}>*</span></label>
                                        <textarea
                                            placeholder="Enter your complete address"
                                            value={data.shipping_address}
                                            onChange={(e) => setData('shipping_address', e.target.value)}
                                            style={{ height: '90px' }}
                                        />
                                        {errors.shipping_address && (
                                            <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.shipping_address}</span>
                                        )}
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>City <span style={{ color: '#dc2626' }}>*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter your city"
                                                value={data.shipping_city}
                                                onChange={(e) => setData('shipping_city', e.target.value)}
                                            />
                                            {errors.shipping_city && (
                                                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.shipping_city}</span>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>State <span style={{ color: '#dc2626' }}>*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter your state"
                                                value={data.shipping_state}
                                                onChange={(e) => setData('shipping_state', e.target.value)}
                                            />
                                            {errors.shipping_state && (
                                                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.shipping_state}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>PIN Code <span style={{ color: '#dc2626' }}>*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter PIN code"
                                                value={data.shipping_pincode}
                                                onChange={(e) => setData('shipping_pincode', e.target.value)}
                                            />
                                            {errors.shipping_pincode && (
                                                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>{errors.shipping_pincode}</span>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>Order Notes <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></label>
                                            <input
                                                type="text"
                                                placeholder="Any special instructions"
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div style={{
                                    background: '#fff',
                                    borderRadius: '14px',
                                    border: '1px solid #e5e7eb',
                                    padding: '28px',
                                }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '24px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-credit-card" style={{ color: '#1a5632' }}></i>
                                        Payment Method
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '14px',
                                                padding: '16px 20px',
                                                border: `2px solid ${data.payment_method === 'cod' ? '#1a5632' : '#e5e7eb'}`,
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: data.payment_method === 'cod' ? 'rgba(26, 86, 50, 0.04)' : '#fff',
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="cod"
                                                checked={data.payment_method === 'cod'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                style={{ width: '18px', height: '18px', accentColor: '#1a5632' }}
                                            />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                                <i className="fas fa-money-bill-wave" style={{ fontSize: '18px', color: '#1a5632' }}></i>
                                                <div>
                                                    <strong style={{ fontSize: '14px', color: '#111827', display: 'block' }}>Cash on Delivery (COD)</strong>
                                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Pay when you receive your order</span>
                                                </div>
                                            </div>
                                        </label>

                                        <label
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '14px',
                                                padding: '16px 20px',
                                                border: `2px solid ${data.payment_method === 'online' ? '#1a5632' : '#e5e7eb'}`,
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: data.payment_method === 'online' ? 'rgba(26, 86, 50, 0.04)' : '#fff',
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="online"
                                                checked={data.payment_method === 'online'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                style={{ width: '18px', height: '18px', accentColor: '#1a5632' }}
                                            />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                                <i className="fas fa-globe" style={{ fontSize: '18px', color: '#1a5632' }}></i>
                                                <div>
                                                    <strong style={{ fontSize: '14px', color: '#111827', display: 'block' }}>Online Payment</strong>
                                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Pay securely via UPI, Cards, Net Banking</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    {errors.payment_method && (
                                        <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '8px', display: 'block' }}>{errors.payment_method}</span>
                                    )}
                                </div>

                                {/* Taste First Refund Protection */}
                                {tasteFirst?.enabled && (
                                    <div style={{
                                        background: '#fff',
                                        borderRadius: '14px',
                                        border: data.refund_protection ? '2px solid #1a5632' : '1px solid #e5e7eb',
                                        padding: '28px',
                                        marginTop: '24px',
                                        transition: 'all 0.3s ease',
                                    }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <i className="fas fa-shield-alt" style={{ color: '#1a5632' }}></i>
                                            Taste First Refund Protection
                                        </h3>

                                        <label
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '14px',
                                                padding: '16px 20px',
                                                border: `2px solid ${data.refund_protection ? '#1a5632' : '#e5e7eb'}`,
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                background: data.refund_protection ? 'rgba(26, 86, 50, 0.04)' : '#fff',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.refund_protection}
                                                onChange={(e) => setData('refund_protection', e.target.checked)}
                                                style={{ width: '18px', height: '18px', accentColor: '#1a5632', marginTop: '2px' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                                    <strong style={{ fontSize: '14px', color: '#111827' }}>Add Taste First Protection</strong>
                                                    <span style={{
                                                        fontSize: '12px',
                                                        fontWeight: 700,
                                                        color: refundFee === 0 ? '#16a34a' : '#1a5632',
                                                        background: refundFee === 0 ? '#f0fdf4' : '#f0f9ff',
                                                        padding: '2px 8px',
                                                        borderRadius: '12px',
                                                    }}>
                                                        {refundFee === 0 ? 'FREE' : `₹${refundFee.toFixed(2)}`}
                                                    </span>
                                                </div>
                                                <span style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
                                                    {tasteFirst.description || 'Get a free sample pack with your order. Taste it first — if unsatisfied, return the sealed main pack for a full refund!'}
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Order Summary */}
                            <div style={{
                                background: '#fff',
                                borderRadius: '14px',
                                border: '1px solid #e5e7eb',
                                padding: '28px',
                                position: 'sticky',
                                top: '100px',
                            }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb' }}>
                                    Order Summary
                                </h3>

                                {/* Items List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                                    {cartItems.map((item) => (
                                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid #f3f4f6' }}>
                                            <div style={{
                                                width: '52px',
                                                height: '52px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                background: '#f0fdf4',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                {imageUrl(item.product?.image) ? (
                                                    <img
                                                        src={imageUrl(item.product.image)}
                                                        alt={item.product.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <i className="fas fa-seedling" style={{ fontSize: '1.2rem', color: '#1a5632', opacity: 0.3 }}></i>
                                                )}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: '13px', fontWeight: 600, color: '#111827', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {item.product?.name}
                                                </p>
                                                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                                    {item.productSize?.size_label && `${item.productSize.size_label} - `}Qty: {item.quantity}
                                                </span>
                                            </div>
                                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a5632', whiteSpace: 'nowrap' }}>
                                                ₹{(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Subtotal</span>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>₹{parseFloat(subtotal).toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Shipping</span>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: shippingFee === 0 ? '#16a34a' : '#111827' }}>
                                            {shippingFee === 0 ? 'FREE' : `₹${parseFloat(shippingFee).toFixed(2)}`}
                                        </span>
                                    </div>
                                    {data.refund_protection && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '14px', color: '#6b7280' }}>Refund Protection</span>
                                            <span style={{ fontSize: '14px', fontWeight: 600, color: refundFee === 0 ? '#16a34a' : '#111827' }}>
                                                {refundFee === 0 ? 'FREE' : `₹${refundFee.toFixed(2)}`}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px 0',
                                    borderTop: '2px solid #e5e7eb',
                                    marginBottom: '24px',
                                }}>
                                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Total</span>
                                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a5632' }}>₹{total.toFixed(2)}</span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={processing}
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        fontSize: '15px',
                                        opacity: processing ? 0.6 : 1,
                                        cursor: processing ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {processing ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i> Processing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-check-circle"></i> Place Order
                                        </>
                                    )}
                                </button>

                                <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
                                        <i className="fas fa-lock" style={{ color: '#1a5632', fontSize: '11px' }}></i>
                                        Your payment information is secure
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
                                        <i className="fas fa-undo" style={{ color: '#1a5632', fontSize: '11px' }}></i>
                                        7-day easy return policy
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </StoreLayout>
    );
}
