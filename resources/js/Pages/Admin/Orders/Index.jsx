import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { MagnifyingGlassIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const statusColors = {
    pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    confirmed: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    processing: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    shipped: 'bg-purple-50 text-purple-700 ring-purple-600/20',
    delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
};

export default function Index({ orders, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), { search, status }, { preserveState: true });
    };

    return (
        <AdminLayout header="Orders">
            <Head title="Orders" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-2.5">
                        <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{orders.total} Orders</h2>
                        <p className="text-sm text-gray-500">Manage customer orders</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                    <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by order number, customer name, phone..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border-gray-200 py-2.5 pl-11 pr-4 text-sm focus:border-orange-500 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-xl border-gray-200 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button type="submit" className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                            Search
                        </button>
                        {(search || status) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    setStatus('');
                                    router.get(route('admin.orders.index'));
                                }}
                                className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                            >
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                {/* Orders Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Order</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Payment</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center">
                                            <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-300" />
                                            <p className="mt-3 text-sm font-medium text-gray-500">No orders found</p>
                                            <p className="text-sm text-gray-400">Try adjusting your search or filter.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.data.map((order, index) => (
                                        <tr key={order.id} className={`transition-colors hover:bg-blue-50/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="text-sm font-semibold text-gray-900">{order.order_number}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                                                        {(order.shipping_name || 'G').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{order.shipping_name}</div>
                                                        <div className="text-xs text-gray-500">{order.shipping_phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                                                ₹{order.total.toLocaleString('en-IN')}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
                                                    {order.payment_method}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusColors[order.status]}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('en-IN')}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <Link
                                                    href={route('admin.orders.show', order.id)}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-100"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {orders.links && orders.links.length > 3 && (
                        <div className="border-t border-gray-100 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-semibold text-gray-700">{orders.from}</span> to{' '}
                                    <span className="font-semibold text-gray-700">{orders.to}</span> of{' '}
                                    <span className="font-semibold text-gray-700">{orders.total}</span> orders
                                </p>
                                <div className="flex gap-1.5">
                                    {orders.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveState
                                            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-orange-600 text-white shadow-sm'
                                                    : link.url
                                                      ? 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                                                      : 'cursor-not-allowed bg-gray-50 text-gray-300'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
