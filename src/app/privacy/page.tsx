import Header from "@/components/layout/Header";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Steal My Prompts - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-text/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-invert max-w-none space-y-6 text-text/80">
                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Steal My Prompts ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                            This privacy policy explains how we collect, use, and safeguard your information when you visit our website stealmyprompts.ai.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">2. Information We Collect</h2>
                        <h3 className="text-xl font-semibold text-text mb-2">2.1 Information You Provide</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> When you create an account via Clerk authentication, we collect your email address, username, and profile information.</li>
                            <li><strong>User-Generated Content:</strong> Prompts, storyboards, and other content you submit to our platform.</li>
                            <li><strong>Profile Data:</strong> Avatar images, bio, and other profile customizations.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-text mb-2 mt-4">2.2 Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Analytics Data:</strong> We use Google Analytics to collect information about your visit, including pages viewed, time spent, and referring sites.</li>
                            <li><strong>Cookies:</strong> We use cookies for authentication, preferences, and analytics. See our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for details.</li>
                            <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide and maintain our service</li>
                            <li>To authenticate and manage your account</li>
                            <li>To display your content and profile to other users</li>
                            <li>To improve our website and user experience</li>
                            <li>To communicate with you about updates and features</li>
                            <li>To analyze usage patterns and trends</li>
                            <li>To prevent fraud and ensure security</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">4. Data Sharing and Disclosure</h2>
                        <p>We do not sell your personal data. We may share your information with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Service Providers:</strong> Clerk (authentication), Google Analytics (analytics), Cloudflare R2 (file storage)</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Public Content:</strong> Your prompts and profile information are publicly visible on our platform</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">5. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Export your data</li>
                            <li>Withdraw consent for cookies and analytics</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">6. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your data, including encryption,
                            secure authentication via Clerk, and regular security audits. However, no method of transmission over the internet
                            is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">7. Children's Privacy</h2>
                        <p>
                            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                            If you believe we have collected such information, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">8. Changes to This Policy</h2>
                        <p>
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page
                            and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">9. Contact Us</h2>
                        <p>
                            If you have questions about this privacy policy or our data practices, please contact us at:{" "}
                            <a href="mailto:privacy@stealmyprompts.ai" className="text-primary hover:underline">
                                privacy@stealmyprompts.ai
                            </a>
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-accent-light">
                    <Link href="/" className="text-primary hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
