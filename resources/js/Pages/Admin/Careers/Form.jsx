import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ career }) {
    const isEditing = !!career;

    const { data, setData, post, put, processing, errors } = useForm({
        title: career?.title || '',
        type: career?.type || '',
        location: career?.location || '',
        description: career?.description || '',
        is_active: career?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.careers.update', career.id));
        } else {
            post(route('admin.careers.store'));
        }
    };

    return (
        <AdminLayout header={isEditing ? 'Edit Career Posting' : 'Create Career Posting'}>
            <Head title={isEditing ? 'Edit Career' : 'Create Career'} />

            <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="title" value="Job Title *" />
                                <TextInput
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="type" value="Job Type *" />
                                    <TextInput
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="e.g., Full-time, Part-time"
                                        required
                                    />
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="location" value="Location *" />
                                    <TextInput
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Job Description *" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="10"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    required
                                    placeholder="Job description, requirements, benefits, etc."
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <InputLabel htmlFor="is_active" value="Active (visible to job seekers)" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.visit(route('admin.careers.index'))}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <PrimaryButton disabled={processing}>
                            {processing ? 'Saving...' : isEditing ? 'Update Posting' : 'Create Posting'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
