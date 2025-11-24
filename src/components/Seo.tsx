import Head from 'next/head';

interface SeoProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
}

export default function Seo({ title, description, url, image }: SeoProps) {
    const defaultTitle = "Steal My Prompts | AI Prompt Library & Storyboards";
    const defaultDescription = "Discover and steal the prompts behind AI masterpieces. From storyboard to screen.";
    const defaultUrl = "https://stealmyprompts.ai";
    const defaultImage = `${defaultUrl}/og-image.png`;

    const finalTitle = title ? `${title} | Steal My Prompts` : defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalUrl = url || defaultUrl;
    const finalImage = image || defaultImage;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "url": finalUrl,
                "name": finalTitle,
                "description": finalDescription,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${finalUrl}/prompts?search={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "Organization",
                "name": "Steal My Prompts",
                "url": "https://stealmyprompts.ai",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${defaultUrl}/logo.png`,
                    "width": 512,
                    "height": 512
                },
                "description": "AI prompt library and filmmaking hub for Midjourney, Sora, Runway, and Kling",
                "sameAs": [
                    "https://twitter.com/stealmyprompts",
                    "https://instagram.com/stealmyprompts",
                    "https://youtube.com/@stealmyprompts"
                ]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://stealmyprompts.ai"
                    },
                    ...(finalUrl !== "https://stealmyprompts.ai" ? [{
                        "@type": "ListItem",
                        "position": 2,
                        "name": finalTitle.split('|')[0].trim(),
                        "item": finalUrl
                    }] : [])
                ]
            }
        ]
    };

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:image" content={finalImage} />
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
            {/* Robots */}
            <meta name="robots" content="index, follow" />
            {/* Canonical */}
            <link rel="canonical" href={finalUrl} />
            {/* Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </Head>
    );
}
