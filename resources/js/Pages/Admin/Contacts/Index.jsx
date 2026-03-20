import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { EnvelopeIcon, EnvelopeOpenIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ contacts }) {
    const handleDelete = (contact) => {
        if (confirm('Are you sure you want to delete this contact message?')) {
            router.delete(route('admin.contacts.destroy', contact.id));
        }
    };

    return (
        <AdminLayout header="Contact Messages">
            <Head title="Contacts" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
                        <EnvelopeIcon className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Contact Messages</h2>
                        <p className="text-sm text-gray-500">{contacts.total} total messages</p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="w-12 px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Contact</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {contacts.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center">
                                            <EnvelopeIcon className="mx-auto h-12 w-12 text-gray-300" />
                                            <p className="mt-3 text-sm font-medium text-gray-900">No contact messages found</p>
                                            <p className="mt-1 text-sm text-gray-500">Messages from the contact form will appear here.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    contacts.data.map((contact, index) => (
                                        <tr
                                            key={contact.id}
                                            className={`transition-colors hover:bg-violet-50/30 ${
                                                !contact.is_read ? 'bg-blue-50/40' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                            }`}
                                        >
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {contact.is_read ? (
                                                    <EnvelopeOpenIcon className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <span className="relative">
                                                        <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                                                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-500" />
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`text-sm ${!contact.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                    {contact.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-700">{contact.email}</div>
                                                {contact.phone && <div className="text-xs text-gray-500">{contact.phone}</div>}
                                            </td>
                                            <td className="max-w-xs px-6 py-4">
                                                <p className={`truncate text-sm ${!contact.is_read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                                    {contact.subject}
                                                </p>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {new Date(contact.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.contacts.show', contact.id)}
                                                        className="inline-flex items-center rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-100"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(contact)}
                                                        className="inline-flex items-center rounded-lg bg-red-50 p-1.5 text-red-600 transition-colors hover:bg-red-100"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {contacts.links && contacts.links.length > 3 && (
                        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-700">{contacts.from}</span> to{' '}
                                <span className="font-medium text-gray-700">{contacts.to}</span> of{' '}
                                <span className="font-medium text-gray-700">{contacts.total}</span>
                            </p>
                            <div className="flex gap-1.5">
                                {contacts.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-orange-600 text-white shadow-sm'
                                                : link.url
                                                ? 'text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                                                : 'cursor-not-allowed text-gray-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
