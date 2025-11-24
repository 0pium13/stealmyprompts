import Header from "@/components/layout/Header";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service",
    description: "Terms of Service for Steal My Prompts - User agreements, content ownership, and usage rules.",
};

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-text/60 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-invert max-w-none space-y-6 text-text/80">
                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using Steal My Prompts ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement.
                            If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">2. Description of Service</h2>
                        <p>
                            Steal My Prompts is a platform for discovering, sharing, and creating AI prompts and storyboards.
                            We provide tools for users to submit, browse, and interact with AI-generated content and prompts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">3. User Accounts</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You must be at least 13 years old to create an account</li>
                            <li>You are responsible for maintaining the security of your account</li>
                            <li>You are responsible for all activities that occur under your account</li>
                            <li>You must provide accurate and complete information when creating an account</li>
                            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">4. User Content</h2>
                        <h3 className="text-xl font-semibold text-text mb-2">4.1 Content Ownership</h3>
                        <p>
                            You retain all rights to the content you submit to the Service. By submitting content, you grant us a worldwide,
                            non-exclusive, royalty-free license to use, display, reproduce, and distribute your content on the Service.
                        </p>

                        <h3 className="text-xl font-semibold text-text mb-2 mt-4">4.2 Content Guidelines</h3>
                        <p>You agree not to submit content that:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Violates any laws or regulations</li>
                            <li>Infringes on intellectual property rights of others</li>
                            <li>Contains hate speech, harassment, or discriminatory content</li>
                            <li>Contains explicit sexual content or violence</li>
                            <li>Promotes illegal activities</li>
                            <li>Contains spam or malicious code</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-text mb-2 mt-4">4.3 Content Moderation</h3>
                        <p>
                            We reserve the right to review, moderate, and remove any content that violates these terms.
                            All submitted prompts are subject to admin approval before being published.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">5. Acceptable Use</h2>
                        <p>You agree not to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Use the Service for any illegal purpose</li>
                            <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Use automated tools to scrape or collect data from the Service</li>
                            <li>Impersonate another person or entity</li>
                            <li>Harass, abuse, or harm other users</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">6. Intellectual Property</h2>
                        <p>
                            The Service and its original content (excluding user-submitted content), features, and functionality are owned by
                            Steal My Prompts and are protected by international copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">7. Disclaimer of Warranties</h2>
                        <p>
                            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                            WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">8. Limitation of Liability</h2>
                        <p>
                            IN NO EVENT SHALL STEAL MY PROMPTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
                            ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">9. Termination</h2>
                        <p>
                            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability,
                            for any reason, including if you breach these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">10. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. We will notify users of any material changes by posting
                            the new Terms of Service on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">11. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                            Steal My Prompts operates, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-text mb-4">12. Contact Us</h2>
                        <p>
                            If you have questions about these Terms of Service, please contact us at:{" "}
                            <a href="mailto:legal@stealmyprompts.ai" className="text-primary hover:underline">
                                legal@stealmyprompts.ai
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
