import StoreLayout from '@/Layouts/StoreLayout';
import { Head, Link } from '@inertiajs/react';

export default function OrderConfirmation({ order }) {
    return (
        <StoreLayout>
            <Head title="Order Confirmed" />

            <div className="min-h-[60vh] bg-gray-50 py-16">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
                        {/* Success Icon */}
                        <div className="text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                <svg
                                    className="h-10 w-10 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </div>

                            <h1 className="mt-6 text-3xl font-bold text-gray-900">
                                Order Confirmed!
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Thank you for your order. We've received it and will process it shortly.
                            </p>
                        </div>

                        {/* Order Number */}
                        <div className="mt-8 rounded-lg bg-amber-50 p-4 text-center">
                            <p className="text-sm font-medium text-amber-700">Order Number</p>
                            <p className="mt-1 text-2xl font-bold text-amber-900">
                                #{order.order_number}
                            </p>
                        </div>

                        {/* Order Items */}
                        {order.items && order.items.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                                <div className="mt-4 divide-y divide-gray-200">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-3">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {item.product_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item.size_label && `${item.size_label} - `}Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                                ₹{parseFloat(item.total_price).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                                    {order.shipping_charge !== undefined && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Shipping</span>
                                            <span className="text-gray-900">
                                                {parseFloat(order.shipping_charge) === 0
                                                    ? 'Free'
                                                    : `₹${parseFloat(order.shipping_charge).toLocaleString('en-IN')}`}
                                            </span>
                                        </div>
                                    )}
                                    {order.has_refund_protection && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Refund Protection</span>
                                            <span className="text-gray-900">
                                                {parseFloat(order.refund_protection_fee) === 0
                                                    ? 'Free'
                                                    : `₹${parseFloat(order.refund_protection_fee).toLocaleString('en-IN')}`}
                                            </span>
                                        </div>
                                    )}
                                    {order.discount !== undefined && parseFloat(order.discount) > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Discount</span>
                                            <span className="text-green-600">
                                                -₹{parseFloat(order.discount).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t border-gray-200 pt-2">
                                        <span className="text-base font-semibold text-gray-900">Total</span>
                                        <span className="text-base font-semibold text-gray-900">
                                            ₹{parseFloat(order.total).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Taste First Protection Info */}
                        {order.has_refund_protection && (
                            <div className="mt-8 rounded-lg border-2 border-green-200 bg-green-50 p-5">
                                <div className="flex items-start space-x-3">
                                    <svg className="mt-0.5 h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-semibold text-green-800">Taste First Protection Active</p>
                                        <p className="mt-1 text-sm text-green-700">
                                            Your order is protected! Taste the sample first — if unsatisfied, return the sealed main pack for a full refund.
                                        </p>
                                        {order.items?.some(item => item.seal_number) && (
                                            <div className="mt-3">
                                                <p className="text-xs font-medium text-green-800">Seal Numbers:</p>
                                                <div className="mt-1 flex flex-wrap gap-2">
                                                    {order.items.filter(item => item.seal_number).map((item, i) => (
                                                        <span key={i} className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            {item.seal_number}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Delivery Info */}
                        <div className="mt-8 rounded-lg bg-gray-50 p-4">
                            <div className="flex items-start space-x-3">
                                <svg className="mt-0.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        A confirmation email has been sent to your registered email address.
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        You can track your order from your dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href={route('orders.show', order.id)}
                                className="inline-flex items-center justify-center rounded-lg border border-amber-600 px-6 py-3 text-sm font-medium text-amber-600 hover:bg-amber-50"
                            >
                                View Order Details
                            </Link>
                            <Link
                                href={route('home')}
                                className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-amber-700"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
