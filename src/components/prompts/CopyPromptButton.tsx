"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CopyPromptButton({ promptText, promptId }: { promptText: string; promptId: string }) {
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const handleCopy = async () => {
        // Try modern Clipboard API first
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(promptText);
            } else {
                // Fallback for browsers that don't support Clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = promptText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }

            setCopied(true);
            toast.success("Prompt copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error("Failed to copy to clipboard");
            return;
        }



        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
            <Copy className="h-5 w-5" />
            {copied ? "Copied!" : "Copy Prompt"}
        </button>
    );
}
