import { Head, Link, router } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';
import ProductCard from '@/Components/ProductCard';

export default function Search({ products, query }) {
    return (
        <StoreLayout>
            <Head title={`Search Results for "${query}"`} />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Search Results</h1>
                    <p>
                        <Link href={route('home')}>Home</Link> / Search
                    </p>
                </div>
            </section>

            {/* Results Section */}
            <section className="section">
                <div className="container">
                    <div className="results-count">
                        {products.data.length > 0 ? (
                            <p>
                                Showing {products.data.length} result{products.data.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
                            </p>
                        ) : (
                            <p>No results found for "<strong>{query}</strong>"</p>
                        )}
                    </div>

                    {products.data.length > 0 ? (
                        <>
                            <div className="products-grid">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.links && products.links.length > 3 && (
                                <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', flexWrap: 'wrap' }}>
                                    {products.links.map((link, index) => (
                                        <button
                                            key={index}
                                            className={`pagination-link ${link.active ? 'active' : ''}`}
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url, {}, { preserveScroll: true });
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            style={{
                                                padding: '8px 14px',
                                                border: '1px solid #ddd',
                                                borderRadius: '6px',
                                                background: link.active ? '#2d6a4f' : '#fff',
                                                color: link.active ? '#fff' : '#333',
                                                cursor: link.url ? 'pointer' : 'not-allowed',
                                                opacity: link.url ? 1 : 0.5,
                                                fontSize: '14px',
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <i className="fas fa-search" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px', display: 'block' }}></i>
                            <h3>No products found</h3>
                            <p style={{ color: '#666', marginTop: '10px', marginBottom: '24px' }}>
                                We couldn't find any products matching your search. Try different keywords or browse our categories.
                            </p>
                            <Link href={route('home')} className="btn btn-primary">
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </StoreLayout>
    );
}
