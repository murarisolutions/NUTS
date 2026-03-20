import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { imageUrl } from '@/utils';

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search, category }, { preserveState: true });
    };

    const handleDelete = (product) => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            router.delete(route('admin.products.destroy', product.slug));
        }
    };

    const handleToggleActive = (product) => {
        router.put(
            route('admin.products.update', product.slug),
            { ...product, is_active: !product.is_active, _method: 'PUT' },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AdminLayout header="Products">
            <Head title="Products" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-orange-50 p-2.5">
                            <ShoppingBagIcon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{products.total} Products</h2>
                            <p className="text-sm text-gray-500">Manage your product catalog</p>
                        </div>
                    </div>
                    <Link
                        href={route('admin.products.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-500 hover:shadow-md"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                    <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border-gray-200 py-2.5 pl-11 pr-4 text-sm focus:border-orange-500 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-48">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-xl border-gray-200 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                            Search
                        </button>
                        {(search || category) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    setCategory('');
                                    router.get(route('admin.products.index'));
                                }}
                                className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                            >
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                {/* Products Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Sizes</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center">
                                            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300" />
                                            <p className="mt-3 text-sm font-medium text-gray-500">No products found</p>
                                            <p className="text-sm text-gray-400">Try adjusting your search or filter.</p>
                                            <Link
                                                href={route('admin.products.create')}
                                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                                Add Product
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    products.data.map((product, index) => (
                                        <tr key={product.id} className={`transition-colors hover:bg-orange-50/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    {imageUrl(product.image) ? (
                                                        <img
                                                            src={imageUrl(product.image)}
                                                            alt={product.name}
                                                            className="h-12 w-12 rounded-xl object-cover ring-1 ring-gray-100"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                                                            <ShoppingBagIcon className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{product.name}</div>
                                                        {product.badge && (
                                                            <span className="inline-flex items-center rounded-md bg-orange-50 px-1.5 py-0.5 text-xs font-medium text-orange-600">
                                                                {product.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{product.category?.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                {product.price_on_request ? (
                                                    <span className="font-medium text-orange-600">On Request</span>
                                                ) : (
                                                    <span className="font-semibold text-gray-900">₹{product.price}</span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                    {product.sizes?.length || 0} sizes
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <button
                                                    onClick={() => handleToggleActive(product)}
                                                    className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200"
                                                    title={product.is_active ? 'Click to deactivate' : 'Click to activate'}
                                                >
                                                    <span className={`inline-block h-6 w-11 rounded-full transition-colors duration-200 ${product.is_active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                                    <span className={`absolute inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${product.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.products.edit', product.slug)}
                                                        className="inline-flex items-center justify-center rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product)}
                                                        className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                                                        title="Delete"
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
                    {products.links && products.links.length > 3 && (
                        <div className="border-t border-gray-100 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-semibold text-gray-700">{products.from}</span> to{' '}
                                    <span className="font-semibold text-gray-700">{products.to}</span> of{' '}
                                    <span className="font-semibold text-gray-700">{products.total}</span> products
                                </p>
                                <div className="flex gap-1.5">
                                    {products.links.map((link, index) => (
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
