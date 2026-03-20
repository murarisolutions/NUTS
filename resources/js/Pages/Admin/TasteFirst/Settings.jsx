import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ShieldCheckIcon, CurrencyRupeeIcon, ClockIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

export default function Settings({ settings }) {
    const { data, setData, patch, processing, errors } = useForm({
        is_enabled: settings.is_enabled,
        fee_type: settings.fee_type,
        fee_amount: settings.fee_amount || '',
        free_threshold: settings.free_threshold || '',
        refund_window_days: settings.refund_window_days,
        checkout_description: settings.checkout_description || '',
        product_badge_text: settings.product_badge_text || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.taste-first.update'), { preserveScroll: true });
    };

    return (
        <AdminLayout header="Taste First Settings">
            <Head title="Taste First Settings" />

            <div className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Enable/Disable */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                <ShieldCheckIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">General</h3>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Enable Taste First Protection</p>
                                <p className="mt-0.5 text-sm text-gray-500">Allow customers to opt-in for refund protection at checkout</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData('is_enabled', !data.is_enabled)}
                                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    data.is_enabled ? 'bg-emerald-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                        data.is_enabled ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Fee Configuration */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                                <CurrencyRupeeIcon className="h-5 w-5 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Fee Configuration</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Fee Type</label>
                                <div className="space-y-3">
                                    {[
                                        { value: 'free', label: 'Free', desc: 'No additional charge for refund protection' },
                                        { value: 'fixed', label: 'Fixed Fee', desc: 'Charge a fixed amount for refund protection' },
                                        { value: 'free_above_threshold', label: 'Free Above Threshold', desc: 'Free above a certain order amount, fixed fee below' },
                                    ].map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all ${
                                                data.fee_type === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                                                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="fee_type"
                                                value={option.value}
                                                checked={data.fee_type === option.value}
                                                onChange={(e) => setData('fee_type', e.target.value)}
                                                className="mt-0.5 text-orange-600 focus:ring-orange-500"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{option.label}</p>
                                                <p className="mt-0.5 text-sm text-gray-500">{option.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.fee_type && <p className="mt-1 text-sm text-red-600">{errors.fee_type}</p>}
                            </div>

                            {(data.fee_type === 'fixed' || data.fee_type === 'free_above_threshold') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fee Amount (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.fee_amount}
                                        onChange={(e) => setData('fee_amount', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="e.g., 49.00"
                                    />
                                    {errors.fee_amount && <p className="mt-1 text-sm text-red-600">{errors.fee_amount}</p>}
                                </div>
                            )}

                            {data.fee_type === 'free_above_threshold' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Free Threshold Amount (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.free_threshold}
                                        onChange={(e) => setData('free_threshold', e.target.value)}
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder="e.g., 500.00"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Orders above this amount get free refund protection</p>
                                    {errors.free_threshold && <p className="mt-1 text-sm text-red-600">{errors.free_threshold}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Refund Window */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                <ClockIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Refund Window</h3>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Refund Window (days after delivery)</label>
                            <input
                                type="number"
                                min="1"
                                max="90"
                                value={data.refund_window_days}
                                onChange={(e) => setData('refund_window_days', e.target.value)}
                                className="mt-1 block w-48 rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            />
                            {errors.refund_window_days && <p className="mt-1 text-sm text-red-600">{errors.refund_window_days}</p>}
                        </div>
                    </div>

                    {/* Display Settings */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                                <PaintBrushIcon className="h-5 w-5 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Display Settings</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Checkout Description</label>
                                <textarea
                                    value={data.checkout_description}
                                    onChange={(e) => setData('checkout_description', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Description shown to customers at checkout"
                                />
                                {errors.checkout_description && <p className="mt-1 text-sm text-red-600">{errors.checkout_description}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Badge Text</label>
                                <input
                                    type="text"
                                    value={data.product_badge_text}
                                    onChange={(e) => setData('product_badge_text', e.target.value)}
                                    className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="e.g., Taste First Guarantee"
                                />
                                {errors.product_badge_text && <p className="mt-1 text-sm text-red-600">{errors.product_badge_text}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            {processing ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
