import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { imageUrl } from '@/utils';

export default function Form({ location }) {
    const isEditing = !!location;
    const [imagePreview, setImagePreview] = useState(
        location?.image ? imageUrl(location.image) : null
    );

    const { data, setData, post, put, processing, errors } = useForm({
        name: location?.name || '',
        address: location?.address || '',
        phone: location?.phone || '',
        hours: location?.hours || '',
        map_url: location?.map_url || '',
        is_active: location?.is_active ?? true,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === 'image' && data.image) {
                formData.append('image', data.image);
            } else if (typeof data[key] === 'boolean') {
                formData.append(key, data[key] ? '1' : '0');
            } else {
                formData.append(key, data[key] || '');
            }
        });

        if (isEditing) {
            formData.append('_method', 'PUT');
            post(route('admin.locations.update', location.id), {
                data: formData,
                forceFormData: true,
            });
        } else {
            post(route('admin.locations.store'), {
                data: formData,
                forceFormData: true,
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <AdminLayout header={isEditing ? 'Edit Location' : 'Create Location'}>
            <Head title={isEditing ? 'Edit Location' : 'Create Location'} />

            <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Location Name *" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="address" value="Address *" />
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone" />
                                <TextInput
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hours" value="Opening Hours" />
                                <TextInput
                                    id="hours"
                                    value={data.hours}
                                    onChange={(e) => setData('hours', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="e.g., Mon-Fri: 9am-6pm"
                                />
                                <InputError message={errors.hours} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="map_url" value="Google Maps URL" />
                                <TextInput
                                    id="map_url"
                                    type="url"
                                    value={data.map_url}
                                    onChange={(e) => setData('map_url', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="https://maps.google.com/..."
                                />
                                <InputError message={errors.map_url} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Location Image" />
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-600 hover:file:bg-orange-100"
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 h-32 w-32 rounded-lg object-cover"
                                    />
                                )}
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <InputLabel htmlFor="is_active" value="Active" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.visit(route('admin.locations.index'))}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <PrimaryButton disabled={processing}>
                            {processing ? 'Saving...' : isEditing ? 'Update Location' : 'Create Location'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
