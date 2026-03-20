import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeftIcon, EnvelopeIcon, UserIcon, ChatBubbleLeftRightIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Show({ contact }) {
    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.visit(route('admin.contacts.index'))}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <span>Contact Message</span>
                </div>
            }
        >
            <Head title="Contact Message" />

            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Sender Information */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                <UserIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Sender Information</h3>
                        </div>
                        <dl className="space-y-4">
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Name</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">{contact.name}</dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Email</dt>
                                <dd className="mt-0.5">
                                    <a href={`mailto:${contact.email}`} className="text-sm font-medium text-orange-600 hover:text-orange-800">
                                        {contact.email}
                                    </a>
                                </dd>
                            </div>
                            {contact.phone && (
                                <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Phone</dt>
                                    <dd className="mt-0.5">
                                        <a href={`tel:${contact.phone}`} className="text-sm font-medium text-orange-600 hover:text-orange-800">
                                            {contact.phone}
                                        </a>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Message Details */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                                <EnvelopeIcon className="h-5 w-5 text-violet-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Message Details</h3>
                        </div>
                        <dl className="space-y-4">
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Subject</dt>
                                <dd className="mt-0.5 text-sm font-semibold text-gray-900">{contact.subject}</dd>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-2.5">
                                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Received</dt>
                                <dd className="mt-0.5 text-sm font-medium text-gray-900">
                                    {new Date(contact.created_at).toLocaleString('en-IN')}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Message Content */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Message</h3>
                    </div>
                    <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">{contact.message}</p>
                </div>
            </div>
        </AdminLayout>
    );
}
