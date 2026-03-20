import StoreLayout from '@/Layouts/StoreLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <StoreLayout>
            <Head title="Contact Us" />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Get in touch with us today!</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="about-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form">
                            <h2>Send Us a Message</h2>
                            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Your full name"
                                            required
                                        />
                                        {errors.name && <span className="error">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="your@email.com"
                                            required
                                        />
                                        {errors.email && <span className="error">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+91 98765 43210"
                                        />
                                        {errors.phone && <span className="error">{errors.phone}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject *</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            placeholder="How can we help?"
                                            required
                                        />
                                        {errors.subject && <span className="error">{errors.subject}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        rows="6"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                    ></textarea>
                                    {errors.message && <span className="error">{errors.message}</span>}
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={processing}>
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="contact-info-cards">
                            <div className="contact-card">
                                <div className="contact-card-icon">&#128222;</div>
                                <h4>Phone</h4>
                                <p>+91 98765 43210</p>
                                <p>+91 12345 67890</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-card-icon">&#9993;</div>
                                <h4>Email</h4>
                                <p>info@nutsecommerce.com</p>
                                <p>support@nutsecommerce.com</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-card-icon">&#128205;</div>
                                <h4>Address</h4>
                                <p>123 Nut Street, Dry Fruit Lane</p>
                                <p>Mumbai, Maharashtra 400001</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-card-icon">&#128338;</div>
                                <h4>Business Hours</h4>
                                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                                <p>Sunday: 10:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </StoreLayout>
    );
}
