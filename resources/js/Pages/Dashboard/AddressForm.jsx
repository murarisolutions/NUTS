import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AddressForm({ address }) {
    const isEditing = !!address;

    const { data, setData, post, put, processing, errors } = useForm({
        name: address?.name || '',
        phone: address?.phone || '',
        address_line_1: address?.address_line_1 || '',
        address_line_2: address?.address_line_2 || '',
        city: address?.city || '',
        state: address?.state || '',
        pincode: address?.pincode || '',
        type: address?.type || 'home',
        is_default: address?.is_default || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('addresses.update', address.id));
        } else {
            post(route('addresses.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isEditing ? 'Edit Address' : 'Add New Address'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Address' : 'Add New Address'} />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link
                            href={route('addresses.index')}
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to Addresses
                        </Link>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                        placeholder="Enter full name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Address Line 1 */}
                                <div>
                                    <label htmlFor="address_line_1" className="block text-sm font-medium text-gray-700">
                                        Address Line 1 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="address_line_1"
                                        type="text"
                                        value={data.address_line_1}
                                        onChange={(e) => setData('address_line_1', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                        placeholder="House/Flat No., Building, Street"
                                    />
                                    {errors.address_line_1 && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address_line_1}</p>
                                    )}
                                </div>

                                {/* Address Line 2 */}
                                <div>
                                    <label htmlFor="address_line_2" className="block text-sm font-medium text-gray-700">
                                        Address Line 2
                                    </label>
                                    <input
                                        id="address_line_2"
                                        type="text"
                                        value={data.address_line_2}
                                        onChange={(e) => setData('address_line_2', e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                        placeholder="Landmark, Area (optional)"
                                    />
                                    {errors.address_line_2 && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address_line_2}</p>
                                    )}
                                </div>

                                {/* City and State */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                            placeholder="City"
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="state"
                                            type="text"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                            placeholder="State"
                                        />
                                        {errors.state && (
                                            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Pincode and Type */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                                            Pincode <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="pincode"
                                            type="text"
                                            value={data.pincode}
                                            onChange={(e) => setData('pincode', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                            placeholder="6-digit pincode"
                                            maxLength={6}
                                        />
                                        {errors.pincode && (
                                            <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                            Address Type
                                        </label>
                                        <select
                                            id="type"
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                        >
                                            <option value="home">Home</option>
                                            <option value="office">Office</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.type && (
                                            <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Default Checkbox */}
                                <div className="flex items-center">
                                    <input
                                        id="is_default"
                                        type="checkbox"
                                        checked={data.is_default}
                                        onChange={(e) => setData('is_default', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                    />
                                    <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                                        Set as default address
                                    </label>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="mt-8 flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
                                <Link
                                    href={route('addresses.index')}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        isEditing ? 'Update Address' : 'Save Address'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
