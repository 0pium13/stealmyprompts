"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function HeaderClient() {
    const { user } = useUser();
    const isUserAdmin = user?.publicMetadata?.role === 'admin';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-accent-light bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight">
                            Steal My <span className="text-primary">Prompts</span>
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text/80">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/prompts" className="hover:text-primary transition-colors">
                            Prompts
                        </Link>
                        <Link href="/storyboards" className="hover:text-primary transition-colors">
                            Storyboards
                        </Link>
                        <Link href="/submit" className="hover:text-primary transition-colors">
                            Submit
                        </Link>
                        {isUserAdmin && (
                            <Link href="/admin" className="hover:text-primary transition-colors font-semibold">
                                Admin
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/prompts"
                        className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-text transition-transform hover:scale-105 hover:shadow-md"
                    >
                        Explore Prompts
                    </Link>

                    <div className="flex items-center gap-2">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium hover:text-primary px-3 py-2">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>

                        <button
                            className="md:hidden p-2 hover:bg-surface rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-accent-light bg-background p-4 space-y-4 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-4 text-base font-medium text-text/80">
                        <Link
                            href="/"
                            className="hover:text-primary transition-colors p-2 hover:bg-surface rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/prompts"
                            className="hover:text-primary transition-colors p-2 hover:bg-surface rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Prompts
                        </Link>
                        <Link
                            href="/storyboards"
                            className="hover:text-primary transition-colors p-2 hover:bg-surface rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Storyboards
                        </Link>
                        <Link
                            href="/submit"
                            className="hover:text-primary transition-colors p-2 hover:bg-surface rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Submit
                        </Link>
                        {isUserAdmin && (
                            <Link
                                href="/admin"
                                className="hover:text-primary transition-colors font-semibold p-2 hover:bg-surface rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
