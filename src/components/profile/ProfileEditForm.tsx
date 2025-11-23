"use client";

import { updateProfile } from "@/app/actions/profile";
import { Instagram, Youtube, Twitter, Globe, Save, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface ProfileEditFormProps {
    user: any;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatar);
    const [isPending, setIsPending] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be less than 5MB");
                return;
            }
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        try {
            const result = await updateProfile(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-surface bg-surface relative">
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Profile Preview"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary text-4xl font-bold">
                                {user.name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                        <Camera className="h-4 w-4" />
                    </div>
                </div>
                <input
                    type="file"
                    name="avatar"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <p className="text-sm text-text/60 mt-3">Click to upload new picture</p>
            </div>

            {/* Bio */}
            <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                    name="bio"
                    defaultValue={user.bio || ""}
                    placeholder="Tell us about yourself..."
                    className="w-full p-3 border border-accent-light rounded-lg h-32 outline-none focus:border-primary resize-none"
                    maxLength={500}
                />
                <p className="text-xs text-text/60 mt-1 text-right">Max 500 characters</p>
            </div>

            <div className="border-t border-accent-light my-6"></div>

            <h2 className="text-lg font-semibold mb-4">Social Links</h2>

            {/* Instagram */}
            <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram Username
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-text/40">@</span>
                    <input
                        type="text"
                        name="instagram"
                        defaultValue={user.instagram || ""}
                        placeholder="username"
                        className="w-full p-3 pl-8 border border-accent-light rounded-lg outline-none focus:border-primary"
                    />
                </div>
            </div>

            {/* YouTube */}
            <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Youtube className="h-4 w-4" /> YouTube Handle
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-text/40">@</span>
                    <input
                        type="text"
                        name="youtube"
                        defaultValue={user.youtube || ""}
                        placeholder="channel"
                        className="w-full p-3 pl-8 border border-accent-light rounded-lg outline-none focus:border-primary"
                    />
                </div>
            </div>

            {/* Twitter */}
            <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Twitter className="h-4 w-4" /> Twitter Username
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-text/40">@</span>
                    <input
                        type="text"
                        name="twitter"
                        defaultValue={user.twitter || ""}
                        placeholder="username"
                        className="w-full p-3 pl-8 border border-accent-light rounded-lg outline-none focus:border-primary"
                    />
                </div>
            </div>

            {/* Website */}
            <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Website URL
                </label>
                <input
                    type="url"
                    name="website"
                    defaultValue={user.website || ""}
                    placeholder="https://example.com"
                    className="w-full p-3 border border-accent-light rounded-lg outline-none focus:border-primary"
                />
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-white p-4 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-5 w-5" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
