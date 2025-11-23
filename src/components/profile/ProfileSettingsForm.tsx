"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileSettingsFormProps {
    user: {
        id: string;
        username: string | null;
        bio: string | null;
        avatar: string | null;
        instagram: string | null;
        youtube: string | null;
        twitter: string | null;
        website: string | null;
    };
}

export function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
        instagram: user.instagram || "",
        youtube: user.youtube || "",
        twitter: user.twitter || "",
        website: user.website || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/profile/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push(`/profile/${formData.username}`);
                router.refresh();
            } else {
                const error = await response.json();
                alert(error.error || "Failed to update profile");
            }
        } catch (error) {
            alert(`Error: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-text mb-2">
                    Username *
                </label>
                <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-accent-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your-username"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text mb-2">Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-accent-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about yourself..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text mb-2">
                    Avatar URL
                </label>
                <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="w-full px-4 py-2 border border-accent-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text mb-2">
                        Instagram
                    </label>
                    <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        className="w-full px-4 py-2 border border-accent-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-2">
                        YouTube
                    </label>
                    <input
                        type="text"
                        value={formData.youtube}
                        onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                        className="w-full px-4 py-2 border border-accent-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="@channel"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-2">
                        Twitter
                    </label>
                    <input
                        type="text"
                        value={formData.twitter}
                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        className="w-full px-4 py-2 border border-accent-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="@username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text mb-2">
                        Website
                    </label>
                    <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-2 border border-accent-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://..."
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
                {loading ? "Saving..." : "Save Profile"}
            </button>
        </form>
    );
}
