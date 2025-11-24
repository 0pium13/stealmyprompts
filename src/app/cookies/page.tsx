import Header from "@/components/layout/Header";
import Link from "next/link";

export const metadata = {
    title: "Cookie Policy",
    description: "Cookie Policy for Steal My Prompts - Learn about the cookies we use and why.",
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                <p className="text-text/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-invert max-w-none space-y-6 text-text/80">
                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">1. What Are Cookies</h2>
                        <p>
                            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites
                            work more efficiently and provide information to website owners.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">2. How We Use Cookies</h2>
                        <p>We use cookies for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for the website to function properly (authentication, security)</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">3. Types of Cookies We Use</h2>

                        <h3 className="text-xl font-semibold text-text mb-2">3.1 Essential Cookies</h3>
                        <div className="bg-surface border border-accent-light rounded-lg p-4 mb-4">
                            <p className="font-semibold mb-2">Clerk Authentication Cookies</p>
                            <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Purpose:</strong> Manage user authentication and sessions</li>
                                <li><strong>Duration:</strong> Session / Persistent</li>
                                <li><strong>Provider:</strong> Clerk.com</li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-semibold text-text mb-2 mt-4">3.2 Analytics Cookies</h3>
                        <div className="bg-surface border border-accent-light rounded-lg p-4 mb-4">
                            <p className="font-semibold mb-2">Google Analytics (_ga, _gid, _gat)</p>
                            <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Purpose:</strong> Track website usage and visitor behavior</li>
                                <li><strong>Duration:</strong> 2 years (_ga), 24 hours (_gid), 1 minute (_gat)</li>
                                <li><strong>Provider:</strong> Google LLC</li>
                                <li><strong>Opt-out:</strong> You can decline these cookies via our cookie consent banner</li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-semibold text-text mb-2 mt-4">3.3 Preference Cookies</h3>
                        <div className="bg-surface border border-accent-light rounded-lg p-4 mb-4">
                            <p className="font-semibold mb-2">Cookie Consent (cookie-consent)</p>
                            <ul className="list-disc pl-6 space-y-1 text-sm">
                                <li><strong>Purpose:</strong> Remember your cookie preferences</li>
                                <li><strong>Duration:</strong> 1 year</li>
                                <li><strong>Provider:</strong> Steal My Prompts (First-party)</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">4. Managing Cookies</h2>
                        <p>You have several options for managing cookies:</p>

                        <h3 className="text-xl font-semibold text-text mb-2 mt-4">4.1 Cookie Consent Banner</h3>
                        <p>
                            When you first visit our website, you'll see a cookie consent banner where you can accept or decline non-essential cookies.
                            You can change your preferences at any time by clearing your browser's local storage and refreshing the page.
                        </p>

                        <h3 className="text-xl font-semibold text-text mb-2 mt-4">4.2 Browser Settings</h3>
                        <p>
                            Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or
                            delete certain cookies. However, blocking all cookies may impact your ability to use certain features of our website.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edge</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">5. Third-Party Cookies</h2>
                        <p>
                            Some cookies on our website are set by third-party services we use:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                            <li><strong>Clerk:</strong> For user authentication and account management</li>
                        </ul>
                        <p className="mt-2">
                            These third parties have their own privacy policies. We recommend reviewing them:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a></li>
                            <li><a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Clerk Privacy Policy</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">6. Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons.
                            We will post any changes on this page and update the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">7. Contact Us</h2>
                        <p>
                            If you have questions about our use of cookies, please contact us at:{" "}
                            <a href="mailto:privacy@stealmyprompts.ai" className="text-primary hover:underline">
                                privacy@stealmyprompts.ai
                            </a>
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-accent-light flex justify-between items-center">
                    <Link href="/" className="text-primary hover:underline">
                        ← Back to Home
                    </Link>
                    <Link href="/privacy" className="text-primary hover:underline">
                        View Privacy Policy →
                    </Link>
                </div>
            </div>
        </main>
    );
}
