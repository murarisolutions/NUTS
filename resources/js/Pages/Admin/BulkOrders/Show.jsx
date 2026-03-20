import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeftIcon, TruckIcon, UserIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const statusColors = {
    pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    contacted: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    quoted: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    accepted: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    rejected: 'bg-red-50 text-red-700 ring-red-600/20',
};

const statusLabels = {
    pending: 'Pending',
    contacted: 'Contacted',
    quoted: 'Quoted',
    accepted: 'Accepted',
    rejected: 'Rejected',
};

export default function Show({ bulkOrder }) {
    const { data, setData, patch, processing } = useForm({
        status: bulkOrder.status,
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.bulk-orders.update', bulkOrder.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.visit(route('admin.bulk-orders.index'))}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <span>Bulk Order Request</span>
                </div>
            }
        >
            <Head title="Bulk Order Details" />

            <div className="space-y-6">
                {/* Status Update */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                <TruckIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Order Status</h3>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset ${statusColors[bulkOrder.status]}`}>
                            {statusLabels[bulkOrder.status] || bulkOrder.status}
                        </span>
                    </div>
                    <form onSubmit={handleStatusUpdate} className="flex items-end gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Update Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="quoted">Quoted</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={processing || data.status === bulkOrder.status}
                            className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            {processing ? 'Updating...' : 'Update Status'}
                        </button>
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
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">{bulkOrder.name}</dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Email</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">{bulkOrder.email}</dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Phone</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">{bulkOrder.phone}</dd>
                            </div>
                            {bulkOrder.company_name && (
                                <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Company</dt>
                                    <dd className="mt-0.5 text-sm font-medium text-gray-900">{bulkOrder.company_name}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Order Details */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                <DocumentTextIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
                        </div>
                        <dl className="space-y-4">
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Product</dt>
                                <dd className="mt-0.5 text-sm font-semibold text-gray-900">{bulkOrder.product_name}</dd>
                            </div>
                            <div className="rounded-lg bg-indigo-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-indigo-600">Quantity</dt>
                                <dd className="mt-0.5 text-lg font-bold text-indigo-700">
                                    {bulkOrder.quantity} {bulkOrder.unit}
                                </dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Request Date</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">
                                    {new Date(bulkOrder.created_at).toLocaleString('en-IN')}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Message */}
                {bulkOrder.message && (
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                                <ChatBubbleLeftRightIcon className="h-5 w-5 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Customer Message</h3>
                        </div>
                        <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">{bulkOrder.message}</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
