import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Addresses({ addresses }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this address?')) {
            router.delete(route('addresses.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        My Addresses
                    </h2>
                    <Link
                        href={route('addresses.create')}
                        className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="My Addresses" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {addresses && addresses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className={`relative rounded-xl border bg-white p-6 shadow-sm ${
                                        address.is_default
                                            ? 'border-amber-300 ring-1 ring-amber-300'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    {/* Default Badge */}
                                    {address.is_default && (
                                        <span className="absolute right-4 top-4 inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                                            Default
                                        </span>
                                    )}

                                    {/* Address Type */}
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium capitalize text-gray-600">
                                            {address.type === 'home' && (
                                                <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                </svg>
                                            )}
                                            {address.type === 'office' && (
                                                <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                                </svg>
                                            )}
                                            {address.type === 'other' && (
                                                <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                </svg>
                                            )}
                                            {address.type}
                                        </span>
                                    </div>

                                    {/* Address Details */}
                                    <div className="space-y-1 text-sm">
                                        <p className="font-semibold text-gray-900">{address.name}</p>
                                        <p className="text-gray-600">{address.address_line_1}</p>
                                        {address.address_line_2 && (
                                            <p className="text-gray-600">{address.address_line_2}</p>
                                        )}
                                        <p className="text-gray-600">
                                            {address.city}, {address.state} - {address.pincode}
                                        </p>
                                        <p className="pt-1 text-gray-500">
                                            Phone: {address.phone}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-4 flex items-center space-x-3 border-t border-gray-100 pt-4">
                                        <Link
                                            href={route('addresses.edit', address.id)}
                                            className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
                                        >
                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                            <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No saved addresses</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Add a shipping address to make checkout faster and easier.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route('addresses.create')}
                                    className="inline-flex items-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-amber-700"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add Your First Address
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
