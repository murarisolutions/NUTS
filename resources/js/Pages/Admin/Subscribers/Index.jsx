import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ subscribers }) {
    const handleDelete = (subscriber) => {
        if (confirm('Are you sure you want to remove this subscriber?')) {
            router.delete(route('admin.subscribers.destroy', subscriber.id));
        }
    };

    return (
        <AdminLayout header="Newsletter Subscribers">
            <Head title="Subscribers" />

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Subscribed On
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {subscribers.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        No subscribers found
                                    </td>
                                </tr>
                            ) : (
                                subscribers.data.map((subscriber, index) => (
                                    <tr key={subscriber.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {subscribers.from + index}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{subscriber.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {new Date(subscriber.created_at).toLocaleDateString('en-IN')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(subscriber)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {subscribers.links && subscribers.links.length > 3 && (
                    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{subscribers.from}</span> to{' '}
                                <span className="font-medium">{subscribers.to}</span> of{' '}
                                <span className="font-medium">{subscribers.total}</span> results
                            </div>
                            <div className="flex gap-2">
                                {subscribers.links.map((link, index) => (
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
        </AdminLayout>
    );
}
