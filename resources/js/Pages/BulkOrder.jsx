import StoreLayout from '@/Layouts/StoreLayout';
import { Head, useForm } from '@inertiajs/react';

export default function BulkOrder() {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        contact_person: '',
        email: '',
        phone: '',
        product_category: '',
        quantity: '',
        special_requirements: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bulk-order.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <StoreLayout>
            <Head title="Bulk Orders" />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Bulk Orders</h1>
                    <p>Special pricing and packaging for bulk and corporate orders</p>
                </div>
            </section>

            {/* Bulk Features */}
            <section className="about-section">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Order in Bulk?</h2>
                    <div className="bulk-features">
                        <div className="bulk-feature">
                            <div className="bulk-feature-icon">&#127873;</div>
                            <h4>Custom Packaging</h4>
                            <p>
                                Get your orders in customized packaging with your branding. Perfect for
                                corporate gifting, wedding favors, and festive hampers. We offer a wide
                                range of packaging options to match your requirements.
                            </p>
                        </div>
                        <div className="bulk-feature">
                            <div className="bulk-feature-icon">&#128178;</div>
                            <h4>Competitive Pricing</h4>
                            <p>
                                Enjoy significant discounts on bulk purchases. The more you order, the more
                                you save. Our tiered pricing structure ensures you always get the best value
                                for your investment.
                            </p>
                        </div>
                        <div className="bulk-feature">
                            <div className="bulk-feature-icon">&#129309;</div>
                            <h4>Dedicated Support</h4>
                            <p>
                                Get a dedicated account manager for your bulk orders. From order placement
                                to delivery, we ensure a seamless experience with personalized attention
                                and priority customer service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bulk Order Form */}
            <section className="about-section" style={{ background: '#f9f5ef' }}>
                <div className="container">
                    <div className="bulk-order-form">
                        <h2>Request a Bulk Order Quote</h2>
                        <p style={{ marginBottom: '2rem', color: '#666' }}>
                            Fill out the form below and our team will get back to you with a customized quote within 24 hours.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="company_name">Company / Organization Name *</label>
                                    <input
                                        type="text"
                                        id="company_name"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="Your company name"
                                        required
                                    />
                                    {errors.company_name && <span className="error">{errors.company_name}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact_person">Contact Person *</label>
                                    <input
                                        type="text"
                                        id="contact_person"
                                        value={data.contact_person}
                                        onChange={(e) => setData('contact_person', e.target.value)}
                                        placeholder="Full name of contact person"
                                        required
                                    />
                                    {errors.contact_person && <span className="error">{errors.contact_person}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="your@company.com"
                                        required
                                    />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                    {errors.phone && <span className="error">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="product_category">Product Category *</label>
                                    <select
                                        id="product_category"
                                        value={data.product_category}
                                        onChange={(e) => setData('product_category', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="almonds">Almonds</option>
                                        <option value="cashews">Cashews</option>
                                        <option value="pistachios">Pistachios</option>
                                        <option value="walnuts">Walnuts</option>
                                        <option value="raisins">Raisins</option>
                                        <option value="dates">Dates</option>
                                        <option value="mixed_nuts">Mixed Nuts</option>
                                        <option value="gift_boxes">Gift Boxes</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.product_category && <span className="error">{errors.product_category}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Estimated Quantity (in kg) *</label>
                                    <input
                                        type="text"
                                        id="quantity"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        placeholder="e.g., 50 kg, 100 kg"
                                        required
                                    />
                                    {errors.quantity && <span className="error">{errors.quantity}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="special_requirements">Special Requirements</label>
                                <textarea
                                    id="special_requirements"
                                    rows="5"
                                    value={data.special_requirements}
                                    onChange={(e) => setData('special_requirements', e.target.value)}
                                    placeholder="Tell us about any special packaging, branding, delivery timeline, or other requirements..."
                                ></textarea>
                                {errors.special_requirements && <span className="error">{errors.special_requirements}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit Bulk Order Request'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </StoreLayout>
    );
}
