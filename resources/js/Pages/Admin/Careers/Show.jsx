import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Show({ career }) {
    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.visit(route('admin.careers.index'))}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <span>Career Posting</span>
                </div>
            }
        >
            <Head title={career.title} />

            <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{career.title}</h2>
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                <span>{career.type}</span>
                                <span>•</span>
                                <span>{career.location}</span>
                                <span>•</span>
                                <span
                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                        career.is_active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {career.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                        <Link
                            href={route('admin.careers.edit', career.id)}
                            className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
                        >
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </div>

                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Description</h3>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                            {career.description}
                        </div>
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-500">
                            Posted on {new Date(career.created_at).toLocaleDateString('en-IN')}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
