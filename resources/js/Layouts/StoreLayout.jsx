import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function StoreLayout({ children }) {
    const { auth, cartCount, flash, categories } = usePage().props;
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [shopSheetOpen, setShopSheetOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (shopSheetOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [shopSheetOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('search'), { q: searchQuery });
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const currentPath = route().current();
    const isHome = currentPath === 'home';
    const isCart = currentPath === 'cart.index';
    const isAccount = currentPath === 'dashboard' || currentPath === 'login';

    const shopCategories = [
        { name: 'Dry Fruits', slug: 'dry-fruits', icon: 'fas fa-seedling', color: '#16a34a' },
        { name: 'Dates', slug: 'dates', icon: 'fas fa-circle', color: '#b45309' },
        { name: 'Berries', slug: 'berries', icon: 'fas fa-apple-alt', color: '#dc2626' },
        { name: 'Seeds & More', slug: 'seeds', icon: 'fas fa-leaf', color: '#059669' },
        { name: 'Namma Exclusives', slug: 'dfh-exclusives', icon: 'fas fa-star', color: '#d97706' },
        { name: 'Gift Boxes', slug: 'gift-boxes', icon: 'fas fa-gift', color: '#7c3aed' },
    ];

    return (
        <>
            {/* Top Bar - desktop only */}
            <div className="top-bar-merged">
                <div className="container">
                    <div className="top-bar-merged-inner">
                        <div className="top-bar-left">
                            <a href="tel:+919876543210"><i className="fas fa-phone-alt"></i> +91 98765 43210</a>
                            <a href="mailto:info@nammanuts.com"><i className="fas fa-envelope"></i> info@nammanuts.com</a>
                        </div>
                        <div className="top-bar-center">
                            <span className="announcement-icon">🎉</span>
                            <span>Free shipping on orders above ₹999!</span>
                        </div>
                        <div className="top-bar-right">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Announcement Strip */}
            <div className="mobile-announce">
                <span>🎉 Free shipping on orders above ₹999!</span>
            </div>

            {/* Header */}
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="header-inner">
                        <Link href={route('home')} className="logo">
                            <ApplicationLogo />
                        </Link>

                        <nav className="main-nav">
                            <ul className="nav-list">
                                <li><Link href={route('home')} className={route().current('home') ? 'active' : ''}>Home</Link></li>
                                <li className="has-dropdown">
                                    <a href="#">Shop <i className="fas fa-chevron-down" style={{fontSize: '10px'}}></i></a>
                                    <ul className="dropdown-menu">
                                        <li><Link href={route('category.show', 'dry-fruits')}><i className="fas fa-seedling"></i> Dry Fruits</Link></li>
                                        <li><Link href={route('category.show', 'dates')}><i className="fas fa-circle"></i> Dates</Link></li>
                                        <li><Link href={route('category.show', 'berries')}><i className="fas fa-apple-alt"></i> Berries</Link></li>
                                        <li><Link href={route('category.show', 'seeds')}><i className="fas fa-leaf"></i> Seeds & More</Link></li>
                                        <li><Link href={route('category.show', 'dfh-exclusives')}><i className="fas fa-star"></i> Namma Nuts Exclusives</Link></li>
                                        <li><Link href={route('category.show', 'gift-boxes')}><i className="fas fa-gift"></i> Gift Boxes</Link></li>
                                    </ul>
                                </li>
                                <li><Link href={route('about')} className={route().current('about') ? 'active' : ''}>About</Link></li>
                                <li><Link href={route('bulk-order')} className={route().current('bulk-order') ? 'active' : ''}>Bulk Order</Link></li>
                                <li><Link href={route('contact')} className={route().current('contact') ? 'active' : ''}>Contact</Link></li>
                            </ul>
                        </nav>

                        <div className="header-icons">
                            <button className="icon-btn desktop-only-icon" onClick={() => setSearchOpen(true)}>
                                <i className="fas fa-search"></i>
                            </button>
                            {auth.user ? (
                                <Link href={route('dashboard')} className="icon-btn desktop-only-icon">
                                    <i className="fas fa-user"></i>
                                </Link>
                            ) : (
                                <Link href={route('login')} className="icon-btn desktop-only-icon">
                                    <i className="fas fa-user"></i>
                                </Link>
                            )}
                            <Link href={route('cart.index')} className="icon-btn desktop-only-icon">
                                <i className="fas fa-shopping-bag"></i>
                                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                            </Link>
                            <button className="menu-toggle" onClick={() => setMobileNavOpen(true)}>
                                <span></span><span></span><span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Drawer (legacy - hidden on mobile, kept for tablet) */}
            <div className={`mobile-nav-overlay ${mobileNavOpen ? 'active' : ''}`} onClick={() => setMobileNavOpen(false)}></div>
            <div className={`mobile-nav ${mobileNavOpen ? 'active' : ''}`}>
                <div className="mobile-nav-header">
                    <ApplicationLogo />
                    <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <ul className="mobile-nav-list">
                    <li><Link href={route('home')} onClick={() => setMobileNavOpen(false)}>Home</Link></li>
                    <li><Link href={route('category.show', 'dry-fruits')} onClick={() => setMobileNavOpen(false)}>Dry Fruits</Link></li>
                    <li><Link href={route('category.show', 'dates')} onClick={() => setMobileNavOpen(false)}>Dates</Link></li>
                    <li><Link href={route('category.show', 'berries')} onClick={() => setMobileNavOpen(false)}>Berries</Link></li>
                    <li><Link href={route('category.show', 'seeds')} onClick={() => setMobileNavOpen(false)}>Seeds & More</Link></li>
                    <li><Link href={route('category.show', 'gift-boxes')} onClick={() => setMobileNavOpen(false)}>Gift Boxes</Link></li>
                    <li><Link href={route('about')} onClick={() => setMobileNavOpen(false)}>About</Link></li>
                    <li><Link href={route('bulk-order')} onClick={() => setMobileNavOpen(false)}>Bulk Order</Link></li>
                    <li><Link href={route('contact')} onClick={() => setMobileNavOpen(false)}>Contact</Link></li>
                </ul>
                <div className="mobile-nav-footer">
                    {auth.user ? (
                        <>
                            <Link href={route('dashboard')}><i className="fas fa-user"></i> My Account</Link>
                            <Link href={route('orders.index')}><i className="fas fa-box"></i> My Orders</Link>
                            <Link href={route('logout')} method="post" as="button"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')}><i className="fas fa-sign-in-alt"></i> Login</Link>
                            <Link href={route('register')}><i className="fas fa-user-plus"></i> Register</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Shop Bottom Sheet */}
            <div className={`shop-sheet-overlay ${shopSheetOpen ? 'active' : ''}`} onClick={() => setShopSheetOpen(false)} />
            <div className={`shop-sheet ${shopSheetOpen ? 'active' : ''}`}>
                <div className="shop-sheet-handle" onClick={() => setShopSheetOpen(false)}>
                    <div className="shop-sheet-bar" />
                </div>
                <div className="shop-sheet-header">
                    <h3>Shop by Category</h3>
                    <button className="shop-sheet-close" onClick={() => setShopSheetOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="shop-sheet-grid">
                    {shopCategories.map(cat => (
                        <Link
                            key={cat.slug}
                            href={route('category.show', cat.slug)}
                            className="shop-sheet-item"
                            onClick={() => setShopSheetOpen(false)}
                        >
                            <div className="shop-sheet-icon" style={{ background: cat.color + '15', color: cat.color }}>
                                <i className={cat.icon}></i>
                            </div>
                            <span>{cat.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="shop-sheet-links">
                    <Link href={route('about')} onClick={() => setShopSheetOpen(false)}>
                        <i className="fas fa-info-circle"></i> About Us
                    </Link>
                    <Link href={route('bulk-order')} onClick={() => setShopSheetOpen(false)}>
                        <i className="fas fa-truck"></i> Bulk Orders
                    </Link>
                    <Link href={route('contact')} onClick={() => setShopSheetOpen(false)}>
                        <i className="fas fa-headset"></i> Contact Us
                    </Link>
                    <Link href={route('careers')} onClick={() => setShopSheetOpen(false)}>
                        <i className="fas fa-briefcase"></i> Careers
                    </Link>
                </div>
            </div>

            {/* Search Overlay */}
            <div className={`search-overlay ${searchOpen ? 'active' : ''}`}>
                <button className="search-close" onClick={() => setSearchOpen(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="search-overlay-inner">
                    <h3>What are you looking for?</h3>
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search for dry fruits, dates, gift boxes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus={searchOpen}
                        />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
            </div>

            {/* Flash Messages */}
            {flash?.success && (
                <div style={{background: '#dcfce7', color: '#166534', padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 500}}>
                    <i className="fas fa-check-circle" style={{marginRight: '8px'}}></i>{flash.success}
                </div>
            )}
            {flash?.error && (
                <div style={{background: '#fef2f2', color: '#991b1b', padding: '12px 20px', textAlign: 'center', fontSize: '14px', fontWeight: 500}}>
                    <i className="fas fa-exclamation-circle" style={{marginRight: '8px'}}></i>{flash.error}
                </div>
            )}

            {/* Main Content */}
            <main className="app-main">{children}</main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-about">
                            <div className="footer-logo" style={{ marginBottom: '16px' }}>
                                <ApplicationLogo white />
                            </div>
                            <p>Where Freshness Meets Luxury. Premium quality dry fruits, dates, berries, and seeds sourced directly from the finest farms across the world.</p>
                            <div className="footer-social">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h3>Quick Links</h3>
                            <ul className="footer-links">
                                <li><Link href={route('home')}><i className="fas fa-chevron-right"></i> Home</Link></li>
                                <li><Link href={route('about')}><i className="fas fa-chevron-right"></i> About Us</Link></li>
                                <li><Link href={route('contact')}><i className="fas fa-chevron-right"></i> Contact</Link></li>
                                <li><Link href={route('bulk-order')}><i className="fas fa-chevron-right"></i> Bulk Orders</Link></li>
                                <li><Link href={route('careers')}><i className="fas fa-chevron-right"></i> Careers</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Categories</h3>
                            <ul className="footer-links">
                                <li><Link href={route('category.show', 'dry-fruits')}><i className="fas fa-chevron-right"></i> Dry Fruits</Link></li>
                                <li><Link href={route('category.show', 'dates')}><i className="fas fa-chevron-right"></i> Dates</Link></li>
                                <li><Link href={route('category.show', 'berries')}><i className="fas fa-chevron-right"></i> Berries</Link></li>
                                <li><Link href={route('category.show', 'seeds')}><i className="fas fa-chevron-right"></i> Seeds & More</Link></li>
                                <li><Link href={route('category.show', 'gift-boxes')}><i className="fas fa-chevron-right"></i> Gift Boxes</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Policies</h3>
                            <ul className="footer-links">
                                <li><Link href={route('privacy')}><i className="fas fa-chevron-right"></i> Privacy Policy</Link></li>
                                <li><Link href={route('terms')}><i className="fas fa-chevron-right"></i> Terms & Conditions</Link></li>
                                <li><Link href={route('refund-policy')}><i className="fas fa-chevron-right"></i> Refund Policy</Link></li>
                                <li><Link href={route('shipping')}><i className="fas fa-chevron-right"></i> Shipping Policy</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Contact Us</h3>
                            <ul className="footer-contact">
                                <li><i className="fas fa-map-marker-alt"></i> <span>123 Market Street, Hyderabad, Telangana 500001</span></li>
                                <li><i className="fas fa-phone-alt"></i> <a href="tel:+919876543210">+91 98765 43210</a></li>
                                <li><i className="fas fa-envelope"></i> <a href="mailto:info@nammanuts.com">info@nammanuts.com</a></li>
                                <li><i className="fas fa-clock"></i> <span>Mon - Sat: 9:00 AM - 9:00 PM</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="footer-bottom-inner">
                            <p>&copy; {new Date().getFullYear()} Namma Nuts. All rights reserved.</p>
                            <div className="payment-icons">
                                <i className="fab fa-cc-visa"></i>
                                <i className="fab fa-cc-mastercard"></i>
                                <i className="fab fa-cc-amex"></i>
                                <i className="fab fa-google-pay"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Float */}
            <a href="https://wa.me/919876543210" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                <span className="whatsapp-tooltip">Chat with us!</span>
            </a>

            {/* Mobile Bottom Tab Bar */}
            <nav className="mobile-tab-bar">
                <Link href={route('home')} className={`tab-item ${isHome ? 'active' : ''}`}>
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </Link>
                <button className={`tab-item ${shopSheetOpen ? 'active' : ''}`} onClick={() => setShopSheetOpen(true)}>
                    <i className="fas fa-th-large"></i>
                    <span>Shop</span>
                </button>
                <button className="tab-item tab-search" onClick={() => setSearchOpen(true)}>
                    <div className="tab-search-btn">
                        <i className="fas fa-search"></i>
                    </div>
                </button>
                <Link href={route('cart.index')} className={`tab-item ${isCart ? 'active' : ''}`}>
                    <div className="tab-cart-wrap">
                        <i className="fas fa-shopping-bag"></i>
                        {cartCount > 0 && <span className="tab-cart-badge">{cartCount}</span>}
                    </div>
                    <span>Cart</span>
                </Link>
                <Link href={auth.user ? route('dashboard') : route('login')} className={`tab-item ${isAccount ? 'active' : ''}`}>
                    <i className="fas fa-user"></i>
                    <span>Account</span>
                </Link>
            </nav>
        </>
    );
}
