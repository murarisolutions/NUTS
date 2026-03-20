import StoreLayout from '@/Layouts/StoreLayout';
import { Head, Link } from '@inertiajs/react';

export default function About({ testimonials = [] }) {
    return (
        <StoreLayout>
            <Head title="About Us" />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>About Us</h1>
                    <p>Bringing you the finest quality nuts and dry fruits since 2014</p>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image-placeholder">
                            <div style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '400px',
                                background: 'linear-gradient(135deg, #f5e6d3, #e8d5b7)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                color: '#8b6914'
                            }}>
                                Our Story in Every Nut
                            </div>
                        </div>
                        <div className="about-text">
                            <h2>Our Story</h2>
                            <p>
                                Welcome to NutsEcommerce, your trusted destination for premium quality nuts and dry fruits.
                                Founded with a passion for bringing the finest, freshest, and most nutritious dry fruits
                                directly to your doorstep, we have grown from a small family business into one of the most
                                loved brands in the industry.
                            </p>
                            <p>
                                We source our products directly from the best farms across the globe -- from the almond
                                orchards of California to the pistachio groves of Iran, the cashew plantations of Vietnam,
                                and the walnut valleys of Kashmir. Every product undergoes rigorous quality checks to ensure
                                you receive nothing but the best.
                            </p>
                            <p>
                                Our commitment goes beyond just selling nuts. We believe in sustainable sourcing, fair trade
                                practices, and supporting the farming communities that make our business possible. When you
                                choose us, you choose quality, integrity, and a healthier lifestyle.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-section" style={{ background: '#f9f5ef' }}>
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>10+</h3>
                            <p>Years of Experience</p>
                        </div>
                        <div className="stat-item">
                            <h3>62+</h3>
                            <p>Premium Products</p>
                        </div>
                        <div className="stat-item">
                            <h3>10000+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-item">
                            <h3>50+</h3>
                            <p>Cities Served</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges Section */}
            <section className="about-section">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Trust Us</h2>
                    <div className="trust-grid">
                        <div className="trust-item">
                            <div className="trust-icon">&#9733;</div>
                            <h4>100% Natural</h4>
                            <p>No artificial preservatives or additives. Pure, natural goodness in every bite.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">&#9745;</div>
                            <h4>Quality Certified</h4>
                            <p>FSSAI certified and lab-tested products ensuring the highest safety standards.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">&#9829;</div>
                            <h4>Freshness Guaranteed</h4>
                            <p>Packed fresh upon order to deliver maximum flavor and nutritional value.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">&#128176;</div>
                            <h4>Best Prices</h4>
                            <p>Direct sourcing ensures you get the best quality at the most competitive prices.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">&#128666;</div>
                            <h4>Fast Delivery</h4>
                            <p>Quick and secure delivery to your doorstep with real-time tracking.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">&#128259;</div>
                            <h4>Easy Returns</h4>
                            <p>Hassle-free return policy if you are not completely satisfied with your order.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="about-section" style={{ background: '#f9f5ef' }}>
                    <div className="container">
                        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>What Our Customers Say</h2>
                        <div className="testimonials-grid">
                            {testimonials.map((testimonial, index) => (
                                <div className="testimonial-card" key={index}>
                                    <p>"{testimonial.content || testimonial.message}"</p>
                                    <div style={{ marginTop: '1rem', fontWeight: '600' }}>
                                        {testimonial.name}
                                    </div>
                                    {testimonial.designation && (
                                        <div style={{ fontSize: '0.9rem', color: '#888' }}>
                                            {testimonial.designation}
                                        </div>
                                    )}
                                    {testimonial.rating && (
                                        <div style={{ color: '#f5a623', marginTop: '0.5rem' }}>
                                            {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </StoreLayout>
    );
}
