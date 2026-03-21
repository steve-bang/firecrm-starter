"use client";

import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/hooks/use-file-upload";
import { saveUserProfile } from "@/services/firebase/user-client.service";
import type { UserProfile } from "@/types/user";

export function ProfileSettingsForm({ user }: { user: UserProfile }) {
  const [form, setForm] = useState<UserProfile>({
    ...user,
    phone: user.phone ?? "",
    jobTitle: user.jobTitle ?? "Founder",
    location: user.location ?? "San Francisco, CA",
    bio:
      user.bio ??
      "Building and scaling CRM experiences with clean SaaS patterns and AI-assisted workflows.",
  });
  const [status, setStatus] = useState<string | null>(null);
  const { uploadAvatar, isUploading, error } = useFileUpload();

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const result = await uploadAvatar(file, user.id);
    setForm((current) => ({
      ...current,
      image: result.url,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveUserProfile(form);
    setStatus("Profile saved. Firestore sync is active when Firebase is configured.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.74fr_1.26fr]">
      <Card>
        <CardHeader
          title="Profile identity"
          description="Upload an avatar and preview what other dashboard surfaces will use."
        />
        <div className="flex flex-col items-start gap-5">
          <Avatar name={form.name} image={form.image} size="lg" />
          <div className="space-y-3">
            <label className="inline-flex cursor-pointer items-center rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white">
              {isUploading ? "Uploading..." : "Upload avatar"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Storage uploads write to Firebase Storage when configured and fall back to a
              local preview in starter mode.
            </p>
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Profile settings"
          description="Keep this form shape stable when swapping mock state for full backend persistence."
        />
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input
            label="Full name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          />
          <Input
            label="Job title"
            value={form.jobTitle}
            onChange={(event) =>
              setForm((current) => ({ ...current, jobTitle: event.target.value }))
            }
          />
          <Input
            label="Location"
            value={form.location}
            onChange={(event) =>
              setForm((current) => ({ ...current, location: event.target.value }))
            }
          />
          <Input
            label="Workspace ID"
            value={form.workspaceId ?? "demo-workspace"}
            onChange={(event) =>
              setForm((current) => ({ ...current, workspaceId: event.target.value }))
            }
          />
          <div className="md:col-span-2">
            <Textarea
              label="Bio"
              value={form.bio}
              onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
            />
          </div>
          {status ? <p className="md:col-span-2 text-sm text-emerald-600">{status}</p> : null}
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">Save profile</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
