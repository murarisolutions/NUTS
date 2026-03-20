import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeftIcon, PencilIcon, ShoppingBagIcon, TagIcon } from '@heroicons/react/24/outline';
import { imageUrl } from '@/utils';

export default function Show({ category }) {
    return (
        <AdminLayout header={category.name}>
            <Head title={category.name} />

            <div className="space-y-6">
                {/* Back & Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route('admin.categories.index')}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Categories
                    </Link>
                    <Link
                        href={route('admin.categories.edit', category.slug)}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                    >
                        <PencilIcon className="h-4 w-4" />
                        Edit Category
                    </Link>
                </div>

                {/* Category Info */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="flex items-start gap-6 p-6">
                        {imageUrl(category.image) ? (
                            <img
                                src={imageUrl(category.image)}
                                alt={category.name}
                                className="h-28 w-28 rounded-xl object-cover ring-1 ring-gray-100"
                            />
                        ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                                <TagIcon className="h-12 w-12 text-gray-300" />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                        category.is_active
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {category.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            {category.description && (
                                <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                            )}
                            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                    <ShoppingBagIcon className="h-3.5 w-3.5" />
                                    {category.products?.length || 0} products
                                </span>
                                {category.icon_class && (
                                    <span className="text-xs text-gray-400">Icon: {category.icon_class}</span>
                                )}
                                <span className="text-xs text-gray-400">Sort: {category.sort_order}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h3 className="text-base font-bold text-gray-900">Products in this Category</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(!category.products || category.products.length === 0) ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center">
                                            <ShoppingBagIcon className="mx-auto h-10 w-10 text-gray-300" />
                                            <p className="mt-2 text-sm font-medium text-gray-500">No products in this category</p>
                                        </td>
                                    </tr>
                                ) : (
                                    category.products.map((product, index) => (
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
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                {product.price_on_request ? (
                                                    <span className="font-medium text-orange-600">On Request</span>
                                                ) : (
                                                    <span className="font-semibold text-gray-900">{'\u20B9'}{product.price}</span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                                        product.is_active
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {product.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <Link
                                                    href={route('admin.products.edit', product.slug)}
                                                    className="inline-flex items-center justify-center rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
                                                    title="Edit Product"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
