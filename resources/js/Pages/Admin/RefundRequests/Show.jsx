import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeftIcon, ReceiptRefundIcon, UserIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const statusColors = {
    pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    under_review: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    rejected: 'bg-red-50 text-red-700 ring-red-600/20',
    refunded: 'bg-teal-50 text-teal-700 ring-teal-600/20',
};

const statusLabels = {
    pending: 'Pending',
    under_review: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected',
    refunded: 'Refunded',
};

export default function Show({ refundRequest }) {
    const order = refundRequest.order;
    const { data, setData, patch, processing, errors } = useForm({
        status: refundRequest.status,
        admin_notes: refundRequest.admin_notes || '',
        rejection_reason: refundRequest.rejection_reason || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.refund-requests.update', refundRequest.id), { preserveScroll: true });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.visit(route('admin.refund-requests.index'))}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <span>Refund {refundRequest.refund_number}</span>
                </div>
            }
        >
            <Head title={`Refund ${refundRequest.refund_number}`} />

            <div className="space-y-6">
                {/* Status Update */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50">
                                <ReceiptRefundIcon className="h-5 w-5 text-rose-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Refund Status</h3>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset ${statusColors[refundRequest.status]}`}>
                            {statusLabels[refundRequest.status]}
                        </span>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Update Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="under_review">Under Review</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                                <input
                                    type="text"
                                    value={data.admin_notes}
                                    onChange={(e) => setData('admin_notes', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Internal notes..."
                                />
                            </div>
                        </div>
                        {data.status === 'rejected' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rejection Reason (shown to customer)</label>
                                <textarea
                                    value={data.rejection_reason}
                                    onChange={(e) => setData('rejection_reason', e.target.value)}
                                    rows={2}
                                    className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Reason for rejection..."
                                />
                                {errors.rejection_reason && <p className="mt-1 text-sm text-red-600">{errors.rejection_reason}</p>}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400"
                            >
                                {processing ? 'Updating...' : 'Update Status'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Customer Info */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                <UserIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Customer Information</h3>
                        </div>
                        <dl className="space-y-4">
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Name</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">{refundRequest.user?.name}</dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Email</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">{refundRequest.user?.email}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Refund Details */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                <DocumentTextIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Refund Details</h3>
                        </div>
                        <dl className="space-y-4">
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Refund Number</dt>
                                <dd className="mt-0.5 text-sm font-semibold text-gray-900">{refundRequest.refund_number}</dd>
                            </div>
                            <div className="rounded-lg bg-emerald-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-emerald-600">Refund Amount</dt>
                                <dd className="mt-0.5 text-lg font-bold text-emerald-700">₹{parseFloat(refundRequest.refund_amount).toLocaleString('en-IN')}</dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Order</dt>
                                <dd className="mt-0.5">
                                    <Link href={route('admin.orders.show', refundRequest.order_id)} className="text-sm font-medium text-orange-600 hover:text-orange-800">
                                        {order?.order_number}
                                    </Link>
                                </dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Requested On</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">{new Date(refundRequest.created_at).toLocaleString('en-IN')}</dd>
                            </div>
                            {refundRequest.resolved_at && (
                                <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Resolved On</dt>
                                    <dd className="mt-0.5 text-sm font-medium text-gray-900">{new Date(refundRequest.resolved_at).toLocaleString('en-IN')}</dd>
                                </div>
                            )}
                            {refundRequest.resolver && (
                                <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Resolved By</dt>
                                    <dd className="mt-0.5 text-sm font-medium text-gray-900">{refundRequest.resolver.name}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>

                {/* Reason */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Customer's Reason</h3>
                    </div>
                    <p className="rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">{refundRequest.reason}</p>
                </div>

                {/* Rejection Reason */}
                {refundRequest.rejection_reason && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 ring-1 ring-red-100">
                        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-red-800">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                                <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </span>
                            Rejection Reason
                        </h3>
                        <p className="ml-10 text-sm text-red-700">{refundRequest.rejection_reason}</p>
                    </div>
                )}

                {/* Admin Notes */}
                {refundRequest.admin_notes && (
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 ring-1 ring-blue-100">
                        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-blue-800">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                            Admin Notes
                        </h3>
                        <p className="ml-10 text-sm text-blue-700">{refundRequest.admin_notes}</p>
                    </div>
                )}

                {/* Order Items with Seal Numbers */}
                {order?.items && (
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Order Items & Seal Numbers</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/80">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Size</th>
                                        <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Qty</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Seal Number</th>
                                        <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {order.items.map((item, index) => (
                                        <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.product_name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.size_label}</td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-600">{item.quantity}</td>
                                            <td className="px-6 py-4">
                                                {item.seal_number ? (
                                                    <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                                                        {item.seal_number}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">N/A</span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900">
                                                ₹{parseFloat(item.total_price).toLocaleString('en-IN')}
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
