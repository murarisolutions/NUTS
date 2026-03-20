import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeftIcon, PencilIcon, CubeIcon, CurrencyRupeeIcon, SwatchIcon, InformationCircleIcon, PhotoIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { imageUrl } from '@/utils';

export default function Show({ product }) {
    const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];

    const renderStars = (rating) => (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <StarSolid
                    key={star}
                    className={`h-4 w-4 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
                />
            ))}
        </div>
    );

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.visit(route('admin.products.index'))}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <span>{product.name}</span>
                </div>
            }
        >
            <Head title={product.name} />

            <div className="space-y-6">
                {/* Action Bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                            product.is_active
                                ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                                : 'bg-red-50 text-red-700 ring-red-600/20'
                        }`}>
                            {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {product.is_featured && (
                            <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                                Featured
                            </span>
                        )}
                        {product.badge && (
                            <span className="inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-600/20">
                                {product.badge}
                            </span>
                        )}
                    </div>
                    <Link
                        href={route('admin.products.edit', product.slug)}
                        className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500"
                    >
                        <PencilIcon className="h-4 w-4" />
                        Edit Product
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Info */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                    <CubeIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Product Details</h3>
                            </div>
                            <dl className="space-y-4">
                                <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Name</dt>
                                    <dd className="mt-0.5 text-sm font-semibold text-gray-900">{product.name}</dd>
                                </div>
                                {product.description && (
                                    <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                        <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Description</dt>
                                        <dd className="mt-0.5 text-sm leading-relaxed text-gray-700">{product.description}</dd>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                        <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Category</dt>
                                        <dd className="mt-0.5 text-sm font-medium text-gray-900">{product.category?.name}</dd>
                                    </div>
                                    {product.sub_category && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                            <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Sub Category</dt>
                                            <dd className="mt-0.5 text-sm font-medium text-gray-900">{product.sub_category}</dd>
                                        </div>
                                    )}
                                    {product.sku && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                            <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">SKU</dt>
                                            <dd className="mt-0.5 text-sm font-mono font-medium text-gray-900">{product.sku}</dd>
                                        </div>
                                    )}
                                    <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                        <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Slug</dt>
                                        <dd className="mt-0.5 text-sm font-mono text-gray-600">{product.slug}</dd>
                                    </div>
                                </div>
                            </dl>
                        </div>

                        {/* Pricing */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                    <CurrencyRupeeIcon className="h-5 w-5 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Pricing</h3>
                            </div>
                            {product.price_on_request ? (
                                <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
                                    Price on Request
                                </div>
                            ) : (
                                <div className="rounded-lg bg-emerald-50 px-4 py-3">
                                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-600">Base Price</span>
                                    <div className="mt-0.5 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-emerald-700">₹{parseFloat(product.price).toLocaleString('en-IN')}</span>
                                        {product.original_price && parseFloat(product.original_price) > parseFloat(product.price) && (
                                            <span className="text-sm text-gray-400 line-through">₹{parseFloat(product.original_price).toLocaleString('en-IN')}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                                        <SwatchIcon className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Size Variants</h3>
                                </div>
                                <div className="overflow-hidden rounded-xl ring-1 ring-gray-100">
                                    <table className="min-w-full divide-y divide-gray-100">
                                        <thead className="bg-gray-50/80">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Size</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Weight</th>
                                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Original Price</th>
                                                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Stock</th>
                                                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Default</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {product.sizes.map((size, index) => (
                                                <tr key={size.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{size.size_label}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{size.weight || size.size_grams ? `${size.size_grams}g` : '-'}</td>
                                                    <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">₹{parseFloat(size.price).toLocaleString('en-IN')}</td>
                                                    <td className="px-4 py-3 text-right text-sm text-gray-400">
                                                        {size.original_price ? `₹${parseFloat(size.original_price).toLocaleString('en-IN')}` : '-'}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                            (size.stock || 0) > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                                        }`}>
                                                            {size.stock ?? 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-sm">
                                                        {size.is_default && (
                                                            <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">Default</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Nutritional Info */}
                        {product.nutritional_info && (
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                        <InformationCircleIcon className="h-5 w-5 text-teal-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Nutritional Information</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {product.nutritional_info.energy && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5 text-center">
                                            <dt className="text-xs font-medium text-gray-500">Energy</dt>
                                            <dd className="mt-0.5 text-sm font-bold text-gray-900">{product.nutritional_info.energy}</dd>
                                        </div>
                                    )}
                                    {product.nutritional_info.protein && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5 text-center">
                                            <dt className="text-xs font-medium text-gray-500">Protein</dt>
                                            <dd className="mt-0.5 text-sm font-bold text-gray-900">{product.nutritional_info.protein}</dd>
                                        </div>
                                    )}
                                    {product.nutritional_info.fat && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5 text-center">
                                            <dt className="text-xs font-medium text-gray-500">Fat</dt>
                                            <dd className="mt-0.5 text-sm font-bold text-gray-900">{product.nutritional_info.fat}</dd>
                                        </div>
                                    )}
                                    {product.nutritional_info.carbs && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5 text-center">
                                            <dt className="text-xs font-medium text-gray-500">Carbs</dt>
                                            <dd className="mt-0.5 text-sm font-bold text-gray-900">{product.nutritional_info.carbs}</dd>
                                        </div>
                                    )}
                                    {product.nutritional_info.fiber && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5 text-center">
                                            <dt className="text-xs font-medium text-gray-500">Fiber</dt>
                                            <dd className="mt-0.5 text-sm font-bold text-gray-900">{product.nutritional_info.fiber}</dd>
                                        </div>
                                    )}
                                    {product.nutritional_info.vitamin_e && (
                                        <div className="rounded-lg bg-gray-50 px-4 py-2.5 text-center">
                                            <dt className="text-xs font-medium text-gray-500">Vitamin E</dt>
                                            <dd className="mt-0.5 text-sm font-bold text-gray-900">{product.nutritional_info.vitamin_e}</dd>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Reviews */}
                        {product.reviews && product.reviews.length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                                            <StarIcon className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Reviews ({product.reviews.length})</h3>
                                    </div>
                                    {product.rating && (
                                        <div className="flex items-center gap-2">
                                            {renderStars(product.rating)}
                                            <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    {product.reviews.slice(0, 5).map((review) => (
                                        <div key={review.id} className="rounded-lg bg-gray-50 px-4 py-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {review.reviewer_name || review.user?.name || 'Anonymous'}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Images & Meta */}
                    <div className="space-y-6">
                        {/* Product Images */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                                    <PhotoIcon className="h-5 w-5 text-orange-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Images</h3>
                            </div>

                            {/* Primary Image */}
                            {imageUrl(primaryImage?.image_path) || imageUrl(product.image) ? (
                                <img
                                    src={imageUrl(primaryImage?.image_path) || imageUrl(product.image)}
                                    alt={product.name}
                                    className="w-full rounded-xl object-cover ring-1 ring-gray-100"
                                />
                            ) : (
                                <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 text-6xl">
                                    🥜
                                </div>
                            )}

                            {/* Gallery */}
                            {product.images && product.images.length > 1 && (
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    {product.images.filter(img => imageUrl(img.image_path)).map((img) => (
                                        <div key={img.id} className="relative overflow-hidden rounded-lg">
                                            <img
                                                src={imageUrl(img.image_path)}
                                                alt="Gallery"
                                                className="h-20 w-full object-cover"
                                            />
                                            {img.is_primary && (
                                                <div className="absolute left-1 top-1">
                                                    <StarSolid className="h-4 w-4 text-amber-400 drop-shadow" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Additional Info */}
                        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                    <InformationCircleIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Additional Info</h3>
                            </div>
                            <dl className="space-y-3">
                                {product.grade && (
                                    <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                        <dt className="text-sm font-medium text-gray-500">Grade</dt>
                                        <dd className="text-sm font-medium text-gray-900">{product.grade}</dd>
                                    </div>
                                )}
                                {product.origin && (
                                    <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                        <dt className="text-sm font-medium text-gray-500">Origin</dt>
                                        <dd className="text-sm font-medium text-gray-900">{product.origin}</dd>
                                    </div>
                                )}
                                {product.shelf_life && (
                                    <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                        <dt className="text-sm font-medium text-gray-500">Shelf Life</dt>
                                        <dd className="text-sm font-medium text-gray-900">{product.shelf_life}</dd>
                                    </div>
                                )}
                                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-sm font-medium text-gray-500">Gift Box</dt>
                                    <dd className="text-sm font-medium text-gray-900">{product.is_gift_box ? 'Yes' : 'No'}</dd>
                                </div>
                                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-sm font-medium text-gray-500">Rating</dt>
                                    <dd className="text-sm font-bold text-gray-900">{product.rating || 'N/A'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
