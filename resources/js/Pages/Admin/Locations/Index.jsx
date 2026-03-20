import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { imageUrl } from '@/utils';

export default function Index({ locations }) {
    const handleDelete = (location) => {
        if (confirm(`Are you sure you want to delete "${location.name}"?`)) {
            router.delete(route('admin.locations.destroy', location.id));
        }
    };

    return (
        <AdminLayout header="Store Locations">
            <Head title="Locations" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        href={route('admin.locations.create')}
                        className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
                    >
                        <PlusIcon className="mr-2 h-5 w-5" />
                        Add Location
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {locations.length === 0 ? (
                        <div className="col-span-full rounded-lg bg-white p-12 text-center shadow">
                            <p className="text-gray-500">No locations found</p>
                        </div>
                    ) : (
                        locations.map((location) => (
                            <div key={location.id} className="overflow-hidden rounded-lg bg-white shadow">
                                {imageUrl(location.image) && (
                                    <img
                                        src={imageUrl(location.image)}
                                        alt={location.name}
                                        className="h-40 w-full object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="mb-2 flex items-start justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                location.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {location.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    <p className="mb-2 text-sm text-gray-600">{location.address}</p>

                                    {location.phone && (
                                        <p className="mb-2 text-sm text-gray-600">Phone: {location.phone}</p>
                                    )}

                                    {location.hours && (
                                        <p className="mb-4 text-sm text-gray-600">Hours: {location.hours}</p>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('admin.locations.edit', location.id)}
                                            className="flex-1 rounded-md bg-gray-100 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-200"
                                        >
                                            <PencilIcon className="mx-auto h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(location)}
                                            className="flex-1 rounded-md bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600 hover:bg-red-100"
                                        >
                                            <TrashIcon className="mx-auto h-5 w-5" />
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
