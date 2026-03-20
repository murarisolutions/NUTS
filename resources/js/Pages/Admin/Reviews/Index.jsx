import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { StarIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const statusFilters = [
    { value: '', label: 'All Reviews' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
];

export default function Index({ reviews, filters }) {
    const [status, setStatus] = useState(filters.status || '');

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        router.get(route('admin.reviews.index'), { status: newStatus }, { preserveState: true });
    };

    const handleApprove = (review) => {
        router.patch(
            route('admin.reviews.update', review.id),
            { is_approved: true },
            { preserveScroll: true }
        );
    };

    const handleReject = (review) => {
        router.patch(
            route('admin.reviews.update', review.id),
            { is_approved: false },
            { preserveScroll: true }
        );
    };

    const handleDelete = (review) => {
        if (confirm('Are you sure you want to delete this review?')) {
            router.delete(route('admin.reviews.destroy', review.id));
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarSolid
                        key={star}
                        className={`h-4 w-4 ${star <= rating ? 'text-amber-400' : 'text-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <AdminLayout header="Reviews">
            <Head title="Reviews" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                            <StarIcon className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Product Reviews</h2>
                            <p className="text-sm text-gray-500">{reviews.total} total reviews</p>
                        </div>
                    </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => handleStatusChange(filter.value)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                status === filter.value
                                    ? 'bg-orange-600 text-white shadow-sm'
                                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Reviews Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Rating</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Review</th>
                                    <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {reviews.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center">
                                            <StarIcon className="mx-auto h-12 w-12 text-gray-300" />
                                            <p className="mt-3 text-sm font-medium text-gray-900">No reviews found</p>
                                            <p className="mt-1 text-sm text-gray-500">Customer reviews will appear here.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    reviews.data.map((review, index) => (
                                        <tr key={review.id} className={`transition-colors hover:bg-amber-50/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                                                        {(review.user?.name || 'A').charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{review.user?.name || 'Anonymous'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                                {review.product?.name || 'General Review'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {renderStars(review.rating)}
                                            </td>
                                            <td className="max-w-md px-6 py-4">
                                                <p className="line-clamp-2 text-sm text-gray-600">{review.comment}</p>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                                                        review.is_approved
                                                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                                                            : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                                                    }`}
                                                >
                                                    {review.is_approved ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {!review.is_approved && (
                                                        <button
                                                            onClick={() => handleApprove(review)}
                                                            className="inline-flex items-center rounded-lg bg-emerald-50 p-1.5 text-emerald-600 transition-colors hover:bg-emerald-100"
                                                            title="Approve"
                                                        >
                                                            <CheckIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                    {review.is_approved && (
                                                        <button
                                                            onClick={() => handleReject(review)}
                                                            className="inline-flex items-center rounded-lg bg-amber-50 p-1.5 text-amber-600 transition-colors hover:bg-amber-100"
                                                            title="Unapprove"
                                                        >
                                                            <XMarkIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(review)}
                                                        className="inline-flex items-center rounded-lg bg-red-50 p-1.5 text-red-600 transition-colors hover:bg-red-100"
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
                    {reviews.links && reviews.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-700">{reviews.from}</span> to{' '}
                                <span className="font-medium text-gray-700">{reviews.to}</span> of{' '}
                                <span className="font-medium text-gray-700">{reviews.total}</span>
                            </p>
                            <div className="flex gap-1.5">
                                {reviews.links.map((link, i) => (
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
