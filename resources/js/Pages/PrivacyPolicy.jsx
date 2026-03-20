import StoreLayout from '@/Layouts/StoreLayout';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <StoreLayout>
            <Head title="Privacy Policy" />

            <section className="page-banner">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p>Your privacy is important to us</p>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>
                            <strong>Last Updated:</strong> 1st January 2025
                        </p>

                        <p>
                            Namma Nuts ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>nammanuts.com</strong> and use our services. This policy complies with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDPA).
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>1. Information We Collect</h2>

                        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#555' }}>1.1 Personal Information</h3>
                        <p>When you create an account, place an order, or contact us, we may collect:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Shipping and billing address</li>
                            <li>Payment information (processed securely via third-party payment gateways)</li>
                        </ul>

                        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#555' }}>1.2 Automatically Collected Information</h3>
                        <p>When you browse our website, we automatically collect:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>IP address and browser type</li>
                            <li>Device information and operating system</li>
                            <li>Pages visited and time spent on our website</li>
                            <li>Referring website URLs</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>2. How We Use Your Information</h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Processing and fulfilling your orders</li>
                            <li>Managing your account and providing customer support</li>
                            <li>Sending order confirmations, shipping updates, and delivery notifications</li>
                            <li>Sending promotional emails and newsletters (with your consent)</li>
                            <li>Improving our website, products, and services</li>
                            <li>Preventing fraud and ensuring security</li>
                            <li>Complying with legal obligations under Indian law</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>3. Cookies & Tracking Technologies</h2>
                        <p>
                            We use cookies and similar technologies to enhance your browsing experience. Cookies are small data files stored on your device. We use:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li><strong>Essential Cookies:</strong> Required for website functionality (login sessions, cart items)</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                        </ul>
                        <p>
                            You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>4. Data Sharing & Disclosure</h2>
                        <p>We do not sell your personal data. We may share your information with:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li><strong>Payment Processors:</strong> Razorpay, UPI providers, and other payment gateways for transaction processing</li>
                            <li><strong>Shipping Partners:</strong> Logistics companies for order delivery</li>
                            <li><strong>Service Providers:</strong> Email service providers, analytics tools, and hosting services (DigitalOcean)</li>
                            <li><strong>Legal Authorities:</strong> When required by law, court order, or government regulation</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>5. Data Security</h2>
                        <p>
                            We implement reasonable security practices and procedures as mandated by the IT Act, 2000. This includes encryption of sensitive data, secure payment processing through certified gateways, regular security audits, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>6. Data Retention</h2>
                        <p>
                            We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, comply with our legal obligations (including tax and accounting requirements under Indian law), resolve disputes, and enforce our agreements. Order-related data is retained for a minimum of 8 years as required by Indian tax regulations.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>7. Your Rights (Under DPDPA 2023)</h2>
                        <p>As a data principal under the Digital Personal Data Protection Act, 2023, you have the right to:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li><strong>Access:</strong> Request information about the personal data we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong>Erasure:</strong> Request deletion of your personal data, subject to legal retention requirements</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw your consent for data processing at any time</li>
                            <li><strong>Grievance Redressal:</strong> Lodge a complaint with our Grievance Officer or the Data Protection Board of India</li>
                        </ul>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>8. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites (payment gateways, social media platforms). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>9. Children's Privacy</h2>
                        <p>
                            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have collected data from a minor without parental consent, we will take steps to delete it.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
                        </p>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>11. Grievance Officer</h2>
                        <p>
                            In accordance with the Information Technology Act, 2000 and the DPDPA 2023, the details of the Grievance Officer are as follows:
                        </p>
                        <div style={{ background: '#f9f5ef', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <p style={{ margin: '0.25rem 0' }}><strong>Grievance Officer:</strong> Namma Nuts Customer Support</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Email:</strong> info@nammanuts.com</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Phone:</strong> +91 98765 43210</p>
                            <p style={{ margin: '0.25rem 0' }}><strong>Address:</strong> 123 Market Street, Hyderabad, Telangana 500001</p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                                The Grievance Officer shall address your concerns within 30 days of receipt of the grievance.
                            </p>
                        </div>

                        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>12. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li><strong>Email:</strong> info@nammanuts.com</li>
                            <li><strong>Phone:</strong> +91 98765 43210</li>
                            <li><strong>Address:</strong> 123 Market Street, Hyderabad, Telangana 500001</li>
                        </ul>
                    </div>
                </div>
            </section>
        </StoreLayout>
    );
}
