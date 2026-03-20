import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { imageUrl } from '@/utils';
import { TagIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function Form({ category, parentCategories = [] }) {
    const isEditing = !!category;
    const [imagePreview, setImagePreview] = useState(
        category?.image ? imageUrl(category.image) : null
    );

    const { data, setData, post, processing, errors, transform } = useForm({
        name: category?.name || '',
        description: category?.description || '',
        icon_class: category?.icon_class || '',
        parent_id: category?.parent_id || '',
        sort_order: category?.sort_order || 0,
        is_active: category?.is_active ?? true,
        image: null,
    });

    transform((data) => ({
        ...data,
        is_active: data.is_active ? '1' : '0',
        _method: isEditing ? 'PUT' : undefined,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route('admin.categories.update', category.slug), {
                forceFormData: true,
            });
        } else {
            post(route('admin.categories.store'), {
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
        <AdminLayout header={isEditing ? 'Edit Category' : 'Create Category'}>
            <Head title={isEditing ? 'Edit Category' : 'Create Category'} />

            <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category Details */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                                <TagIcon className="h-5 w-5 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Category Details</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Category Name *" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-xl"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="icon_class" value="Icon Class (e.g., fa-leaf)" />
                                    <TextInput
                                        id="icon_class"
                                        value={data.icon_class}
                                        onChange={(e) => setData('icon_class', e.target.value)}
                                        className="mt-1 block w-full rounded-xl"
                                        placeholder="fa-leaf"
                                    />
                                    <InputError message={errors.icon_class} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="sort_order" value="Sort Order" />
                                    <TextInput
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', e.target.value)}
                                        className="mt-1 block w-full rounded-xl"
                                    />
                                    <InputError message={errors.sort_order} className="mt-2" />
                                    <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="parent_id" value="Parent Category" />
                                <select
                                    id="parent_id"
                                    value={data.parent_id}
                                    onChange={(e) => setData('parent_id', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                >
                                    <option value="">None (Top Level)</option>
                                    {parentCategories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.parent_id} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                                <button
                                    type="button"
                                    onClick={() => setData('is_active', !data.is_active)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                        data.is_active ? 'bg-emerald-500' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                            data.is_active ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                                <span className="text-sm font-medium text-gray-700">Active Category</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                                <PhotoIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Category Image</h3>
                        </div>
                        <div className="flex items-start gap-6">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-32 w-32 rounded-xl object-cover ring-1 ring-gray-100"
                                />
                            )}
                            <div className="flex-1">
                                <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-200 px-6 py-8 transition-colors hover:border-orange-300 hover:bg-orange-50/30">
                                    <PhotoIcon className="h-10 w-10 text-gray-400" />
                                    <span className="mt-2 text-sm font-medium text-gray-600">Click to upload</span>
                                    <span className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP up to 2MB</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.visit(route('admin.categories.index'))}
                            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            {processing ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
