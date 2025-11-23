import Header from "@/components/layout/Header";

export default function Loading() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="bg-surface py-12 border-b border-accent-light">
                <div className="container mx-auto px-4 text-center">
                    <div className="h-10 w-64 bg-accent-light rounded-lg mx-auto mb-4 animate-pulse" />
                    <div className="h-4 w-96 bg-accent-light rounded-lg mx-auto animate-pulse" />
                </div>
            </div>

            <div className="sticky top-16 z-40 w-full border-b border-accent-light bg-background py-4">
                <div className="container mx-auto px-4 flex justify-between">
                    <div className="h-10 w-96 bg-accent-light rounded-full animate-pulse" />
                    <div className="h-10 w-32 bg-accent-light rounded-lg animate-pulse" />
                </div>
            </div>

            <section className="container mx-auto px-4 py-8">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="break-inside-avoid rounded-2xl border border-accent-light bg-white p-3">
                            <div className="aspect-[4/3] w-full rounded-xl bg-accent-light animate-pulse mb-3" />
                            <div className="space-y-2">
                                <div className="h-4 w-3/4 bg-accent-light rounded animate-pulse" />
                                <div className="h-12 w-full bg-accent-light rounded animate-pulse" />
                                <div className="flex justify-between pt-2">
                                    <div className="h-4 w-20 bg-accent-light rounded animate-pulse" />
                                    <div className="h-4 w-12 bg-accent-light rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
