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

export default function Orders({ orders }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Orders
                </h2>
            }
        >
            <Head title="My Orders" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        {orders.data && orders.data.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Order Number
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Items
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Total
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {orders.data.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50">
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        #{order.order_number}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {order.items_count || (order.items ? order.items.length : 0)} item(s)
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        ₹{parseFloat(order.total).toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                                                                statusColors[order.status] || 'bg-gray-100 text-gray-800'
                                                            }`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                        <Link
                                                            href={route('orders.show', order.id)}
                                                            className="font-medium text-amber-600 hover:text-amber-700"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {orders.links && orders.links.length > 3 && (
                                    <div className="border-t border-gray-200 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-500">
                                                Showing {orders.from} to {orders.to} of {orders.total} orders
                                            </p>
                                            <div className="flex space-x-1">
                                                {orders.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`rounded-md px-3 py-1.5 text-sm ${
                                                            link.active
                                                                ? 'bg-amber-600 text-white'
                                                                : link.url
                                                                ? 'bg-white text-gray-700 hover:bg-gray-100'
                                                                : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                                        }`}
                                                        preserveScroll
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="px-6 py-16 text-center">
                                <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    You haven't placed any orders. Start exploring our collection of premium dry fruits!
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route('home')}
                                        className="inline-flex items-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-amber-700"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
