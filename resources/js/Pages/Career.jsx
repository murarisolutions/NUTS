import StoreLayout from '@/Layouts/StoreLayout';
import { Head, Link } from '@inertiajs/react';

export default function Career({ careers = [] }) {
    return (
        <StoreLayout>
            <Head title="Careers" />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Careers</h1>
                    <p>Join our team and be a part of the nutty revolution</p>
                </div>
            </section>

            {/* Career Intro */}
            <section className="about-section">
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2>Work With Us</h2>
                        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginTop: '1rem' }}>
                            At NutsEcommerce, we are passionate about quality, innovation, and customer satisfaction.
                            We are always on the lookout for talented individuals who share our vision of delivering
                            the finest dry fruits to customers across the country. If you are enthusiastic, driven,
                            and ready to grow with us, we would love to hear from you.
                        </p>
                        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginTop: '1rem' }}>
                            We offer a dynamic work environment, competitive compensation, and opportunities
                            for professional growth. Explore our current openings below and take the first
                            step toward an exciting career.
                        </p>
                    </div>
                </div>
            </section>

            {/* Current Openings */}
            <section className="about-section" style={{ background: '#f9f5ef' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Current Openings</h2>
                    {careers.length > 0 ? (
                        <div className="openings-grid">
                            {careers.map((career) => (
                                <div className="opening-card" key={career.id}>
                                    <div className="opening-info">
                                        <h3>{career.title}</h3>
                                        <div className="opening-tags">
                                            <span className="opening-tag">{career.type}</span>
                                            <span className="opening-tag">{career.location}</span>
                                        </div>
                                        <p style={{ marginTop: '1rem', color: '#555', lineHeight: '1.7' }}>
                                            {career.description}
                                        </p>
                                    </div>
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <Link
                                            href={`mailto:careers@nutsecommerce.com?subject=Application for ${career.title}`}
                                            className="btn btn-primary"
                                        >
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                            <h3>No openings available right now</h3>
                            <p style={{ color: '#666', marginTop: '1rem' }}>
                                We currently do not have any open positions, but we are always looking for
                                talented individuals. Feel free to send your resume to{' '}
                                <a href="mailto:careers@nutsecommerce.com" style={{ color: '#8b6914' }}>
                                    careers@nutsecommerce.com
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </StoreLayout>
    );
}
