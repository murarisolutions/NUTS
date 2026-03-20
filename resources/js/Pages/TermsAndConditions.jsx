import StoreLayout from '@/Layouts/StoreLayout';
import { Head } from '@inertiajs/react';

export default function TermsAndConditions() {
    return (
        <StoreLayout>
            <Head title="Terms and Conditions" />

            <section className="page-banner">
                <div className="container">
                    <h1>Terms and Conditions</h1>
                    <p>Please read these terms carefully before using our services</p>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>
                            <strong>Last Updated:</strong> 1st January 2025
                        </p>

                        <p>
                            These Terms and Conditions ("Terms") govern your use of the website <strong>nammanuts.com</strong> and the purchase of products from Namma Nuts ("we", "our", or "us"). By accessing our website or placing an order, you agree to be bound by these Terms. These Terms are governed by the Consumer Protection Act, 2019, and the Consumer Protection (E-Commerce) Rules, 2020.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>1. Eligibility</h2>
                        <p>
                            By using our website, you represent that you are at least 18 years of age or are accessing the website under the supervision of a parent or guardian. You must have the legal capacity to enter into a binding contract under the Indian Contract Act, 1872.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>2. Account Registration</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                            <li>You must provide accurate and complete information during registration</li>
                            <li>You are responsible for all activities that occur under your account</li>
                            <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>3. Products & Pricing</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>All prices are listed in Indian Rupees (INR) and are inclusive of applicable GST</li>
                            <li>Product images are for illustrative purposes; actual products may vary slightly in appearance</li>
                            <li>We reserve the right to modify prices at any time without prior notice</li>
                            <li>Prices at the time of order placement will be honoured for that order</li>
                            <li>We make every effort to display accurate product descriptions, weights, and nutritional information</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>4. Allergen Warning</h2>
                        <div style={{ background: '#fef3cd', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ffc107' }}>
                            <p style={{ margin: 0, fontWeight: '600' }}>
                                <strong>Important:</strong> Our products contain tree nuts, peanuts, sesame seeds, and other allergens. All products are processed in a facility that handles multiple types of nuts and seeds. If you have a nut allergy or any food allergy, please consult your physician before purchasing our products. We are not liable for allergic reactions resulting from the consumption of our products.
                            </p>
                        </div>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>5. Orders & Payment</h2>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Placing an order constitutes an offer to purchase; order confirmation constitutes our acceptance</li>
                            <li>We reserve the right to refuse or cancel any order for reasons including product unavailability, pricing errors, or suspected fraud</li>
                            <li>We accept payments via UPI, credit/debit cards, net banking, digital wallets, and Cash on Delivery (COD) where available</li>
                            <li>All online payments are processed securely through certified third-party payment gateways</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>6. FSSAI Compliance</h2>
                        <p>
                            All our food products comply with the Food Safety and Standards Act, 2006 and regulations thereunder. Our products are sourced from FSSAI-licensed suppliers, and we maintain all required food safety certifications. Product packaging includes FSSAI license numbers, manufacturing/expiry dates, and nutritional information as mandated by law.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>7. Intellectual Property</h2>
                        <p>
                            All content on this website—including text, graphics, logos, images, product descriptions, and software—is the property of Namma Nuts or its content suppliers and is protected by Indian copyright and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>8. User Conduct</h2>
                        <p>You agree not to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Use the website for any unlawful purpose</li>
                            <li>Attempt to gain unauthorised access to our systems or data</li>
                            <li>Submit false or misleading information</li>
                            <li>Interfere with the proper functioning of the website</li>
                            <li>Use automated systems (bots, scrapers) to access the website</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>9. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by Indian law, Namma Nuts shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability for any claim shall not exceed the amount paid by you for the specific order giving rise to the claim.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>10. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless Namma Nuts, its officers, directors, employees, and agents from any claims, losses, damages, liabilities, or expenses arising from your use of the website, violation of these Terms, or infringement of any third-party rights.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>11. Dispute Resolution</h2>
                        <p>
                            Any disputes arising from these Terms or your use of our services shall first be attempted to be resolved through amicable negotiation. If unresolved, disputes shall be subject to arbitration in accordance with the Arbitration and Conciliation Act, 1996, with the seat of arbitration in Hyderabad, Telangana.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>12. Governing Law & Jurisdiction</h2>
                        <p>
                            These Terms are governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>13. Changes to Terms</h2>
                        <p>
                            We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our website after changes constitutes acceptance of the updated Terms.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>14. Contact Us</h2>
                        <p>For any questions regarding these Terms, please contact us:</p>
                        <div style={{ background: '#f9f5ef', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <p style={{ margin: '0.25rem 0' }}><strong>Namma Nuts</strong></p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Email:</strong> info@nammanuts.com</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Phone:</strong> +91 98765 43210</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Address:</strong> 123 Market Street, Hyderabad, Telangana 500001</p>
                        </div>
                    </div>
                </div>
            </section>
        </StoreLayout>
    );
}
