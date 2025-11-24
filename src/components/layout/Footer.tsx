import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-accent-light bg-surface mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-bold text-text mb-3">Steal My Prompts</h3>
                        <p className="text-sm text-text/60">
                            Discover and steal the prompts behind AI masterpieces. From storyboard to screen.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-text mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/prompts" className="text-text/60 hover:text-primary transition-colors">
                                    Browse Prompts
                                </Link>
                            </li>
                            <li>
                                <Link href="/storyboards" className="text-text/60 hover:text-primary transition-colors">
                                    Storyboards
                                </Link>
                            </li>
                            <li>
                                <Link href="/submit" className="text-text/60 hover:text-primary transition-colors">
                                    Submit Prompt
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold text-text mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-text/60 hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-text/60 hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-text/60 hover:text-primary transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-text mb-3">Contact</h3>
                        <ul className="space-y-2 text-sm text-text/60">
                            <li>
                                <a href="mailto:hello@stealmyprompts.ai" className="hover:text-primary transition-colors">
                                    hello@stealmyprompts.ai
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-bold text-text mb-3">Follow Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="https://twitter.com/stealmyprompts" target="_blank" rel="noopener noreferrer" className="text-text/60 hover:text-primary transition-colors">
                                    Twitter/X
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/stealmyprompts" target="_blank" rel="noopener noreferrer" className="text-text/60 hover:text-primary transition-colors">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com/@stealmyprompts" target="_blank" rel="noopener noreferrer" className="text-text/60 hover:text-primary transition-colors">
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-accent-light text-center text-sm text-text/60">
                    <p>© {currentYear} Steal My Prompts. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
