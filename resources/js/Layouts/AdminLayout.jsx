import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import {
    HomeIcon,
    ShoppingBagIcon,
    TagIcon,
    ShoppingCartIcon,
    TruckIcon,
    StarIcon,
    EnvelopeIcon,
    ShieldCheckIcon,
    ReceiptRefundIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Dropdown from '@/Components/Dropdown';

export default function AdminLayout({ children, header }) {
    const { auth, adminBadges, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const navigation = [
        { name: 'Dashboard', href: 'admin.dashboard', icon: HomeIcon },
        { name: 'Products', href: 'admin.products.index', icon: ShoppingBagIcon },
        { name: 'Categories', href: 'admin.categories.index', icon: TagIcon },
        { name: 'Orders', href: 'admin.orders.index', icon: ShoppingCartIcon, badge: adminBadges?.pendingOrders },
        { name: 'Bulk Orders', href: 'admin.bulk-orders.index', icon: TruckIcon, badge: adminBadges?.pendingBulkOrders },
        { name: 'Reviews', href: 'admin.reviews.index', icon: StarIcon },
        { name: 'Contacts', href: 'admin.contacts.index', icon: EnvelopeIcon, badge: adminBadges?.unreadContacts },
        { name: 'Taste First', href: 'admin.taste-first.edit', icon: ShieldCheckIcon },
        { name: 'Refund Requests', href: 'admin.refund-requests.index', icon: ReceiptRefundIcon },
    ];

    const userInitials = auth.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const sidebarWidth = collapsed ? 'lg:w-20' : 'lg:w-64';
    const mainPadding = collapsed ? 'lg:pl-20' : 'lg:pl-64';

    const renderNavItem = (item, isMobile = false) => {
        const isActive = route().current(item.href + '*');
        return (
            <Link
                key={item.name}
                href={route(item.href)}
                className={`group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                        ? 'bg-orange-600/10 text-orange-400'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                } ${collapsed && !isMobile ? 'justify-center' : ''}`}
                title={collapsed && !isMobile ? item.name : undefined}
                style={isActive ? { borderLeft: '3px solid rgb(249 115 22)' } : { borderLeft: '3px solid transparent' }}
            >
                <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${
                        isActive ? 'text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
                    } ${collapsed && !isMobile ? '' : 'mr-3'}`}
                />
                {(!collapsed || isMobile) && (
                    <>
                        <span className="flex-1">{item.name}</span>
                        {item.badge > 0 && (
                            <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
                                {item.badge}
                            </span>
                        )}
                    </>
                )}
                {collapsed && !isMobile && item.badge > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                        {item.badge}
                    </span>
                )}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed right-4 top-4 z-[100]" style={{ animation: 'slideIn 0.3s ease-out' }}>
                    <div
                        className={`flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-lg ${
                            toastType === 'success'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-red-500 text-white'
                        }`}
                    >
                        <span className="text-sm font-medium">{toastMessage}</span>
                        <button onClick={() => setShowToast(false)} className="ml-2 hover:opacity-70">
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
                <div
                    className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
                        sidebarOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                />
                <div
                    className={`fixed inset-y-0 left-0 flex w-72 flex-col bg-gradient-to-b from-slate-900 to-slate-800 transition-transform duration-300 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-3">
                            <ApplicationLogo white />
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                        {navigation.map((item) => renderNavItem(item, true))}
                    </nav>
                    <div className="border-t border-white/10 p-4">
                        <Link
                            href={route('home')}
                            className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                        >
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            View Store
                        </Link>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className={`hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex ${sidebarWidth} lg:flex-col transition-all duration-300`}>
                <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-slate-900 to-slate-800">
                    <div className="flex h-16 items-center border-b border-white/10 px-4">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-3 overflow-hidden">
                            {collapsed ? (
                                <ApplicationLogo white compact />
                            ) : (
                                <ApplicationLogo white />
                            )}
                        </Link>
                    </div>

                    <div className="flex flex-1 flex-col overflow-y-auto">
                        <nav className="flex-1 space-y-1 px-3 py-4">
                            {navigation.map((item) => renderNavItem(item))}
                        </nav>

                        <div className="px-3 pb-3">
                            <Link
                                href={route('home')}
                                className={`flex items-center gap-2 rounded-lg bg-orange-600/20 text-orange-400 transition-colors hover:bg-orange-600/30 ${
                                    collapsed ? 'justify-center px-3 py-2.5' : 'px-4 py-2.5'
                                }`}
                                title={collapsed ? 'View Store' : undefined}
                            >
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-shrink-0" />
                                {!collapsed && <span className="text-sm font-semibold">View Store</span>}
                            </Link>
                        </div>
                    </div>

                    <div className="border-t border-white/10 p-4">
                        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-sm font-bold text-orange-400">
                                {userInitials}
                            </div>
                            {!collapsed && (
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-white">{auth.user.name}</p>
                                    <p className="truncate text-xs text-slate-400">Administrator</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-white/10 p-2">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="flex w-full items-center justify-center rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            {collapsed ? (
                                <ChevronDoubleRightIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDoubleLeftIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className={`${mainPadding} transition-all duration-300`}>
                <div className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white/80 backdrop-blur-md">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="px-4 text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <div className="flex flex-1 items-center justify-between px-4 lg:px-6">
                        <div className="flex items-center gap-2">
                            {header && (
                                <h1 className="text-xl font-bold text-gray-900">{header}</h1>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                                            {userInitials}
                                        </div>
                                        <span className="hidden md:inline">{auth.user.name}</span>
                                        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                <main className="flex-1">
                    <div className="py-6 lg:py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
                    </div>
                </main>
            </div>

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
