import StoreLayout from '@/Layouts/StoreLayout';
import { Head } from '@inertiajs/react';

export default function RefundPolicy() {
    return (
        <StoreLayout>
            <Head title="Refund & Return Policy" />

            <section className="page-banner">
                <div className="container">
                    <h1>Refund & Return Policy</h1>
                    <p>We want you to be completely satisfied with your purchase</p>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>
                            <strong>Last Updated:</strong> 1st January 2025
                        </p>

                        <p>
                            At Namma Nuts, we strive to deliver the highest quality dry fruits and nuts. If you are not satisfied with your purchase, please review our refund and return policy below. This policy is in compliance with the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>1. Return Window</h2>
                        <p>
                            You may request a return within <strong>7 days</strong> of delivery. The return request must be initiated through your account on our website or by contacting our customer support team.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>2. Eligible Conditions for Return</h2>
                        <p>Returns are accepted under the following conditions:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Product received is damaged, broken, or crushed during transit</li>
                            <li>Wrong product delivered (different from what was ordered)</li>
                            <li>Product is stale, rancid, or has an off-taste/odour upon opening</li>
                            <li>Product received past its expiry/best-before date</li>
                            <li>Significant quantity shortfall (more than 10% less than stated weight)</li>
                            <li>Packaging seal is broken or tampered with upon delivery</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>3. Non-Returnable Items</h2>
                        <div style={{ background: '#fef3cd', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ffc107' }}>
                            <p style={{ margin: 0 }}>The following items cannot be returned:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: 0, marginTop: '0.5rem' }}>
                                <li>Products opened and partially consumed (unless quality issues are reported within 48 hours of delivery with photographic evidence)</li>
                                <li>Products not stored as per recommended storage instructions after delivery</li>
                                <li>Gift boxes and customised hampers (unless damaged during transit)</li>
                                <li>Products purchased during clearance or final sale</li>
                                <li>Returns requested after the 7-day return window</li>
                            </ul>
                        </div>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>4. Perishable Goods Disclaimer</h2>
                        <p>
                            Dry fruits and nuts are perishable food items. While we ensure optimal packaging to maintain freshness, the shelf life of products depends on proper storage after delivery. Please store products in a cool, dry place in airtight containers. We recommend refrigeration for certain products as indicated on the packaging. We cannot accept returns for products that have deteriorated due to improper storage by the customer.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>5. How to Initiate a Return</h2>
                        <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Log in to your account and navigate to "My Orders"</li>
                            <li>Select the order and click "Request Refund"</li>
                            <li>Provide the reason for return and upload photographs of the product/packaging</li>
                            <li>Our team will review your request within 24-48 hours</li>
                            <li>If approved, we will arrange for product pickup or provide return shipping instructions</li>
                        </ol>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>6. Refund Process</h2>
                        <p>Once your return is approved and received:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li><strong>Online Payments (UPI/Cards/Net Banking):</strong> Refund will be credited to the original payment method within 7-10 business days</li>
                            <li><strong>Cash on Delivery (COD):</strong> Refund will be processed via bank transfer (NEFT/IMPS). You will need to provide your bank account details</li>
                            <li><strong>Wallet Payments:</strong> Refund will be credited back to the respective wallet within 5-7 business days</li>
                        </ul>
                        <p>
                            Shipping charges are non-refundable unless the return is due to our error (wrong product, damaged in transit, or quality issues).
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>7. Exchange Policy</h2>
                        <p>
                            We offer exchanges for damaged or wrong products, subject to stock availability. If the same product is unavailable, we will process a full refund. Exchange requests follow the same 7-day window and process as returns.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>8. Cancellation Policy</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li><strong>Before Shipping:</strong> Orders can be cancelled free of charge before they are dispatched. A full refund will be processed</li>
                            <li><strong>After Shipping:</strong> Orders that have already been dispatched cannot be cancelled. You may initiate a return after delivery</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>9. Contact Us</h2>
                        <p>For return or refund queries, please reach out to us:</p>
                        <div style={{ background: '#f9f5ef', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <p style={{ margin: '0.25rem 0' }}><strong>Namma Nuts Customer Support</strong></p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Email:</strong> info@nammanuts.com</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Phone:</strong> +91 98765 43210</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Hours:</strong> Monday - Saturday, 9:00 AM - 9:00 PM IST</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Address:</strong> 123 Market Street, Hyderabad, Telangana 500001</p>
                        </div>
                    </div>
                </div>
            </section>
        </StoreLayout>
    );
}
