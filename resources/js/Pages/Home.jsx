import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import ProductCard from '@/Components/ProductCard';
import { imageUrl } from '@/utils';

const CATEGORY_IMAGES = {
    'dry-fruits': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop',
    'dates': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
    'berries': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop',
    'seeds': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    'dfh-exclusives': 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400&h=300&fit=crop',
    'gift-boxes': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop',
};

const heroSlides = [
    {
        image: '/images/banners/banner-1.png',
        title: 'Pure. Premium. Natural.',
        subtitle: 'Indulge in Nature\'s Finest Selection',
        fallbackBg: 'linear-gradient(135deg, #0a2314 0%, #0f321e 40%, #143c23 100%)',
    },
    {
        image: '/images/banners/banner-2.png',
        title: 'Premium Quality Nuts',
        subtitle: 'Handpicked from the Best Farms',
        fallbackBg: 'linear-gradient(135deg, #1a3a2a 0%, #0d2818 40%, #1a5632 100%)',
    },
    {
        image: '/images/banners/banner-3.png',
        title: 'Natural Goodness',
        subtitle: 'Fresh & Healthy Every Day',
        fallbackBg: 'linear-gradient(135deg, #2d1810 0%, #1a3020 40%, #0d3b1f 100%)',
    },
    {
        image: '/images/banners/banner-4.png',
        title: 'Exotic Dry Fruits',
        subtitle: 'Rich Flavors, Premium Selection',
        fallbackBg: 'linear-gradient(135deg, #1a3a2a 0%, #0f321e 40%, #143c23 100%)',
    },
    {
        image: '/images/banners/banner-6.png',
        title: 'Wholesome Seeds',
        subtitle: 'Nutrition Packed in Every Bite',
        fallbackBg: 'linear-gradient(135deg, #0d3b1f 0%, #1a5632 40%, #2d6a4f 100%)',
    },
    {
        image: '/images/banners/banner-7.png',
        title: 'Premium Gift Boxes',
        subtitle: 'Perfect for Every Occasion',
        fallbackBg: 'linear-gradient(135deg, #2d1810 0%, #1a3020 40%, #0a2314 100%)',
    },
];

export default function Home({ categories, featuredProducts, giftBoxes, testimonials }) {
    const [activeSlide, setActiveSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);


    return (
        <StoreLayout>
            <Head title="Premium Dry Fruits & Nuts | Namma Nuts - Where Freshness Meets Luxury" />

            {/* ===== HERO SECTION ===== */}
            <section className="hero-v2">
                {/* Background Slideshow */}
                <div className="hero-slideshow">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${index === activeSlide ? 'hero-slide-active' : ''}`}
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                            onError={(e) => {
                                // Fallback to gradient if image fails to load
                                e.target.style.backgroundImage = 'none';
                                e.target.style.background = slide.fallbackBg;
                            }}
                        />
                    ))}
                </div>

                {/* Overlay */}
                <div className="hero-overlay" />

                {/* Decorative Elements */}
                <div className="hero-deco hero-deco-1" />
                <div className="hero-deco hero-deco-2" />
                <div className="hero-deco hero-deco-3" />

                {/* Slide Indicators */}
                <div className="hero-slide-indicators">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`slide-indicator ${index === activeSlide ? 'active' : ''}`}
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="container">
                    <div className="hero-v2-inner">

                        {/* Right Showcase */}
                        <div className="hero-v2-showcase">
                            <div className="hero-circle-main">
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5, #fefce8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '6rem',
                                }}>
                                    🥜
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <div className="hero-float-card hero-fc-1">
                                <div style={{
                                    width: 44, height: 44, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f0fdf4, #fefce8)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', border: '2px solid rgba(200,146,44,0.4)',
                                }}>
                                    🌰
                                </div>
                                <div className="hero-fc-info">
                                    <strong>Premium Almonds</strong>
                                    <span>From ₹299</span>
                                </div>
                            </div>

                            <div className="hero-float-card hero-fc-2">
                                <div style={{
                                    width: 44, height: 44, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #fef3e2, #fde8c8)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', border: '2px solid rgba(200,146,44,0.4)',
                                }}>
                                    🌴
                                </div>
                                <div className="hero-fc-info">
                                    <strong>Medjool Dates</strong>
                                    <span>From ₹499</span>
                                </div>
                            </div>

                            <div className="hero-float-card hero-fc-3">
                                <div style={{
                                    width: 44, height: 44, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', border: '2px solid rgba(200,146,44,0.4)',
                                }}>
                                    🫐
                                </div>
                                <div className="hero-fc-info">
                                    <strong>Mixed Berries</strong>
                                    <span>From ₹349</span>
                                </div>
                            </div>

                            {/* Glass Stats */}
                            <div className="hero-glass-stats">
                                <div className="hero-glass-stat">
                                    <strong>50+</strong>
                                    <span>Products</span>
                                </div>
                                <div className="hero-glass-divider" />
                                <div className="hero-glass-stat">
                                    <strong>10K+</strong>
                                    <span>Customers</span>
                                </div>
                                <div className="hero-glass-divider" />
                                <div className="hero-glass-stat">
                                    <strong>4.8</strong>
                                    <span>Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="hero-indicators">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-indicator ${index === activeSlide ? 'active' : ''}`}
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Down */}
                <div className="hero-scroll-down">
                    <span>Scroll</span>
                    <div className="hero-scroll-line" />
                </div>
            </section>

            {/* ===== CATEGORIES SECTION ===== */}
            <section className="section" style={{ background: 'var(--light-gray)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Our Collection</span>
                        <h2>Shop by Category</h2>
                        <p>Explore our wide range of premium dry fruits, dates, berries, and more</p>
                    </div>

                    <div className="categories-grid">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('category.show', category.slug)}
                                className="category-card"
                            >
                                <div className="category-image">
                                    <img
                                        src={CATEGORY_IMAGES[category.slug] || 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop'}
                                        alt={category.name}
                                        loading="lazy"
                                    />
                                    <div className="category-overlay"></div>
                                </div>
                                <h3>{category.name}</h3>
                                <p>{category.description || 'Explore collection'}</p>
                                <span className="category-link">
                                    Shop Now <i className="fas fa-arrow-right"></i>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURED PRODUCTS SECTION ===== */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Handpicked For You</span>
                        <h2>Featured Products</h2>
                        <p>Our most popular premium dry fruits and nuts loved by thousands</p>
                    </div>

                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="section-footer">
                        <Link href={route('category.show', 'dry-fruits')} className="btn btn-outline">
                            View All Products <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FEATURED BANNER ===== */}
            <section className="featured-banner">
                <div className="container">
                    <div className="banner-inner">
                        <div className="banner-content">
                            <span className="banner-tag">
                                <i className="fas fa-gift"></i> Perfect Gifting
                            </span>
                            <h2>Premium Gift Boxes for Every Occasion</h2>
                            <p>
                                Make celebrations special with our beautifully curated gift boxes.
                                From festive hampers to corporate gifts, we have the perfect dry fruit
                                collection for every occasion.
                            </p>
                            <Link href={route('category.show', 'gift-boxes')} className="btn btn-primary">
                                <i className="fas fa-gift"></i> Explore Gift Boxes
                            </Link>
                        </div>
                        <div className="banner-image-placeholder">
                            🎁
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== GIFT BOXES SECTION ===== */}
            {giftBoxes.length > 0 && (
                <section className="section" style={{ background: 'var(--light-gray)' }}>
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Gifting Made Special</span>
                            <h2>Curated Gift Boxes</h2>
                            <p>Handcrafted gift collections perfect for weddings, festivals, and corporate gifting</p>
                        </div>

                        <div className="gift-grid">
                            {giftBoxes.map((box) => (
                                <div key={box.id} className="gift-card">
                                    <div className="gift-image">
                                        <div className="gift-image-placeholder">
                                            {imageUrl(box.image) ? (
                                                <img
                                                    src={imageUrl(box.image)}
                                                    alt={box.name}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = '<div style="font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%;">🎁</div>';
                                                    }}
                                                />
                                            ) : (
                                                <div style={{fontSize: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>🎁</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="gift-info">
                                        <h3>{box.name}</h3>
                                        <p>{box.short_description || box.description || 'A premium selection of the finest dry fruits and nuts, elegantly packed.'}</p>
                                        <div className="gift-actions">
                                            <Link href={route('product.show', box.slug)} className="btn btn-primary btn-sm">
                                                <i className="fas fa-eye"></i> View Details
                                            </Link>
                                            <a
                                                href={`https://wa.me/919876543210?text=Hi, I'm interested in ${box.name}`}
                                                className="btn btn-whatsapp btn-sm"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fab fa-whatsapp"></i> Enquire
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="section-footer">
                            <Link href={route('category.show', 'gift-boxes')} className="btn btn-outline">
                                View All Gift Boxes <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TESTIMONIALS SECTION ===== */}
            {testimonials.length > 0 && (
                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Customer Love</span>
                            <h2>What Our Customers Say</h2>
                            <p>Real reviews from our happy customers across India</p>
                        </div>

                        <div className="testimonials-grid">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="testimonial-card">
                                    <div className="testimonial-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <i
                                                key={i}
                                                className={`fas fa-star${i < testimonial.rating ? '' : '-half-alt'}`}
                                                style={{ color: i < testimonial.rating ? '#f59e0b' : '#e5e7eb' }}
                                            />
                                        ))}
                                    </div>
                                    <p className="testimonial-text">"{testimonial.comment}"</p>
                                    <div className="testimonial-author">
                                        <div className="author-avatar">
                                            {testimonial.reviewer_name
                                                ? testimonial.reviewer_name.charAt(0).toUpperCase()
                                                : 'U'}
                                        </div>
                                        <div className="author-info">
                                            <strong>{testimonial.reviewer_name}</strong>
                                            <span>{testimonial.reviewer_location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TRUST BADGES SECTION ===== */}
            <section className="trust-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Why Choose Us</span>
                        <h2>The Namma Nuts Promise</h2>
                    </div>

                    <div className="trust-grid">
                        <div className="trust-item">
                            <div className="trust-icon">
                                <i className="fas fa-leaf"></i>
                            </div>
                            <h3>100% Natural</h3>
                            <p>No preservatives, additives, or artificial colors. Pure and natural goodness.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">
                                <i className="fas fa-truck"></i>
                            </div>
                            <h3>Free Shipping</h3>
                            <p>Free delivery on all orders above ₹999 across India with secure packaging.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">
                                <i className="fas fa-certificate"></i>
                            </div>
                            <h3>Quality Certified</h3>
                            <p>FSSAI certified products with rigorous quality checks at every stage.</p>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon">
                                <i className="fas fa-undo-alt"></i>
                            </div>
                            <h3>Easy Returns</h3>
                            <p>Not satisfied? Get hassle-free returns within 7 days of delivery.</p>
                        </div>
                    </div>
                </div>
            </section>

        </StoreLayout>
    );
}
