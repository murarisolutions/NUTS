import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { ReceiptRefundIcon } from '@heroicons/react/24/outline';

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

export default function Index({ refundRequests, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.refund-requests.index'), { search, status: filters.status }, { preserveState: true });
    };

    const handleStatusFilter = (status) => {
        router.get(route('admin.refund-requests.index'), { search: filters.search, status }, { preserveState: true });
    };

    return (
        <AdminLayout header="Refund Requests">
            <Head title="Refund Requests" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50">
                            <ReceiptRefundIcon className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Refund Requests</h2>
                            <p className="text-sm text-gray-500">{refundRequests.total} total requests</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {['', 'pending', 'under_review', 'approved', 'rejected', 'refunded'].map((status) => (
                            <button
                                key={status}
                                onClick={() => handleStatusFilter(status)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    (filters.status || '') === status
                                        ? 'bg-orange-600 text-white shadow-sm'
                                        : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {status === '' ? 'All' : statusLabels[status]}
                            </button>
                        ))}
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by refund #, order #, customer..."
                            className="w-72 rounded-xl border-gray-200 text-sm shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Refund #</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Order #</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                                    <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {refundRequests.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center">
                                            <ReceiptRefundIcon className="mx-auto h-12 w-12 text-gray-300" />
                                            <p className="mt-3 text-sm font-medium text-gray-900">No refund requests found</p>
                                            <p className="mt-1 text-sm text-gray-500">Refund requests from customers will appear here.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    refundRequests.data.map((request, index) => (
                                        <tr key={request.id} className={`transition-colors hover:bg-rose-50/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="text-sm font-semibold text-gray-900">{request.refund_number}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <Link href={route('admin.orders.show', request.order_id)} className="font-medium text-orange-600 hover:text-orange-800">
                                                    {request.order?.order_number}
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                                                        {(request.user?.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{request.user?.name}</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <span className="text-sm font-bold text-gray-900">₹{parseFloat(request.refund_amount).toLocaleString('en-IN')}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusColors[request.status]}`}>
                                                    {statusLabels[request.status]}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {new Date(request.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <Link
                                                    href={route('admin.refund-requests.show', request.id)}
                                                    className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-100"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {refundRequests.links && refundRequests.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-700">{refundRequests.from}</span> to{' '}
                                <span className="font-medium text-gray-700">{refundRequests.to}</span> of{' '}
                                <span className="font-medium text-gray-700">{refundRequests.total}</span>
                            </p>
                            <div className="flex gap-1.5">
                                {refundRequests.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-orange-600 text-white shadow-sm'
                                                : link.url
                                                ? 'text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                                                : 'cursor-not-allowed text-gray-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
