"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { uploadAvatar, isUploading, error } = useFileUpload();

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setStatus(null);

    const result = await uploadAvatar(file, user.id);

    // Keep the preview in local state immediately so users can confirm the change before save.
    setForm((current) => ({
      ...current,
      image: result.url,
    }));
    setStatus("Avatar updated. Save profile to keep your new identity details in sync.");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      await saveUserProfile(form);
      setStatus("Profile saved successfully.");
    } catch (submitError) {
      setSaveError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save profile right now. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Profile"
        description="Manage your personal information, avatar, and account-facing identity with a focused, low-risk settings experience."
      />

      <div className="grid gap-5 xl:grid-cols-[0.76fr_1.24fr]">
        <Card>
          <CardHeader
            title="Profile identity"
            description="Preview how your account appears across the dashboard and update your avatar when needed."
          />
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar name={form.name} image={form.image} size="lg" />
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                  {form.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{form.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="neutral">{form.role}</Badge>
                  <Badge tone="positive">{form.provider ?? "credentials"}</Badge>
                </div>
              </div>
            </div>

            <div className="surface-card-muted space-y-3 p-3.5">
              <p className="text-sm font-medium text-slate-950 dark:text-white">
                Avatar upload
              </p>
              <p className="text-sm leading-6 text-muted">
                Storage uploads write to Firebase Storage when configured and fall back
                to a local preview while the starter is running in demo mode.
              </p>
              <label className="inline-flex cursor-pointer items-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition hover:brightness-110">
                {isUploading ? "Uploading..." : "Upload avatar"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            </div>

            <div className="surface-card-muted p-3.5">
              <p className="text-sm font-medium text-slate-950 dark:text-white">
                Profile guidance
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Keep identity settings lightweight here. Account security and more
                advanced workspace controls should live in separate settings later.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Profile settings"
            description="Edit the core fields your workspace uses to identify and contact you."
          />
          <form className="grid gap-3.5 md:grid-cols-2" onSubmit={handleSubmit}>
            <Input
              label="Full name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
            />
            <Input
              label="Email"
              type="email"
              hint="Use the email address tied to your workspace identity."
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
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
              hint="Keep this stable until workspace-aware settings are introduced."
              value={form.workspaceId ?? "demo-workspace"}
              onChange={(event) =>
                setForm((current) => ({ ...current, workspaceId: event.target.value }))
              }
            />
            <div className="md:col-span-2">
              <Textarea
                label="Bio"
                value={form.bio}
                onChange={(event) =>
                  setForm((current) => ({ ...current, bio: event.target.value }))
                }
              />
            </div>

            {status ? (
              <p className="md:col-span-2 text-sm text-emerald-600">{status}</p>
            ) : null}
            {saveError ? (
              <p className="md:col-span-2 text-sm text-rose-600">{saveError}</p>
            ) : null}

            <div className="md:col-span-2 flex justify-end gap-3">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  setForm({
                    ...user,
                    phone: user.phone ?? "",
                    jobTitle: user.jobTitle ?? "Founder",
                    location: user.location ?? "San Francisco, CA",
                    bio:
                      user.bio ??
                      "Building and scaling CRM experiences with clean SaaS patterns and AI-assisted workflows.",
                  });
                  setStatus(null);
                  setSaveError(null);
                }}
              >
                Reset changes
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save profile"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
