import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef, useCallback } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import {
    PlusIcon,
    TrashIcon,
    PhotoIcon,
    XMarkIcon,
    StarIcon,
    CloudArrowUpIcon,
    CubeIcon,
    CurrencyRupeeIcon,
    InformationCircleIcon,
    SwatchIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { imageUrl } from '@/utils';

export default function Form({ product, categories }) {
    const isEditing = !!product;
    const [imagePreview, setImagePreview] = useState(
        product?.image ? imageUrl(product.image) : null
    );
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [existingGallery, setExistingGallery] = useState(product?.images || []);
    const [removeImageIds, setRemoveImageIds] = useState([]);
    const [primaryGalleryId, setPrimaryGalleryId] = useState(
        product?.images?.find((img) => img.is_primary)?.id || null
    );
    const [isDragging, setIsDragging] = useState(false);
    const galleryInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        category_id: product?.category_id || '',
        sub_category: product?.sub_category || '',
        price: product?.price || '',
        original_price: product?.original_price || '',
        badge: product?.badge || '',
        is_featured: product?.is_featured || false,
        is_gift_box: product?.is_gift_box || false,
        price_on_request: product?.price_on_request || false,
        grade: product?.grade || '',
        origin: product?.origin || '',
        shelf_life: product?.shelf_life || '',
        sku: product?.sku || '',
        is_active: product?.is_active ?? true,
        image: null,
        gallery_images: [],
        sizes: product?.sizes || [{ size_label: '', weight: '', price: '', original_price: '', is_default: false }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === 'sizes') {
                data.sizes.forEach((size, index) => {
                    Object.keys(size).forEach((sizeKey) => {
                        formData.append(`sizes[${index}][${sizeKey}]`, size[sizeKey] || '');
                    });
                });
            } else if (key === 'image' && data.image) {
                formData.append('image', data.image);
            } else if (key === 'gallery_images') {
                data.gallery_images.forEach((file, index) => {
                    formData.append(`gallery_images[${index}]`, file);
                });
            } else if (typeof data[key] === 'boolean') {
                formData.append(key, data[key] ? '1' : '0');
            } else {
                formData.append(key, data[key] || '');
            }
        });

        // Add remove gallery image IDs
        removeImageIds.forEach((id, index) => {
            formData.append(`remove_gallery_images[${index}]`, id);
        });

        // Add primary gallery image ID
        if (primaryGalleryId) {
            formData.append('primary_gallery_image_id', primaryGalleryId);
        }

        if (isEditing) {
            formData.append('_method', 'PUT');
            post(route('admin.products.update', product.slug), {
                data: formData,
                forceFormData: true,
            });
        } else {
            post(route('admin.products.store'), {
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

    const handleGalleryFiles = useCallback((files) => {
        const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
        if (fileArray.length === 0) return;

        setData('gallery_images', [...data.gallery_images, ...fileArray]);

        fileArray.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryPreviews((prev) => [...prev, { file, preview: reader.result }]);
            };
            reader.readAsDataURL(file);
        });
    }, [data.gallery_images, setData]);

    const handleGalleryChange = (e) => {
        handleGalleryFiles(e.target.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleGalleryFiles(e.dataTransfer.files);
    };

    const removeGalleryPreview = (index) => {
        setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
        setData('gallery_images', data.gallery_images.filter((_, i) => i !== index));
    };

    const removeExistingImage = (imageId) => {
        setExistingGallery((prev) => prev.filter((img) => img.id !== imageId));
        setRemoveImageIds((prev) => [...prev, imageId]);
        if (primaryGalleryId === imageId) setPrimaryGalleryId(null);
    };

    const addSize = () => {
        setData('sizes', [...data.sizes, { size_label: '', weight: '', price: '', original_price: '', is_default: false }]);
    };

    const removeSize = (index) => {
        setData('sizes', data.sizes.filter((_, i) => i !== index));
    };

    const updateSize = (index, field, value) => {
        const newSizes = [...data.sizes];
        newSizes[index][field] = value;
        setData('sizes', newSizes);
    };

    const ToggleSwitch = ({ checked, onChange, label }) => (
        <label className="flex cursor-pointer items-center gap-3">
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
                <div className={`h-6 w-11 rounded-full transition-colors duration-200 ${checked ? 'bg-orange-500' : 'bg-gray-300'}`} />
                <div className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
        </label>
    );

    return (
        <AdminLayout header={isEditing ? 'Edit Product' : 'Create Product'}>
            <Head title={isEditing ? 'Edit Product' : 'Create Product'} />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Info */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Info */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                                <div className="rounded-lg bg-blue-50 p-2">
                                    <CubeIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Basic Information</h3>
                            </div>
                            <div className="space-y-4 p-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Product Name *" />
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
                                        rows="4"
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="category_id" value="Category *" />
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="sub_category" value="Sub Category" />
                                        <TextInput
                                            id="sub_category"
                                            value={data.sub_category}
                                            onChange={(e) => setData('sub_category', e.target.value)}
                                            className="mt-1 block w-full rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="sku" value="SKU" />
                                        <TextInput
                                            id="sku"
                                            value={data.sku}
                                            onChange={(e) => setData('sku', e.target.value)}
                                            className="mt-1 block w-full rounded-xl"
                                        />
                                        <InputError message={errors.sku} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="badge" value="Badge (e.g., Bestseller)" />
                                        <TextInput
                                            id="badge"
                                            value={data.badge}
                                            onChange={(e) => setData('badge', e.target.value)}
                                            className="mt-1 block w-full rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                                <div className="rounded-lg bg-emerald-50 p-2">
                                    <CurrencyRupeeIcon className="h-5 w-5 text-emerald-600" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Pricing</h3>
                            </div>
                            <div className="space-y-4 p-6">
                                <ToggleSwitch
                                    checked={data.price_on_request}
                                    onChange={(e) => setData('price_on_request', e.target.checked)}
                                    label="Price on Request"
                                />

                                {!data.price_on_request && (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <InputLabel htmlFor="price" value="Price (₹) *" />
                                            <TextInput
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                className="mt-1 block w-full rounded-xl"
                                                required={!data.price_on_request}
                                            />
                                            <InputError message={errors.price} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="original_price" value="Original Price (₹)" />
                                            <TextInput
                                                id="original_price"
                                                type="number"
                                                step="0.01"
                                                value={data.original_price}
                                                onChange={(e) => setData('original_price', e.target.value)}
                                                className="mt-1 block w-full rounded-xl"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Sizes */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-purple-50 p-2">
                                        <SwatchIcon className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900">Product Sizes</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={addSize}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-100"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    Add Size
                                </button>
                            </div>
                            <div className="space-y-4 p-6">
                                {data.sizes.map((size, index) => (
                                    <div key={index} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gray-700">Size {index + 1}</span>
                                            {data.sizes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSize(index)}
                                                    className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <InputLabel value="Size Label (e.g., 250g, 500g)" />
                                                <TextInput
                                                    value={size.size_label}
                                                    onChange={(e) => updateSize(index, 'size_label', e.target.value)}
                                                    className="mt-1 block w-full rounded-xl"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <InputLabel value="Weight (e.g., 250g, 1kg)" />
                                                <TextInput
                                                    value={size.weight}
                                                    onChange={(e) => updateSize(index, 'weight', e.target.value)}
                                                    className="mt-1 block w-full rounded-xl"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <InputLabel value="Price (₹)" />
                                                <TextInput
                                                    type="number"
                                                    step="0.01"
                                                    value={size.price}
                                                    onChange={(e) => updateSize(index, 'price', e.target.value)}
                                                    className="mt-1 block w-full rounded-xl"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <InputLabel value="Original Price (₹)" />
                                                <TextInput
                                                    type="number"
                                                    step="0.01"
                                                    value={size.original_price}
                                                    onChange={(e) => updateSize(index, 'original_price', e.target.value)}
                                                    className="mt-1 block w-full rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <ToggleSwitch
                                                checked={size.is_default}
                                                onChange={(e) => updateSize(index, 'is_default', e.target.checked)}
                                                label="Default size"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                                <div className="rounded-lg bg-amber-50 p-2">
                                    <InformationCircleIcon className="h-5 w-5 text-amber-600" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Additional Information</h3>
                            </div>
                            <div className="space-y-4 p-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <InputLabel htmlFor="grade" value="Grade" />
                                        <TextInput
                                            id="grade"
                                            value={data.grade}
                                            onChange={(e) => setData('grade', e.target.value)}
                                            className="mt-1 block w-full rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="origin" value="Origin" />
                                        <TextInput
                                            id="origin"
                                            value={data.origin}
                                            onChange={(e) => setData('origin', e.target.value)}
                                            className="mt-1 block w-full rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="shelf_life" value="Shelf Life" />
                                        <TextInput
                                            id="shelf_life"
                                            value={data.shelf_life}
                                            onChange={(e) => setData('shelf_life', e.target.value)}
                                            className="mt-1 block w-full rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6 pt-2">
                                    <ToggleSwitch
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        label="Featured Product"
                                    />
                                    <ToggleSwitch
                                        checked={data.is_gift_box}
                                        onChange={(e) => setData('is_gift_box', e.target.checked)}
                                        label="Gift Box"
                                    />
                                    <ToggleSwitch
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        label="Active"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Images */}
                    <div className="space-y-6">
                        {/* Primary Image */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                                <div className="rounded-lg bg-orange-50 p-2">
                                    <PhotoIcon className="h-5 w-5 text-orange-600" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Product Image</h3>
                            </div>
                            <div className="p-6">
                                <label className="group block cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    {imagePreview ? (
                                        <div className="relative overflow-hidden rounded-xl">
                                            <img src={imagePreview} alt="Preview" className="h-48 w-full object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                                                    Change Image
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-10 transition-colors group-hover:border-orange-300 group-hover:bg-orange-50/30">
                                            <PhotoIcon className="h-10 w-10 text-gray-300 group-hover:text-orange-400" />
                                            <p className="mt-2 text-sm font-medium text-gray-500">Click to upload</p>
                                            <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                                        </div>
                                    )}
                                </label>
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                        </div>

                        {/* Gallery Images */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                                <div className="rounded-lg bg-indigo-50 p-2">
                                    <CloudArrowUpIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Gallery Images</h3>
                            </div>
                            <div className="p-6">
                                {/* Drag and drop zone */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => galleryInputRef.current?.click()}
                                    className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-8 transition-all duration-200 ${
                                        isDragging
                                            ? 'border-indigo-400 bg-indigo-50'
                                            : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30'
                                    }`}
                                >
                                    <CloudArrowUpIcon className={`h-8 w-8 ${isDragging ? 'text-indigo-500' : 'text-gray-300'}`} />
                                    <p className="mt-2 text-sm font-medium text-gray-500">
                                        {isDragging ? 'Drop images here' : 'Drag & drop or click to upload'}
                                    </p>
                                    <p className="text-xs text-gray-400">Multiple images supported</p>
                                </div>
                                <input
                                    ref={galleryInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleGalleryChange}
                                    className="hidden"
                                />

                                {/* Existing gallery images */}
                                {existingGallery.length > 0 && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Current Images</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {existingGallery.filter(img => imageUrl(img.image_path)).map((img) => (
                                                <div key={img.id} className="group relative overflow-hidden rounded-lg">
                                                    <img
                                                        src={imageUrl(img.image_path)}
                                                        alt="Gallery"
                                                        className="h-20 w-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => setPrimaryGalleryId(img.id)}
                                                            className="rounded-md bg-white p-1"
                                                            title="Set as primary"
                                                        >
                                                            {primaryGalleryId === img.id ? (
                                                                <StarIconSolid className="h-4 w-4 text-orange-500" />
                                                            ) : (
                                                                <StarIcon className="h-4 w-4 text-gray-600" />
                                                            )}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeExistingImage(img.id)}
                                                            className="rounded-md bg-white p-1"
                                                            title="Remove"
                                                        >
                                                            <XMarkIcon className="h-4 w-4 text-red-500" />
                                                        </button>
                                                    </div>
                                                    {primaryGalleryId === img.id && (
                                                        <div className="absolute left-1 top-1">
                                                            <StarIconSolid className="h-4 w-4 text-orange-400 drop-shadow" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New gallery previews */}
                                {galleryPreviews.length > 0 && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">New Images</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {galleryPreviews.map((item, index) => (
                                                <div key={index} className="group relative overflow-hidden rounded-lg">
                                                    <img
                                                        src={item.preview}
                                                        alt="Preview"
                                                        className="h-20 w-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryPreview(index)}
                                                        className="absolute right-1 top-1 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <XMarkIcon className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Save Bar */}
                <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-gray-200 bg-white/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.visit(route('admin.products.index'))}
                            className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-orange-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-500 hover:shadow-md disabled:bg-gray-300"
                        >
                            {processing ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
