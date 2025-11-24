import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";
import Seo from "@/components/Seo";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stealmyprompts.ai'),
  title: "AI Prompts Library | Midjourney, Sora, Runway | Steal My Prompts",
  description: "Discover and steal AI prompts for Midjourney, Sora, Runway. Browse storyboards, BTS workflows, and filmmaking techniques. Join 2,000+ creators.",
  alternates: {
    canonical: 'https://stealmyprompts.ai',
  },
  openGraph: {
    title: "AI Prompts Library | Midjourney, Sora, Runway | Steal My Prompts",
    description: "Discover and steal AI prompts for Midjourney, Sora, Runway. Browse storyboards, BTS workflows, and filmmaking techniques. Join 2,000+ creators.",
    url: 'https://stealmyprompts.ai',
    siteName: 'Steal My Prompts',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Steal My Prompts - AI Prompt Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Prompts Library | Midjourney, Sora, Runway | Steal My Prompts",
    description: "Discover and steal AI prompts for Midjourney, Sora, Runway. Browse storyboards, BTS workflows, and filmmaking techniques.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: ['AI prompts', 'Midjourney prompts', 'Sora prompts', 'Runway prompts', 'AI filmmaking', 'prompt library', 'storyboards'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Seo />
          {/* Google Analytics with Consent Mode v2 */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2HJBN6E69"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                // Set default consent to 'denied' as a placeholder
                // This will be updated based on user choice
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied'
                });
                
                gtag('js', new Date());
                gtag('config', 'G-Q2HJBN6E69');
              `,
            }}
          />
        </head>
        <body
          className={`${inter.variable} antialiased bg-background text-text`}
          suppressHydrationWarning
        >
          {children}
          <Toaster position="bottom-right" />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
