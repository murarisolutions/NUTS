import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeftIcon, PrinterIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const refundStatusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    refunded: 'bg-emerald-100 text-emerald-800',
};

const allStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusConfig = {
    pending: { color: 'bg-amber-500', ring: 'ring-amber-500', text: 'text-amber-700', bg: 'bg-amber-50', btnColor: 'bg-amber-500 hover:bg-amber-600' },
    confirmed: { color: 'bg-blue-500', ring: 'ring-blue-500', text: 'text-blue-700', bg: 'bg-blue-50', btnColor: 'bg-blue-500 hover:bg-blue-600' },
    processing: { color: 'bg-indigo-500', ring: 'ring-indigo-500', text: 'text-indigo-700', bg: 'bg-indigo-50', btnColor: 'bg-indigo-500 hover:bg-indigo-600' },
    shipped: { color: 'bg-purple-500', ring: 'ring-purple-500', text: 'text-purple-700', bg: 'bg-purple-50', btnColor: 'bg-purple-500 hover:bg-purple-600' },
    delivered: { color: 'bg-emerald-500', ring: 'ring-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50', btnColor: 'bg-emerald-500 hover:bg-emerald-600' },
    cancelled: { color: 'bg-red-500', ring: 'ring-red-500', text: 'text-red-700', bg: 'bg-red-50', btnColor: 'bg-red-500 hover:bg-red-600' },
};

export default function Show({ order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.orders.update', order.id), {
            preserveScroll: true,
        });
    };

    const currentStatusIndex = allStatuses.indexOf(order.status);
    const isCancelled = order.status === 'cancelled';
    const timelineStatuses = allStatuses.filter((s) => s !== 'cancelled');

    const userInitials = (name) =>
        name
            ? name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
            : '?';

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.visit(route('admin.orders.index'))}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <span>Order {order.order_number}</span>
                </div>
            }
        >
            <Head title={`Order ${order.order_number}`} />

            <div className="space-y-6">
                {/* Status Timeline */}
                <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-base font-bold text-gray-900">Order Progress</h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => window.print()}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                                <PrinterIcon className="h-4 w-4" />
                                Print
                            </button>
                        </div>
                    </div>

                    {isCancelled ? (
                        <div className="flex items-center gap-3 rounded-xl bg-red-50 px-5 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-red-800">Order Cancelled</p>
                                <p className="text-sm text-red-600">This order has been cancelled.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            {timelineStatuses.map((s, index) => {
                                const isCompleted = currentStatusIndex >= index;
                                const isCurrent = currentStatusIndex === index;
                                const config = statusConfig[s];
                                return (
                                    <div key={s} className="flex flex-1 items-center">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                                                    isCompleted
                                                        ? `${config.color} text-white shadow-sm`
                                                        : 'bg-gray-100 text-gray-400'
                                                } ${isCurrent ? `ring-4 ${config.ring}/20` : ''}`}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircleIcon className="h-5 w-5" />
                                                ) : (
                                                    <span className="text-xs font-bold">{index + 1}</span>
                                                )}
                                            </div>
                                            <span className={`mt-2 text-xs font-semibold capitalize ${isCompleted ? config.text : 'text-gray-400'}`}>
                                                {s}
                                            </span>
                                        </div>
                                        {index < timelineStatuses.length - 1 && (
                                            <div className={`mx-2 h-0.5 flex-1 rounded-full transition-colors ${
                                                currentStatusIndex > index ? statusConfig[timelineStatuses[index + 1]].color : 'bg-gray-200'
                                            }`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Status Update */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <form onSubmit={handleStatusUpdate} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                            <div className="flex-1">
                                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Update Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="block w-full rounded-xl border-gray-200 text-sm focus:border-orange-500 focus:ring-orange-500"
                                >
                                    {allStatuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={processing || data.status === order.status}
                                className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 disabled:bg-gray-300 ${
                                    statusConfig[data.status]?.btnColor || 'bg-orange-600 hover:bg-orange-500'
                                }`}
                            >
                                {processing ? 'Updating...' : 'Update Status'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Customer Info */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h3 className="text-base font-bold text-gray-900">Customer Information</h3>
                        </div>
                        <div className="p-6">
                            {order.user && (
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                                        {userInitials(order.user.name)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.user.name}</p>
                                        <p className="text-sm text-gray-500">{order.user.email}</p>
                                    </div>
                                </div>
                            )}
                            <dl className="space-y-3">
                                {order.user?.phone && (
                                    <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                        <dd className="text-sm font-medium text-gray-900">{order.user.phone}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h3 className="text-base font-bold text-gray-900">Shipping Address</h3>
                        </div>
                        <div className="p-6">
                            <dl className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="text-sm font-medium text-gray-900">{order.shipping_name}</dd>
                                </div>
                                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                    <dd className="text-sm font-medium text-gray-900">{order.shipping_phone}</dd>
                                </div>
                                <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {order.shipping_address}<br />
                                        {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h3 className="text-base font-bold text-gray-900">Order Items</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Size</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                                    <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Qty</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                    {order.has_refund_protection && (
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Seal #</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {order.items.map((item, index) => (
                                    <SealNumberRow key={item.id} item={item} index={index} order={order} />
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t border-gray-100">
                                    <td colSpan={order.has_refund_protection ? 5 : 4} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Subtotal</td>
                                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        ₹{order.subtotal.toLocaleString('en-IN')}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={order.has_refund_protection ? 5 : 4} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Shipping Fee</td>
                                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        ₹{order.shipping_fee.toLocaleString('en-IN')}
                                    </td>
                                </tr>
                                {order.has_refund_protection && (
                                    <tr>
                                        <td colSpan={order.has_refund_protection ? 5 : 4} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Refund Protection</td>
                                        <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                            {parseFloat(order.refund_protection_fee) === 0 ? 'Free' : `₹${parseFloat(order.refund_protection_fee).toLocaleString('en-IN')}`}
                                        </td>
                                    </tr>
                                )}
                                {order.discount > 0 && (
                                    <tr>
                                        <td colSpan={order.has_refund_protection ? 5 : 4} className="px-6 py-3 text-right text-sm font-medium text-gray-500">Discount</td>
                                        <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-emerald-600">
                                            -₹{order.discount.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                )}
                                <tr className="border-t-2 border-gray-200">
                                    <td colSpan={order.has_refund_protection ? 5 : 4} className="px-6 py-4 text-right text-base font-bold text-gray-900">Total</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-lg font-bold text-gray-900">
                                        ₹{order.total.toLocaleString('en-IN')}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Payment & Notes */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h3 className="text-base font-bold text-gray-900">Payment Information</h3>
                        </div>
                        <div className="p-6">
                            <dl className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                                    <dd className="text-sm font-medium capitalize text-gray-900">{order.payment_method}</dd>
                                </div>
                                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-sm font-medium text-gray-500">Order Date</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        {new Date(order.created_at).toLocaleString('en-IN')}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {order.notes && (
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="border-b border-gray-100 px-6 py-4">
                                <h3 className="text-base font-bold text-gray-900">Order Notes</h3>
                            </div>
                            <div className="p-6">
                                <p className="rounded-xl bg-amber-50 p-4 text-sm text-gray-700">{order.notes}</p>
                            </div>
                        </div>
                    )}
                </div>
                {/* Taste First Protection */}
                {order.has_refund_protection && (
                    <div className="overflow-hidden rounded-xl bg-green-50 shadow-sm ring-1 ring-green-200">
                        <div className="border-b border-green-200 px-6 py-4">
                            <h3 className="text-base font-bold text-green-800">Taste First Protection</h3>
                        </div>
                        <div className="p-6">
                            <p className="mb-3 text-sm text-green-700">This order has Taste First refund protection enabled.</p>
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-green-100 px-4 py-2">
                                    <p className="text-xs text-green-600">Protection Fee</p>
                                    <p className="text-sm font-bold text-green-800">
                                        {parseFloat(order.refund_protection_fee) === 0 ? 'Free' : `₹${parseFloat(order.refund_protection_fee).toLocaleString('en-IN')}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Refund Requests */}
                {order.refund_requests && order.refund_requests.length > 0 && (
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h3 className="text-base font-bold text-gray-900">Refund Requests</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50/80">
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Refund #</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {order.refund_requests.map((req) => (
                                        <tr key={req.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{req.refund_number}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                                ₹{parseFloat(req.refund_amount).toLocaleString('en-IN')}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${refundStatusColors[req.status]}`}>
                                                    {req.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(req.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route('admin.refund-requests.show', req.id)}
                                                    className="text-sm font-medium text-orange-600 hover:text-orange-800"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function SealNumberRow({ item, index, order }) {
    const [editing, setEditing] = useState(false);
    const [sealNumber, setSealNumber] = useState(item.seal_number || '');
    const [saving, setSaving] = useState(false);

    const saveSealNumber = () => {
        setSaving(true);
        router.patch(route('admin.orders.update-seal', [order.id, item.id]), {
            seal_number: sealNumber,
        }, {
            preserveScroll: true,
            onFinish: () => {
                setSaving(false);
                setEditing(false);
            },
        });
    };

    return (
        <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.product_name}</td>
            <td className="px-6 py-4">
                <span className="inline-flex rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {item.size_label}
                </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700">
                ₹{item.unit_price.toLocaleString('en-IN')}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                    {item.quantity}
                </span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900">
                ₹{item.total_price.toLocaleString('en-IN')}
            </td>
            {order.has_refund_protection && (
                <td className="px-6 py-4 text-sm">
                    {editing ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={sealNumber}
                                onChange={(e) => setSealNumber(e.target.value)}
                                className="w-36 rounded-md border-gray-300 text-xs focus:border-orange-500 focus:ring-orange-500"
                            />
                            <button
                                onClick={saveSealNumber}
                                disabled={saving}
                                className="rounded bg-orange-600 px-2 py-1 text-xs font-medium text-white hover:bg-orange-500"
                            >
                                {saving ? '...' : 'Save'}
                            </button>
                            <button
                                onClick={() => { setEditing(false); setSealNumber(item.seal_number || ''); }}
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            {item.seal_number ? (
                                <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                                    {item.seal_number}
                                </span>
                            ) : (
                                <span className="text-gray-400">N/A</span>
                            )}
                            <button
                                onClick={() => setEditing(true)}
                                className="text-xs text-orange-600 hover:text-orange-800"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
}
