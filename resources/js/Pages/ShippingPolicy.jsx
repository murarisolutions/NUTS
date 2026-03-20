import StoreLayout from '@/Layouts/StoreLayout';
import { Head } from '@inertiajs/react';

export default function ShippingPolicy() {
    return (
        <StoreLayout>
            <Head title="Shipping Policy" />

            <section className="page-banner">
                <div className="container">
                    <h1>Shipping Policy</h1>
                    <p>Everything you need to know about our delivery process</p>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>
                            <strong>Last Updated:</strong> 1st January 2025
                        </p>

                        <p>
                            At Namma Nuts, we are committed to delivering your premium dry fruits and nuts in perfect condition. Please review our shipping policy below for details on delivery areas, timeframes, charges, and more.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>1. Delivery Areas</h2>
                        <p>
                            We currently deliver across India. We ship to all major cities and towns served by our logistics partners. For remote or hard-to-reach areas, delivery may take additional time. We do not currently offer international shipping.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>2. Shipping Charges</h2>
                        <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '8px', border: '1px solid #86efac', marginBottom: '1rem' }}>
                            <p style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem' }}>
                                Free shipping on all orders above ₹999!
                            </p>
                        </div>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li><strong>Orders above ₹999:</strong> Free standard shipping across India</li>
                            <li><strong>Orders below ₹999:</strong> Flat ₹49 shipping charge</li>
                            <li><strong>Express Delivery:</strong> Additional ₹99 (available for select cities)</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>3. Estimated Delivery Timeframes</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                                <thead>
                                    <tr style={{ background: '#f9f5ef' }}>
                                        <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Shipping Method</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Metro Cities</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Other Cities</th>
                                        <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Remote Areas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Standard</td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>3-5 business days</td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>5-7 business days</td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>7-10 business days</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Express</td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>1-2 business days</td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>2-3 business days</td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>Not available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                            * Delivery times are estimates and may vary due to weather, festivals, or unforeseen circumstances. Business days exclude Sundays and public holidays.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>4. Packaging</h2>
                        <p>
                            We take special care in packaging to ensure your dry fruits arrive fresh and intact:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Food-grade, airtight sealed pouches to maintain freshness</li>
                            <li>Cushioned outer packaging to prevent damage during transit</li>
                            <li>Temperature-sensitive products are packed with appropriate insulation</li>
                            <li>Gift boxes are carefully wrapped with additional protective layers</li>
                            <li>All packaging complies with FSSAI labelling requirements</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>5. Order Tracking</h2>
                        <p>
                            Once your order is dispatched, you will receive a shipping confirmation email and SMS with a tracking number. You can track your order through:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Your account dashboard under "My Orders"</li>
                            <li>The tracking link sent via email/SMS</li>
                            <li>Contacting our customer support team</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>6. Failed Delivery</h2>
                        <p>
                            If delivery is unsuccessful due to incorrect address, recipient unavailability, or refusal to accept:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Our delivery partner will attempt delivery up to 2 additional times</li>
                            <li>After 3 failed attempts, the order will be returned to our warehouse</li>
                            <li>For returned orders, we will contact you to arrange re-delivery (additional shipping charges may apply) or process a refund minus shipping costs</li>
                            <li>We are not responsible for delays caused by incorrect or incomplete address information provided by the customer</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>7. Cash on Delivery (COD)</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>COD is available for orders up to ₹5,000</li>
                            <li>COD is available for select pin codes only (availability shown at checkout)</li>
                            <li>Please keep the exact amount ready at the time of delivery</li>
                            <li>Our delivery partner may verify your identity via OTP before handing over the package</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>8. Order Processing</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Orders placed before 2:00 PM IST are processed the same business day</li>
                            <li>Orders placed after 2:00 PM IST or on Sundays/holidays are processed the next business day</li>
                            <li>During festive seasons (Diwali, Christmas, New Year), processing and delivery may take longer due to high order volumes</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>9. Damaged in Transit</h2>
                        <p>
                            If your order arrives damaged, please do not accept the delivery or note the damage on the delivery receipt. Contact us within 48 hours with photographs of the damaged packaging and products. We will arrange a replacement or full refund at no additional cost to you.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>10. Contact Us</h2>
                        <p>For shipping-related queries, please reach out to us:</p>
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
