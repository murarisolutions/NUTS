import { Head, Link, router } from '@inertiajs/react';
import StoreLayout from '@/Layouts/StoreLayout';
import ProductCard from '@/Components/ProductCard';

export default function CategoryProducts({ category, products, subCategories, filters }) {
    const applyFilter = (key, value) => {
        const newFilters = { ...filters, [key]: value };

        // Remove empty filter values
        Object.keys(newFilters).forEach((k) => {
            if (newFilters[k] === '' || newFilters[k] === null || newFilters[k] === undefined) {
                delete newFilters[k];
            }
        });

        router.get(route('category.show', category.slug), newFilters, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <StoreLayout>
            <Head title={category.name} />

            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <div className="container">
                    <ul className="breadcrumb-list">
                        <li><Link href={route('home')}>Home</Link></li>
                        <li>{category.name}</li>
                    </ul>
                </div>
            </nav>

            {/* Collection Header */}
            <section className="collection-header">
                <div className="container">
                    <h1>{category.name}</h1>
                    {category.description && <p>{category.description}</p>}
                </div>
            </section>

            {/* Collection Filters */}
            <section className="collection-filters">
                <div className="container">
                    {/* Subcategory Pills */}
                    {subCategories && subCategories.length > 0 && (
                        <div className="filter-group">
                            <button
                                className={`filter-pill ${!filters.sub_category ? 'active' : ''}`}
                                onClick={() => applyFilter('sub_category', '')}
                            >
                                All
                            </button>
                            {subCategories.map((sub) => (
                                <button
                                    key={sub}
                                    className={`filter-pill ${filters.sub_category === sub ? 'active' : ''}`}
                                    onClick={() => applyFilter('sub_category', sub)}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Sort Dropdown */}
                    <div className="filter-group">
                        <select
                            className="filter-select"
                            value={filters.sort || ''}
                            onChange={(e) => applyFilter('sort', e.target.value)}
                        >
                            <option value="">Sort By</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="name_asc">Name: A to Z</option>
                            <option value="name_desc">Name: Z to A</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="section">
                <div className="container">
                    {products.data.length > 0 ? (
                        <div className="products-grid">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <h3>No products found</h3>
                            <p style={{ color: '#666', marginTop: '10px' }}>
                                Try adjusting your filters or browse other categories.
                            </p>
                        </div>
                    )}

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
                </div>
            </section>
        </StoreLayout>
    );
}
