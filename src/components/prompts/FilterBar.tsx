"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function FilterBar() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`/prompts?${params.toString()}`);
    }, 300);



    return (
        <div className="sticky top-16 z-40 w-full border-b border-accent-light bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
                    <input
                        type="text"
                        placeholder="Search prompts & users..."
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get("search")?.toString()}
                        className="h-10 w-full rounded-full border border-accent-light bg-surface pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <select
                        onChange={(e) => {
                            const params = new URLSearchParams(searchParams);
                            if (e.target.value) {
                                params.set("tag", e.target.value);
                            } else {
                                params.delete("tag");
                            }
                            replace(`/prompts?${params.toString()}`);
                        }}
                        defaultValue={searchParams.get("tag")?.toString()}
                        className="h-10 rounded-lg border border-accent-light bg-surface px-4 text-sm outline-none focus:border-primary cursor-pointer"
                    >
                        <option value="">All Tags</option>
                        <option value="He">He</option>
                        <option value="She">She</option>
                        <option value="Couple">Couple</option>
                    </select>

                </div>
            </div>
        </div>
    );
}
