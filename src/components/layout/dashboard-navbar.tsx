"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

import { Avatar } from "@/components/ui/avatar";
import { NotificationDropdown } from "@/modules/notifications/components/notification-dropdown";
import { signOutFirebaseClient } from "@/services/firebase/auth-client.service";
import type { UserProfile } from "@/types/user";

type DashboardNavbarProps = {
  user: UserProfile;
  onOpenSidebar?: () => void;
};

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 17H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function DashboardNavbar({ user, onOpenSidebar }: DashboardNavbarProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  async function handleSignOut() {
    setIsSigningOut(true);
    setMenuOpen(false);
    await signOutFirebaseClient();
    await signOut({ callbackUrl: "/auth/sign-in" });
  }

  return (
    <header className="shell-navbar sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="surface-card-muted flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-slate-600 shadow-none transition hover:bg-white hover:text-slate-900 xl:hidden"
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
            Welcome back, {user.name}
          </p>
          <p className="hidden text-sm text-muted sm:block">
            Here&apos;s the latest state of your CRM workspace.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <NotificationDropdown />
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="surface-card-muted flex items-center gap-3 px-2.5 py-2 shadow-none transition hover:bg-white md:px-3"
            aria-label="Open user menu"
            aria-expanded={menuOpen}
          >
            <Avatar name={user.name} image={user.image} size="sm" />
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-subtle">{user.email}</p>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`hidden h-4 w-4 text-slate-500 transition md:block ${menuOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {menuOpen ? (
            <div className="surface-floating absolute right-0 top-16 z-30 w-72 overflow-hidden p-2">
              <div className="surface-card-muted flex items-center gap-3 rounded-[18px] px-3 py-3">
                <Avatar name={user.name} image={user.image} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-subtle">{user.email}</p>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-[18px] px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M5 19C6.83 16.67 9.22 15.5 12 15.5C14.78 15.5 17.17 16.67 19 19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex w-full items-center gap-3 rounded-[18px] px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 dark:hover:bg-rose-500/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M10 17L15 12L10 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 12H4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 20V4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
