import Link from "next/link";
import { ArrowRight, Sparkles, Film, Users } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center rounded-full border border-accent-light bg-surface px-3 py-1 text-sm text-text/60 mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                    The largest library of AI film prompts
                </div>

                <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                    Steal the Prompts Behind Every <br className="hidden md:block" />
                    <span className="relative inline-block">
                        <span className="relative z-10">AI Masterpiece</span>
                        <span className="absolute -bottom-2 left-0 h-3 w-full bg-primary/30 -rotate-1"></span>
                    </span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg text-text/60 mb-10">
                    Stop experimenting. Start creating. Discover proven AI prompts and filmmaking techniques from real projects.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="/prompts"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-text transition-transform hover:scale-105 hover:shadow-lg"
                    >
                        Explore Library
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                        href="/storyboards"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-accent-light bg-white px-8 text-base font-medium text-text transition-colors hover:bg-surface hover:border-accent"
                    >
                        View Storyboards
                    </Link>
                </div>

                <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-accent-light pt-12">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold">100+</span>
                        <span className="text-sm text-text/60 flex items-center gap-1 mt-1">
                            <Sparkles className="h-4 w-4" /> Prompts
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold">50+</span>
                        <span className="text-sm text-text/60 flex items-center gap-1 mt-1">
                            <Film className="h-4 w-4" /> AI Films
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold">Daily</span>
                        <span className="text-sm text-text/60 flex items-center gap-1 mt-1">
                            Updates
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
