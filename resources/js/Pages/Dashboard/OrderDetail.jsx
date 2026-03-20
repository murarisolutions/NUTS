import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function OrderDetail({ order, canRequestRefund }) {
    const subtotal = order.items.reduce(
        (sum, item) => sum + parseFloat(item.total_price),
        0
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-4">
                    <Link
                        href={route('orders.index')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Order #{order.order_number}
                    </h2>
                </div>
            }
        >
            <Head title={`Order #${order.order_number}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link
                            href={route('orders.index')}
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to Orders
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Order Items */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                statusColors[order.status] || 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Product
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Size
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Qty
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Unit Price
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Total
                                                </th>
                                                {order.has_refund_protection && (
                                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Seal #
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {order.items.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        {item.product_name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {item.size_label}
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                                        ₹{parseFloat(item.unit_price).toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                                                        ₹{parseFloat(item.total_price).toLocaleString('en-IN')}
                                                    </td>
                                                    {order.has_refund_protection && (
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            {item.seal_number ? (
                                                                <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                                                    {item.seal_number}
                                                                </span>
                                                            ) : '—'}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                                </div>
                                <div className="space-y-3 px-6 py-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Order Number</span>
                                        <span className="font-medium text-gray-900">#{order.order_number}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Order Date</span>
                                        <span className="text-gray-900">
                                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Subtotal</span>
                                            <span className="text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
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
                                            <span className="text-green-600">-₹{parseFloat(order.discount).toLocaleString('en-IN')}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-base font-semibold text-gray-900">Total</span>
                                            <span className="text-base font-semibold text-gray-900">
                                                ₹{parseFloat(order.total).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Taste First Protection */}
                            {order.has_refund_protection && (
                                <div className="rounded-xl border-2 border-green-200 bg-green-50 shadow-sm">
                                    <div className="border-b border-green-200 px-6 py-4">
                                        <h3 className="text-lg font-semibold text-green-800">Taste First Protection</h3>
                                    </div>
                                    <div className="px-6 py-4">
                                        <p className="mb-3 text-sm text-green-700">
                                            This order is protected. Taste the sample first — return the sealed main pack if unsatisfied.
                                        </p>
                                        {parseFloat(order.refund_protection_fee) > 0 && (
                                            <div className="mb-3 flex justify-between text-sm">
                                                <span className="text-green-600">Protection Fee</span>
                                                <span className="font-medium text-green-800">₹{parseFloat(order.refund_protection_fee).toLocaleString('en-IN')}</span>
                                            </div>
                                        )}
                                        {order.items?.some(item => item.seal_number) && (
                                            <div className="mb-3">
                                                <p className="mb-1 text-xs font-medium text-green-800">Seal Numbers:</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {order.items.filter(item => item.seal_number).map((item, i) => (
                                                        <span key={i} className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                            {item.seal_number}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {canRequestRefund && (
                                            <Link
                                                href={route('refund.create', order.id)}
                                                className="mt-2 block w-full rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                                            >
                                                Request Refund
                                            </Link>
                                        )}
                                        {order.latest_refund_request && (
                                            <Link
                                                href={route('refund.show', order.latest_refund_request.id)}
                                                className="mt-2 block w-full rounded-lg border border-green-300 px-4 py-2.5 text-center text-sm font-semibold text-green-700 hover:bg-green-100"
                                            >
                                                View Refund Request ({order.latest_refund_request.status.replace('_', ' ')})
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Shipping Details */}
                            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Shipping Details</h3>
                                </div>
                                <div className="px-6 py-4">
                                    {order.shipping_address ? (
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p className="font-medium text-gray-900">
                                                {order.shipping_address.name}
                                            </p>
                                            <p>{order.shipping_address.address_line_1}</p>
                                            {order.shipping_address.address_line_2 && (
                                                <p>{order.shipping_address.address_line_2}</p>
                                            )}
                                            <p>
                                                {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
                                            </p>
                                            {order.shipping_address.phone && (
                                                <p className="pt-2">
                                                    <span className="text-gray-500">Phone:</span>{' '}
                                                    {order.shipping_address.phone}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">No shipping details available.</p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Info */}
                            {order.payment_method && (
                                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                                    <div className="border-b border-gray-200 px-6 py-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Payment</h3>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Payment Method</span>
                                            <span className="font-medium capitalize text-gray-900">
                                                {order.payment_method}
                                            </span>
                                        </div>
                                        {order.payment_status && (
                                            <div className="mt-2 flex justify-between text-sm">
                                                <span className="text-gray-500">Payment Status</span>
                                                <span className="font-medium capitalize text-gray-900">
                                                    {order.payment_status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
