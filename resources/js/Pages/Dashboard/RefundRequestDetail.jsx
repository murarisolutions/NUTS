import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    under_review: 'bg-blue-100 text-blue-800 border-blue-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    refunded: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

const statusLabels = {
    pending: 'Pending',
    under_review: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected',
    refunded: 'Refunded',
};

const statusMessages = {
    pending: 'Your refund request has been submitted and is awaiting review.',
    under_review: 'Your refund request is currently being reviewed by our team.',
    approved: 'Your refund request has been approved! The refund will be processed shortly.',
    rejected: 'Unfortunately, your refund request has been rejected.',
    refunded: 'Your refund has been processed successfully.',
};

export default function RefundRequestDetail({ refundRequest }) {
    const order = refundRequest.order;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Refund Request #{refundRequest.refund_number}
                </h2>
            }
        >
            <Head title={`Refund ${refundRequest.refund_number}`} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link
                            href={route('orders.show', refundRequest.order_id)}
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to Order
                        </Link>
                    </div>

                    {/* Status Card */}
                    <div className={`mb-6 rounded-xl border-2 p-6 ${statusColors[refundRequest.status]}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusColors[refundRequest.status]}`}>
                                    {statusLabels[refundRequest.status]}
                                </span>
                                <p className="mt-2 text-sm">{statusMessages[refundRequest.status]}</p>
                            </div>
                            <p className="text-2xl font-bold">₹{parseFloat(refundRequest.refund_amount).toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    {/* Rejection Reason */}
                    {refundRequest.rejection_reason && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6">
                            <h3 className="mb-2 text-sm font-semibold text-red-800">Rejection Reason</h3>
                            <p className="text-sm text-red-700">{refundRequest.rejection_reason}</p>
                        </div>
                    )}

                    {/* Refund Info */}
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Refund Details</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <dt className="text-gray-500">Refund Number</dt>
                                <dd className="font-medium text-gray-900">{refundRequest.refund_number}</dd>
                            </div>
                            <div className="flex justify-between text-sm">
                                <dt className="text-gray-500">Order Number</dt>
                                <dd>
                                    <Link href={route('orders.show', refundRequest.order_id)} className="font-medium text-green-600 hover:text-green-800">
                                        #{order?.order_number}
                                    </Link>
                                </dd>
                            </div>
                            <div className="flex justify-between text-sm">
                                <dt className="text-gray-500">Requested On</dt>
                                <dd className="text-gray-900">{new Date(refundRequest.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
                            </div>
                            {refundRequest.resolved_at && (
                                <div className="flex justify-between text-sm">
                                    <dt className="text-gray-500">Resolved On</dt>
                                    <dd className="text-gray-900">{new Date(refundRequest.resolved_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Reason */}
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Your Reason</h3>
                        <p className="text-sm text-gray-700">{refundRequest.reason}</p>
                    </div>

                    {/* Order Items */}
                    {order?.items && (
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                            </div>
                            <div className="divide-y divide-gray-100 px-6">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{item.product_name}</p>
                                            <p className="text-xs text-gray-500">
                                                {item.size_label && `${item.size_label} - `}Qty: {item.quantity}
                                                {item.seal_number && (
                                                    <span className="ml-2 inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                                                        Seal: {item.seal_number}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            ₹{parseFloat(item.total_price).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
