import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilIcon, TrashIcon, PlusIcon, TagIcon, EyeIcon } from '@heroicons/react/24/outline';
import { imageUrl } from '@/utils';

export default function Index({ categories }) {
    const handleDelete = (category) => {
        if (category.products_count > 0) {
            alert('Cannot delete category with products. Please move or delete products first.');
            return;
        }
        if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
            router.delete(route('admin.categories.destroy', category.slug));
        }
    };

    return (
        <AdminLayout header="Categories">
            <Head title="Categories" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-purple-50 p-2.5">
                            <TagIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{categories.length} Categories</h2>
                            <p className="text-sm text-gray-500">Organize your products</p>
                        </div>
                    </div>
                    <Link
                        href={route('admin.categories.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-500 hover:shadow-md"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Category
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.length === 0 ? (
                        <div className="col-span-full rounded-xl bg-white p-16 text-center shadow-sm ring-1 ring-gray-100">
                            <TagIcon className="mx-auto h-12 w-12 text-gray-300" />
                            <p className="mt-3 text-sm font-medium text-gray-500">No categories found</p>
                            <p className="text-sm text-gray-400">Create your first category to get started.</p>
                            <Link
                                href={route('admin.categories.create')}
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Add Category
                            </Link>
                        </div>
                    ) : (
                        categories.map((category) => (
                            <div
                                key={category.id}
                                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                <Link href={route('admin.categories.show', category.slug)} className="block relative">
                                    {imageUrl(category.image) ? (
                                        <div className="relative h-44 overflow-hidden">
                                            <img
                                                src={imageUrl(category.image)}
                                                alt={category.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-3 left-4">
                                                <h3 className="text-lg font-bold text-white drop-shadow">{category.name}</h3>
                                            </div>
                                            <div className="absolute right-3 top-3">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold shadow-sm ${
                                                        category.is_active
                                                            ? 'bg-emerald-500 text-white'
                                                            : 'bg-red-500 text-white'
                                                    }`}
                                                >
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                            <TagIcon className="h-16 w-16 text-gray-200" />
                                            <div className="absolute right-3 top-3">
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
                                        </div>
                                    )}
                                </Link>

                                <div className="p-5">
                                    {!imageUrl(category.image) && (
                                        <Link href={route('admin.categories.show', category.slug)}>
                                            <h3 className="mb-1 text-lg font-bold text-gray-900 hover:text-orange-600">{category.name}</h3>
                                        </Link>
                                    )}
                                    {category.icon_class && (
                                        <p className="text-xs text-gray-400">Icon: {category.icon_class}</p>
                                    )}

                                    {category.description && (
                                        <p className="mb-3 mt-1 line-clamp-2 text-sm text-gray-500">{category.description}</p>
                                    )}

                                    <div className="mb-4 flex items-center justify-between text-sm">
                                        <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                            {category.products_count || 0} products
                                        </span>
                                        <span className="text-xs text-gray-400">Sort: {category.sort_order}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('admin.categories.show', category.slug)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-50 px-3 py-2.5 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-100"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                            View
                                        </Link>
                                        <Link
                                            href={route('admin.categories.edit', category.slug)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
