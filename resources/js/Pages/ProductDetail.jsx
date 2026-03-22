import StoreLayout from '@/Layouts/StoreLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { imageUrl } from '@/utils';

const EMOJIS = {
    'dry-fruits': '🥜',
    'dates': '🌴',
    'berries': '🫐',
    'seeds': '🌻',
    'dfh-exclusives': '⭐',
    'gift-boxes': '🎁',
};

export default function ProductDetail({ product, relatedProducts, tasteFirstEnabled, tasteFirstBadgeText }) {
    const defaultSize = product.sizes?.find(s => s.is_default) || product.sizes?.[0];
    const [selectedSize, setSelectedSize] = useState(defaultSize);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(
        product.images?.find(img => img.is_primary) || product.images?.[0] || null
    );
    const [isZoomed, setIsZoomed] = useState(false);
    const [autoSlide, setAutoSlide] = useState(true);

    const validImagesEarly = product.images?.filter(img => imageUrl(img.image_path)) || [];

    // Auto-slide images every 3 seconds
    const goToNextImage = useCallback(() => {
        if (validImagesEarly.length <= 1) return;
        setMainImage(prev => {
            const currentIndex = validImagesEarly.findIndex(img => img.id === prev?.id);
            const nextIndex = (currentIndex + 1) % validImagesEarly.length;
            return validImagesEarly[nextIndex];
        });
    }, [validImagesEarly]);

    const goToPrevImage = useCallback(() => {
        if (validImagesEarly.length <= 1) return;
        setMainImage(prev => {
            const currentIndex = validImagesEarly.findIndex(img => img.id === prev?.id);
            const prevIndex = (currentIndex - 1 + validImagesEarly.length) % validImagesEarly.length;
            return validImagesEarly[prevIndex];
        });
    }, [validImagesEarly]);

    useEffect(() => {
        if (!autoSlide || validImagesEarly.length <= 1) return;
        const interval = setInterval(goToNextImage, 3000);
        return () => clearInterval(interval);
    }, [autoSlide, goToNextImage, validImagesEarly.length]);

    const emoji = EMOJIS[product.category?.slug] || '🥜';

    const currentPrice = selectedSize?.price || product.price;
    const currentOriginalPrice = selectedSize?.original_price || product.original_price;
    const hasDiscount = currentOriginalPrice && parseFloat(currentOriginalPrice) > parseFloat(currentPrice);
    const discountPercent = hasDiscount
        ? Math.round(((parseFloat(currentOriginalPrice) - parseFloat(currentPrice)) / parseFloat(currentOriginalPrice)) * 100)
        : 0;

    const incrementQty = () => setQuantity(prev => prev + 1);
    const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const addToCart = () => {
        if (!selectedSize) return;
        router.post(route('cart.add'), {
            product_id: product.id,
            product_size_id: selectedSize.id,
            quantity: quantity,
        }, { preserveScroll: true });
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
        }
        if (hasHalf) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }
        const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
        for (let i = 0; i < remaining; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }
        return stars;
    };

    return (
        <StoreLayout>
            <Head title={product.name} />

            {/* Breadcrumb */}
            <div className="breadcrumb">
                <div className="container">
                    <Link href={route('home')}>Home</Link>
                    <span>/</span>
                    <Link href={route('category.show', product.category?.slug)}>
                        {product.category?.name}
                    </Link>
                    <span>/</span>
                    <span className="current">{product.name}</span>
                </div>
            </div>

            {/* Product Detail */}
            <section className="product-detail">
                <div className="container">
                    <div className="product-detail-grid">
                        {/* Product Gallery */}
                        <div className="product-gallery">
                            <div
                                className={`product-main-image ${isZoomed ? 'zoomed' : ''}`}
                                onMouseEnter={() => { setIsZoomed(true); setAutoSlide(false); }}
                                onMouseLeave={() => { setIsZoomed(false); setAutoSlide(true); }}
                            >
                                {imageUrl(mainImage?.image_path) ? (
                                    <img
                                        src={imageUrl(mainImage.image_path)}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex');
                                        }}
                                    />
                                ) : imageUrl(product.image) ? (
                                    <img
                                        src={imageUrl(product.image)}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex');
                                        }}
                                    />
                                ) : null}
                                <div className="product-image-placeholder" style={{
                                    display: imageUrl(mainImage?.image_path) || imageUrl(product.image) ? 'none' : 'flex',
                                    fontSize: '6rem',
                                }}>
                                    {emoji}
                                </div>

                                {/* Navigation Arrows */}
                                {validImagesEarly.length > 1 && (
                                    <>
                                        <button className="gallery-nav gallery-nav-prev" onClick={(e) => { e.stopPropagation(); goToPrevImage(); setAutoSlide(false); setTimeout(() => setAutoSlide(true), 5000); }}>
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                        <button className="gallery-nav gallery-nav-next" onClick={(e) => { e.stopPropagation(); goToNextImage(); setAutoSlide(false); setTimeout(() => setAutoSlide(true), 5000); }}>
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </>
                                )}

                                {/* Image Counter Dots */}
                                {validImagesEarly.length > 1 && (
                                    <div className="gallery-dots">
                                        {validImagesEarly.map((img, idx) => (
                                            <span
                                                key={img.id}
                                                className={`gallery-dot ${mainImage?.id === img.id ? 'active' : ''}`}
                                                onClick={() => { setMainImage(img); setAutoSlide(false); setTimeout(() => setAutoSlide(true), 5000); }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {product.badge && (
                                    <span className={`product-badge ${product.badge === 'Best Seller' ? 'best-seller' : product.badge === 'New' ? 'new' : 'premium'}`}>
                                        {product.badge}
                                    </span>
                                )}

                                {hasDiscount && (
                                    <span className="product-discount-tag">
                                        {discountPercent}% OFF
                                    </span>
                                )}
                            </div>

                            {validImagesEarly.length > 1 && (
                                <div className="product-thumbnails">
                                    {validImagesEarly.map((img) => (
                                        <button
                                            key={img.id}
                                            className={`product-thumb ${mainImage?.id === img.id ? 'active' : ''}`}
                                            onClick={() => { setMainImage(img); setAutoSlide(false); setTimeout(() => setAutoSlide(true), 5000); }}
                                        >
                                            <img
                                                src={imageUrl(img.image_path)}
                                                alt={product.name}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="product-detail-info">
                            {product.category && (
                                <Link href={route('category.show', product.category.slug)} className="pd-category-link">
                                    {product.category.name}
                                </Link>
                            )}

                            <h1>{product.name}</h1>

                            {product.rating > 0 && (
                                <div className="product-rating">
                                    <div className="stars">
                                        {renderStars(product.rating)}
                                    </div>
                                    <span className="rating-value">{Number(product.rating).toFixed(1)}</span>
                                    {product.reviews && product.reviews.length > 0 && (
                                        <span className="review-count">
                                            ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="product-detail-price">
                                {product.price_on_request ? (
                                    <span className="price-on-request">
                                        <i className="fas fa-tag"></i> Price on Request
                                    </span>
                                ) : (
                                    <>
                                        <span className="current-price">
                                            ₹{parseFloat(currentPrice).toLocaleString('en-IN')}
                                        </span>
                                        {hasDiscount && (
                                            <>
                                                <span className="original-price">
                                                    ₹{parseFloat(currentOriginalPrice).toLocaleString('en-IN')}
                                                </span>
                                                <span className="discount-badge">
                                                    Save {discountPercent}%
                                                </span>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            {product.description && (
                                <div className="product-description">
                                    <p>{product.description}</p>
                                </div>
                            )}

                            <div className="pd-divider"></div>

                            {/* Size Selector */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="size-selector">
                                    <label>
                                        <i className="fas fa-weight-hanging"></i> Size / Weight
                                    </label>
                                    <div className="product-sizes">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size.id}
                                                className={`size-option ${selectedSize?.id === size.id ? 'active' : ''}`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                <span className="size-label">{size.size_label}</span>
                                                {size.weight && <span className="size-weight">{size.weight}</span>}
                                                {!product.price_on_request && (
                                                    <span className="size-price">₹{parseFloat(size.price).toLocaleString('en-IN')}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            {!product.price_on_request && !product.is_gift_box && (
                                <div className="quantity-selector">
                                    <label>
                                        <i className="fas fa-boxes"></i> Quantity
                                    </label>
                                    <div className="qty-controls">
                                        <button onClick={decrementQty} disabled={quantity <= 1} className="qty-btn">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <span className="qty-value">{quantity}</span>
                                        <button onClick={incrementQty} className="qty-btn">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    {selectedSize && !product.price_on_request && (
                                        <span className="qty-total">
                                            Total: ₹{(parseFloat(currentPrice) * quantity).toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="product-detail-actions">
                                {!product.price_on_request && !product.is_gift_box && (
                                    <button className="btn btn-primary btn-lg pd-add-to-cart" onClick={addToCart}>
                                        <i className="fas fa-shopping-bag"></i> Add to Cart
                                    </button>
                                )}
                                {product.is_gift_box && (
                                    <a
                                        href={`https://wa.me/919876543210?text=Hi, I'm interested in ${encodeURIComponent(product.name)}. Please share the details.`}
                                        className="btn btn-whatsapp btn-lg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-whatsapp"></i> Enquire on WhatsApp
                                    </a>
                                )}
                                {product.price_on_request && (
                                    <a
                                        href={`https://wa.me/919876543210?text=Hi, I'd like to know the price for ${encodeURIComponent(product.name)}.`}
                                        className="btn btn-whatsapp btn-lg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-whatsapp"></i> Request Price
                                    </a>
                                )}
                            </div>

                            {/* Taste First Badge */}
                            {tasteFirstEnabled && !product.price_on_request && !product.is_gift_box && (
                                <div className="taste-first-product-badge">
                                    <div className="tfpb-icon">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <div className="tfpb-content">
                                        <strong>{tasteFirstBadgeText || 'Taste First Guarantee'}</strong>
                                        <span>Try a sample first. Not satisfied? Full refund guaranteed.</span>
                                    </div>
                                </div>
                            )}

                            {/* Trust Indicators */}
                            <div className="pd-trust-row">
                                <div className="pd-trust-item">
                                    <i className="fas fa-truck"></i>
                                    <span>Free Shipping</span>
                                </div>
                                <div className="pd-trust-item">
                                    <i className="fas fa-leaf"></i>
                                    <span>100% Natural</span>
                                </div>
                                <div className="pd-trust-item">
                                    <i className="fas fa-award"></i>
                                    <span>Premium Quality</span>
                                </div>
                            </div>

                            {/* Product Meta */}
                            <div className="product-meta">
                                {product.sku && (
                                    <div className="meta-item">
                                        <i className="fas fa-barcode"></i>
                                        <span className="meta-label">SKU</span>
                                        <span className="meta-value">{product.sku}</span>
                                    </div>
                                )}
                                {product.grade && (
                                    <div className="meta-item">
                                        <i className="fas fa-gem"></i>
                                        <span className="meta-label">Grade</span>
                                        <span className="meta-value">{product.grade}</span>
                                    </div>
                                )}
                                {product.origin && (
                                    <div className="meta-item">
                                        <i className="fas fa-globe-asia"></i>
                                        <span className="meta-label">Origin</span>
                                        <span className="meta-value">{product.origin}</span>
                                    </div>
                                )}
                                {product.shelf_life && (
                                    <div className="meta-item">
                                        <i className="fas fa-clock"></i>
                                        <span className="meta-label">Shelf Life</span>
                                        <span className="meta-value">{product.shelf_life}</span>
                                    </div>
                                )}
                                {product.category && (
                                    <div className="meta-item">
                                        <i className="fas fa-folder"></i>
                                        <span className="meta-label">Category</span>
                                        <Link href={route('category.show', product.category.slug)} className="meta-value meta-link">
                                            {product.category.name}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Nutritional Info */}
                    {product.nutritionalInfo && (
                        <div className="pd-section">
                            <div className="pd-section-header">
                                <span className="pd-section-icon">
                                    <i className="fas fa-apple-alt"></i>
                                </span>
                                <div>
                                    <h2>Nutritional Information</h2>
                                    <p>Per 100g serving</p>
                                </div>
                            </div>
                            <div className="nutritional-grid">
                                {product.nutritionalInfo.energy && (
                                    <div className="nutrition-card">
                                        <div className="nc-icon" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
                                            <i className="fas fa-bolt" style={{ color: '#d97706' }}></i>
                                        </div>
                                        <div className="nc-info">
                                            <span className="nc-label">Energy</span>
                                            <span className="nc-value">{product.nutritionalInfo.energy}</span>
                                        </div>
                                    </div>
                                )}
                                {product.nutritionalInfo.protein && (
                                    <div className="nutrition-card">
                                        <div className="nc-icon" style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' }}>
                                            <i className="fas fa-dumbbell" style={{ color: '#db2777' }}></i>
                                        </div>
                                        <div className="nc-info">
                                            <span className="nc-label">Protein</span>
                                            <span className="nc-value">{product.nutritionalInfo.protein}</span>
                                        </div>
                                    </div>
                                )}
                                {product.nutritionalInfo.fat && (
                                    <div className="nutrition-card">
                                        <div className="nc-icon" style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' }}>
                                            <i className="fas fa-tint" style={{ color: '#0284c7' }}></i>
                                        </div>
                                        <div className="nc-info">
                                            <span className="nc-label">Fat</span>
                                            <span className="nc-value">{product.nutritionalInfo.fat}</span>
                                        </div>
                                    </div>
                                )}
                                {product.nutritionalInfo.carbs && (
                                    <div className="nutrition-card">
                                        <div className="nc-icon" style={{ background: 'linear-gradient(135deg, #fef9c3, #fef08a)' }}>
                                            <i className="fas fa-bread-slice" style={{ color: '#ca8a04' }}></i>
                                        </div>
                                        <div className="nc-info">
                                            <span className="nc-label">Carbohydrates</span>
                                            <span className="nc-value">{product.nutritionalInfo.carbs}</span>
                                        </div>
                                    </div>
                                )}
                                {product.nutritionalInfo.fiber && (
                                    <div className="nutrition-card">
                                        <div className="nc-icon" style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}>
                                            <i className="fas fa-leaf" style={{ color: '#16a34a' }}></i>
                                        </div>
                                        <div className="nc-info">
                                            <span className="nc-label">Fiber</span>
                                            <span className="nc-value">{product.nutritionalInfo.fiber}</span>
                                        </div>
                                    </div>
                                )}
                                {product.nutritionalInfo.vitamin_e && (
                                    <div className="nutrition-card">
                                        <div className="nc-icon" style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' }}>
                                            <i className="fas fa-capsules" style={{ color: '#7c3aed' }}></i>
                                        </div>
                                        <div className="nc-info">
                                            <span className="nc-label">Vitamin E</span>
                                            <span className="nc-value">{product.nutritionalInfo.vitamin_e}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Reviews Section */}
                    {product.reviews && product.reviews.length > 0 && (
                        <div className="pd-section">
                            <div className="pd-section-header">
                                <span className="pd-section-icon">
                                    <i className="fas fa-star"></i>
                                </span>
                                <div>
                                    <h2>Customer Reviews</h2>
                                    <p>{product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}</p>
                                </div>
                            </div>

                            <div className="reviews-container">
                                {/* Reviews Summary */}
                                <div className="reviews-summary">
                                    <div className="rs-score">
                                        <span className="rs-number">{Number(product.rating).toFixed(1)}</span>
                                        <div className="rs-stars stars">{renderStars(product.rating)}</div>
                                        <span className="rs-count">
                                            {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
                                        </span>
                                    </div>
                                    <div className="rs-bars">
                                        {[5, 4, 3, 2, 1].map(star => {
                                            const count = product.reviews.filter(r => Math.floor(r.rating) === star).length;
                                            const pct = product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0;
                                            return (
                                                <div key={star} className="rs-bar-row">
                                                    <span className="rs-bar-label">{star} <i className="fas fa-star"></i></span>
                                                    <div className="rs-bar-track">
                                                        <div className="rs-bar-fill" style={{ width: `${pct}%` }}></div>
                                                    </div>
                                                    <span className="rs-bar-count">{count}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Reviews List */}
                                <div className="reviews-list">
                                    {product.reviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <div className="rc-header">
                                                <div className="rc-avatar">
                                                    {(review.reviewer_name || review.user?.name || 'A').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="rc-info">
                                                    <strong className="rc-name">
                                                        {review.reviewer_name || review.user?.name || 'Anonymous'}
                                                    </strong>
                                                    {review.reviewer_location && (
                                                        <span className="rc-location">
                                                            <i className="fas fa-map-marker-alt"></i> {review.reviewer_location}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="rc-rating stars">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="rc-comment">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Related Products */}
                    {relatedProducts && relatedProducts.length > 0 && (
                        <div className="pd-section pd-related">
                            <div className="pd-section-header pd-section-header-center">
                                <div>
                                    <h2>You May Also Like</h2>
                                    <p>More from {product.category?.name || 'our collection'}</p>
                                </div>
                            </div>
                            <div className="products-grid">
                                {relatedProducts.map(relProduct => (
                                    <ProductCard key={relProduct.id} product={relProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </StoreLayout>
    );
}
