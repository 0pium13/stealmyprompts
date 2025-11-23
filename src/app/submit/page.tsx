"use client";

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { submitPrompt } from '@/app/actions/submit';

export default function SubmitPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const [title, setTitle] = useState('');
    const [prompt, setPrompt] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
                toast.error("File too large (max 10MB)");
                return;
            }
            setFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        }
    };

    const clearFile = () => {
        setFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleToggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleSubmit = async () => {
        if (!file || !title || !prompt) {
            toast.error('Please fill in all fields and upload an image');
            return;
        }

        setUploading(true);
        try {
            // 1. Get Presigned URL
            const presignRes = await fetch('/api/upload/presigned', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type
                })
            });

            if (!presignRes.ok) throw new Error('Failed to get upload URL');
            const { url, publicUrl } = await presignRes.json();

            // 2. Upload to R2
            const uploadRes = await fetch(url, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            });

            if (!uploadRes.ok) throw new Error('Upload failed');

            // 3. Save to DB
            const formData = new FormData();
            formData.append('title', title);
            formData.append('promptText', prompt);
            formData.append('mediaUrl', publicUrl);
            formData.append('tags', JSON.stringify(selectedTags));
            formData.append('type', 'prompt');

            const result = await submitPrompt(formData);

            if (result.success) {
                toast.success('Prompt submitted successfully!');
                router.push('/prompts'); // Redirect to feed
            } else {
                throw new Error(result.error || 'Submission failed');
            }

        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : 'Submission failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <SignedOut>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Sign in to Submit</h1>
                    <p className="text-text/60 mb-8 max-w-md">
                        Share your best AI prompts with the community.
                    </p>
                    <RedirectToSignIn />
                </div>
            </SignedOut>

            <SignedIn>
                <div className="max-w-2xl mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-2">Submit Prompt</h1>
                    <p className="text-text/60 mb-8">
                        Upload your AI-generated masterpiece and share the prompt.
                    </p>

                    <div className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Image</label>
                            {!previewUrl ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-colors"
                                >
                                    <Upload className="w-10 h-10 text-gray-400 mb-4" />
                                    <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP up to 10MB</p>
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                                    <img src={previewUrl} alt="Preview" className="w-full h-auto object-cover" />
                                    <button
                                        onClick={clearFile}
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="e.g., Cyberpunk Cityscape"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-accent-light rounded-lg outline-none focus:border-primary"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Tags (Optional)</label>
                            <div className="flex flex-wrap gap-3">
                                {['He', 'She', 'Couple'].map((tag) => (
                                    <label
                                        key={tag}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => handleToggleTag(tag)}
                                            className="w-4 h-4 rounded border-accent-light text-primary focus:ring-primary cursor-pointer"
                                        />
                                        <span className="text-sm">{tag}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Prompt */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Prompt</label>
                            <textarea
                                placeholder="Paste the exact prompt used to generate this image..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full p-3 border border-accent-light rounded-lg h-32 outline-none focus:border-primary"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={uploading || !file || !title || !prompt}
                            className="w-full bg-primary text-white p-4 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Submit Prompt
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </SignedIn>
        </main>
    );
}
