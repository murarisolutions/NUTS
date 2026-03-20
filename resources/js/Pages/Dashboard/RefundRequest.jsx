import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RefundRequest({ order, refundAmount }) {
    const { data, setData, post, processing, errors } = useForm({
        reason: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('refund.store', order.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Request Refund
                </h2>
            }
        >
            <Head title="Request Refund" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link
                            href={route('orders.show', order.id)}
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to Order
                        </Link>
                    </div>

                    {/* Order Info */}
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm text-gray-500">Order Number</span>
                            <span className="text-sm font-medium text-gray-900">#{order.order_number}</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-3">
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

                    {/* Refund Amount */}
                    <div className="mb-6 rounded-xl border-2 border-green-200 bg-green-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-800">Refund Amount</p>
                                <p className="text-xs text-green-600">Order total minus refund protection fee</p>
                            </div>
                            <p className="text-2xl font-bold text-green-700">₹{parseFloat(refundAmount).toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    {/* Refund Form */}
                    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Reason for Refund</h3>
                        <div className="mb-4">
                            <textarea
                                value={data.reason}
                                onChange={(e) => setData('reason', e.target.value)}
                                rows={5}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                placeholder="Please describe why you'd like a refund (minimum 10 characters)..."
                            />
                            {errors.reason && (
                                <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                            )}
                        </div>

                        <div className="rounded-lg bg-amber-50 p-4 mb-4">
                            <p className="text-sm text-amber-800">
                                <strong>Important:</strong> Please ensure the main pack is still sealed. You will need to return it to complete the refund process.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <Link
                                href={route('orders.show', order.id)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:bg-gray-300"
                            >
                                {processing ? 'Submitting...' : 'Submit Refund Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
