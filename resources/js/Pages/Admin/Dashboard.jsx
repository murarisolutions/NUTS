import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ShoppingCartIcon,
    ClockIcon,
    CurrencyRupeeIcon,
    ShoppingBagIcon,
    UsersIcon,
    EnvelopeIcon,
    TruckIcon,
    PlusIcon,
    EyeIcon,
    TagIcon,
} from '@heroicons/react/24/outline';

const statusColors = {
    pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    confirmed: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    processing: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    shipped: 'bg-purple-50 text-purple-700 ring-purple-600/20',
    delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
};

export default function Dashboard({ stats, recentOrders }) {
    const { auth } = usePage().props;

    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const statCards = [
        {
            name: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingCartIcon,
            bg: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            name: 'Pending Orders',
            value: stats.pendingOrders,
            icon: ClockIcon,
            bg: 'bg-amber-50',
            iconColor: 'text-amber-600',
        },
        {
            name: 'Total Revenue',
            value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
            icon: CurrencyRupeeIcon,
            bg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
        },
        {
            name: 'Total Products',
            value: stats.totalProducts,
            icon: ShoppingBagIcon,
            bg: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
        {
            name: 'Total Customers',
            value: stats.totalCustomers,
            icon: UsersIcon,
            bg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
        },
        {
            name: 'Pending Contacts',
            value: stats.pendingContacts,
            icon: EnvelopeIcon,
            bg: 'bg-pink-50',
            iconColor: 'text-pink-600',
        },
        {
            name: 'Pending Bulk Orders',
            value: stats.pendingBulkOrders,
            icon: TruckIcon,
            bg: 'bg-orange-50',
            iconColor: 'text-orange-600',
        },
    ];

    const quickActions = [
        { name: 'Add Product', href: 'admin.products.create', icon: PlusIcon, color: 'bg-orange-600 hover:bg-orange-500' },
        { name: 'View Orders', href: 'admin.orders.index', icon: EyeIcon, color: 'bg-blue-600 hover:bg-blue-500' },
        { name: 'Categories', href: 'admin.categories.index', icon: TagIcon, color: 'bg-purple-600 hover:bg-purple-500' },
        { name: 'Contacts', href: 'admin.contacts.index', icon: EnvelopeIcon, color: 'bg-pink-600 hover:bg-pink-500' },
    ];

    return (
        <AdminLayout header="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Welcome Banner */}
            <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-lg sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back, {auth?.user?.name || 'Admin'}</h1>
                        <p className="mt-1 text-slate-300">{today}</p>
                    </div>
                    <Link
                        href={route('admin.products.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Product
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <div
                        key={stat.name}
                        className="group overflow-hidden rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`rounded-xl ${stat.bg} p-3`}>
                                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            href={route(action.href)}
                            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md ${action.color}`}
                        >
                            <action.icon className="h-4 w-4" />
                            {action.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                <div className="border-b border-gray-100 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                            <p className="mt-0.5 text-sm text-gray-500">Latest 10 orders across the store</p>
                        </div>
                        <Link
                            href={route('admin.orders.index')}
                            className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                        >
                            View all
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Order</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center">
                                        <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <p className="mt-3 text-sm font-medium text-gray-500">No orders yet</p>
                                        <p className="text-sm text-gray-400">Orders will appear here once customers start purchasing.</p>
                                    </td>
                                </tr>
                            ) : (
                                recentOrders.map((order, index) => (
                                    <tr key={order.id} className={`transition-colors hover:bg-gray-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-900">{order.order_number}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                                                    {(order.user?.name || 'G').charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-sm text-gray-700">{order.user?.name || 'Guest'}</span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                                            ₹{order.total.toLocaleString('en-IN')}
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
                                                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-50"
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
            </div>
        </AdminLayout>
    );
}
