"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setShowBanner(true);
        } else if (consent === "accepted") {
            // Update consent to granted if previously accepted
            updateConsent("granted");
        } else if (consent === "declined") {
            // Ensure consent remains denied if previously declined
            updateConsent("denied");
        }
    }, []);

    const updateConsent = (value: "granted" | "denied") => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                ad_storage: value,
                ad_user_data: value,
                ad_personalization: value,
                analytics_storage: value,
            });
        }
    };

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        updateConsent("granted");
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        updateConsent("denied");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-accent-light shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-sm text-text/80">
                        <p>
                            We use cookies to enhance your experience and analyze site traffic.
                            By clicking "Accept", you consent to our use of cookies.{" "}
                            <Link href="/cookies" className="text-primary hover:underline">
                                Learn more
                            </Link>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleDecline}
                            className="px-4 py-2 text-sm font-medium text-text border border-accent-light rounded-lg hover:bg-surface transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 text-sm font-medium bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
