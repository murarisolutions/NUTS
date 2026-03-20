import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function Index({ careers }) {
    const handleDelete = (career) => {
        if (confirm(`Are you sure you want to delete "${career.title}"?`)) {
            router.delete(route('admin.careers.destroy', career.id));
        }
    };

    return (
        <AdminLayout header="Career Postings">
            <Head title="Careers" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        href={route('admin.careers.create')}
                        className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
                    >
                        <PlusIcon className="mr-2 h-5 w-5" />
                        Add Career Posting
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Posted
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {careers.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No career postings found
                                        </td>
                                    </tr>
                                ) : (
                                    careers.data.map((career) => (
                                        <tr key={career.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {career.title}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                {career.type}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                {career.location}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        career.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {career.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {new Date(career.created_at).toLocaleDateString('en-IN')}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={route('admin.careers.show', career.id)}
                                                        className="text-gray-600 hover:text-gray-900"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        href={route('admin.careers.edit', career.id)}
                                                        className="text-orange-600 hover:text-orange-900"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(career)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
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
                    {careers.links && careers.links.length > 3 && (
                        <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{careers.from}</span> to{' '}
                                    <span className="font-medium">{careers.to}</span> of{' '}
                                    <span className="font-medium">{careers.total}</span> results
                                </div>
                                <div className="flex gap-2">
                                    {careers.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveState
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                link.active
                                                    ? 'bg-orange-600 text-white'
                                                    : link.url
                                                      ? 'bg-white text-gray-700 hover:bg-gray-50'
                                                      : 'cursor-not-allowed bg-gray-100 text-gray-400'
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
