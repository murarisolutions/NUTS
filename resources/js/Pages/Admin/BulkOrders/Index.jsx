import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TruckIcon, TrashIcon } from '@heroicons/react/24/outline';

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

export default function Index({ bulkOrders }) {
    const handleDelete = (bulkOrder) => {
        if (confirm('Are you sure you want to delete this bulk order request?')) {
            router.delete(route('admin.bulk-orders.destroy', bulkOrder.id));
        }
    };

    return (
        <AdminLayout header="Bulk Orders">
            <Head title="Bulk Orders" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                        <TruckIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Bulk Order Requests</h2>
                        <p className="text-sm text-gray-500">{bulkOrders.total} total requests</p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Contact</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Quantity</th>
                                    <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bulkOrders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center">
                                            <TruckIcon className="mx-auto h-12 w-12 text-gray-300" />
                                            <p className="mt-3 text-sm font-medium text-gray-900">No bulk orders found</p>
                                            <p className="mt-1 text-sm text-gray-500">Bulk order requests will appear here.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    bulkOrders.data.map((order, index) => (
                                        <tr key={order.id} className={`transition-colors hover:bg-indigo-50/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                                                        {(order.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{order.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-700">{order.email}</div>
                                                <div className="text-xs text-gray-500">{order.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">{order.product_name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="text-sm font-semibold text-gray-900">{order.quantity}</span>
                                                <span className="ml-1 text-sm text-gray-500">{order.unit}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusColors[order.status]}`}>
                                                    {statusLabels[order.status] || order.status}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.bulk-orders.show', order.id)}
                                                        className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-100"
                                                    >
                                                        View Details
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(order)}
                                                        className="inline-flex items-center rounded-lg bg-red-50 p-1.5 text-red-600 transition-colors hover:bg-red-100"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {bulkOrders.links && bulkOrders.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-700">{bulkOrders.from}</span> to{' '}
                                <span className="font-medium text-gray-700">{bulkOrders.to}</span> of{' '}
                                <span className="font-medium text-gray-700">{bulkOrders.total}</span>
                            </p>
                            <div className="flex gap-1.5">
                                {bulkOrders.links.map((link, i) => (
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
