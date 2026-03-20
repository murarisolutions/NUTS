import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { imageUrl } from '@/utils';

const EMOJIS = {
    'dry-fruits': '🥜', 'dates': '🌴', 'berries': '🫐',
    'seeds': '🌻', 'dfh-exclusives': '⭐', 'gift-boxes': '🎁',
};

export default function ProductCard({ product }) {
    const defaultSize = product.sizes?.find(s => s.is_default) || product.sizes?.[0];
    const [selectedSize, setSelectedSize] = useState(defaultSize);

    const emoji = EMOJIS[product.category?.slug] || '🥜';

    const addToCart = () => {
        if (!selectedSize) return;
        router.post(route('cart.add'), {
            product_id: product.id,
            product_size_id: selectedSize.id,
            quantity: 1,
        }, { preserveScroll: true });
    };

    return (
        <div className="product-card">
            {product.badge && (
                <span className={`product-badge ${product.badge === 'Best Seller' ? 'best-seller' : product.badge === 'New' ? 'new' : 'premium'}`}>
                    {product.badge}
                </span>
            )}
            <Link href={route('product.show', product.slug)} className="product-image">
                <div className="product-image-placeholder">
                    {imageUrl(product.image) ? (
                        <img
                            src={imageUrl(product.image)}
                            alt={product.name}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `<div class="flex h-full items-center justify-center text-6xl">${emoji}</div>`;
                            }}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-6xl">{emoji}</div>
                    )}
                </div>
            </Link>
            <div className="product-info">
                <span className="product-category">{product.category?.name}</span>
                <h3 className="product-name">
                    <Link href={route('product.show', product.slug)}>{product.name}</Link>
                </h3>
                {product.sizes && product.sizes.length > 0 && (
                    <div className="product-sizes">
                        {product.sizes.map(size => (
                            <button
                                key={size.id}
                                className={`size-option ${selectedSize?.id === size.id ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size.size_label}
                            </button>
                        ))}
                    </div>
                )}
                <div className="product-price">
                    {product.price_on_request ? (
                        <span className="current">Price on Request</span>
                    ) : (
                        <>
                            <span className="current">₹{selectedSize?.price || product.price}</span>
                            {selectedSize?.original_price && parseFloat(selectedSize.original_price) > parseFloat(selectedSize.price) && (
                                <span className="original">₹{selectedSize.original_price}</span>
                            )}
                        </>
                    )}
                </div>
                <div className="product-bottom">
                    <Link href={route('product.show', product.slug)} className="view-btn">
                        View Details <i className="fas fa-arrow-right"></i>
                    </Link>
                    {!product.price_on_request && !product.is_gift_box && (
                        <button className="btn btn-primary btn-sm" onClick={addToCart}>
                            <i className="fas fa-shopping-bag"></i> Add
                        </button>
                    )}
                    {product.is_gift_box && (
                        <a href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}`}
                           className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-whatsapp"></i> Enquire
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
