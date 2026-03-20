import StoreLayout from '@/Layouts/StoreLayout';
import { Head } from '@inertiajs/react';
import { imageUrl } from '@/utils';

export default function Locations({ locations = [] }) {
    return (
        <StoreLayout>
            <Head title="Our Stores" />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Our Stores</h1>
                    <p>Visit us at any of our store locations for a premium shopping experience</p>
                </div>
            </section>

            {/* Locations Grid */}
            <section className="about-section">
                <div className="container">
                    {locations.length > 0 ? (
                        <div className="locations-grid">
                            {locations.map((location) => (
                                <div className="location-card" key={location.id}>
                                    <div className="location-map">
                                        {imageUrl(location.image) ? (
                                            <img
                                                src={imageUrl(location.image)}
                                                alt={location.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : location.map_url ? (
                                            <iframe
                                                src={location.map_url}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title={`Map of ${location.name}`}
                                            ></iframe>
                                        ) : (
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(135deg, #f5e6d3, #e8d5b7)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#8b6914',
                                                fontSize: '1.1rem',
                                            }}>
                                                &#128205; {location.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="location-info">
                                        <h3>{location.name}</h3>
                                        <p>
                                            <strong>&#128205; Address:</strong><br />
                                            {location.address}
                                        </p>
                                        <p>
                                            <strong>&#128222; Phone:</strong><br />
                                            {location.phone}
                                        </p>
                                        <p>
                                            <strong>&#128338; Hours:</strong><br />
                                            {location.hours}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                            <h3>No store locations available at the moment.</h3>
                            <p style={{ color: '#666', marginTop: '1rem' }}>
                                Please check back later for updates on our store locations.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </StoreLayout>
    );
}
