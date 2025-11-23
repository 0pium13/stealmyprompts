"use client";

import Image from 'next/image';
import { useState } from 'react';

interface GridImageDisplayProps {
    gridImageUrl: string;
    title: string;
}

export default function GridImageDisplay({ gridImageUrl, title }: GridImageDisplayProps) {
    const [activeAngle, setActiveAngle] = useState<'wide' | 'medium' | 'close'>('wide');

    const angles = [
        { id: 'wide' as const, label: 'Wide Shot', position: '0% 50%' },
        { id: 'medium' as const, label: 'Medium Shot', position: '50% 50%' },
        { id: 'close' as const, label: 'Close-Up', position: '100% 50%' },
    ];

    return (
        <div className="space-y-4">
            {/* Angle Selector */}
            <div className="flex gap-2">
                {angles.map(angle => (
                    <button
                        key={angle.id}
                        onClick={() => setActiveAngle(angle.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeAngle === angle.id
                                ? 'bg-primary text-white'
                                : 'bg-surface text-text/60 hover:bg-accent-light'
                            }`}
                    >
                        {angle.label}
                    </button>
                ))}
            </div>

            {/* Image Display */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface">
                <Image
                    src={gridImageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    style={{
                        objectPosition: angles.find(a => a.id === activeAngle)?.position
                    }}
                />

                {/* Watermark Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Includes Google watermark
                </div>
            </div>
        </div>
    );
}
