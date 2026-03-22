"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";
import { usePathname } from "next/navigation";

import { dashboardNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

const SIDEBAR_STORAGE_KEY = "firecrm-sidebar-collapsed";

type DashboardSidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

type IconProps = {
  className?: string;
};

function OverviewIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 13.5C4 12.12 5.12 11 6.5 11H8.5C9.88 11 11 12.12 11 13.5V17.5C11 18.88 9.88 20 8.5 20H6.5C5.12 20 4 18.88 4 17.5V13.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M13 6.5C13 5.12 14.12 4 15.5 4H17.5C18.88 4 20 5.12 20 6.5V17.5C20 18.88 18.88 20 17.5 20H15.5C14.12 20 13 18.88 13 17.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ProfileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 19C6.83 16.67 9.22 15.5 12 15.5C14.78 15.5 17.17 16.67 19 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThemeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C15.87 20 19.09 17.25 19.82 13.59C16.83 14.33 13.74 11.85 13.74 8.75C13.74 6.93 14.56 5.3 15.84 4.2C14.67 4.07 13.56 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NotificationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 17H16L15.2 15.93C14.75 15.33 14.5 14.6 14.5 13.85V10.5C14.5 9.12 13.38 8 12 8C10.62 8 9.5 9.12 9.5 10.5V13.85C9.5 14.6 9.25 15.33 8.8 15.93L8 17Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 19C10.83 19.61 11.38 20 12 20C12.62 20 13.17 19.61 13.5 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M12 5V6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function StaffIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16.5 10C17.88 10 19 8.88 19 7.5C19 6.12 17.88 5 16.5 5C15.12 5 14 6.12 14 7.5C14 8.88 15.12 10 16.5 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.5 18.5C4.56 16.58 6.12 15.5 8 15.5C9.88 15.5 11.44 16.58 12.5 18.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13.5 18C14.24 16.62 15.41 15.75 16.8 15.5C18.18 15.25 19.59 15.67 20.7 16.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CollapseIcon({ className, collapsed }: IconProps & { collapsed: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d={collapsed ? "M10 7L15 12L10 17" : "M14 7L9 12L14 17"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const sidebarIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  "/dashboard": OverviewIcon,
  "/dashboard/profile": ProfileIcon,
  "/dashboard/customization": ThemeIcon,
  "/dashboard/notification": NotificationIcon,
  "/dashboard/staff": StaffIcon,
};

export function DashboardSidebar({
  mobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const handleMobileClose = useEffectEvent(() => {
    onMobileClose?.();
  });
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    handleMobileClose();
  }, [pathname]);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm transition xl:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={onMobileClose}
      />

      <aside
        className={cn(
          "shell-sidebar fixed inset-y-0 left-0 z-40 flex h-screen flex-col px-3 py-4 text-slate-900 transition-[transform,width] duration-300 xl:sticky xl:top-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0",
          collapsed ? "w-24 items-center px-3" : "w-[290px]",
        )}
      >
        <div className="mb-6 flex w-full items-center justify-between">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center transition",
              collapsed ? "justify-center px-0" : "gap-3 px-2",
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] text-sm font-semibold text-white shadow-sm">
              FC
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight text-slate-950">FireCRM</p>
                <p className="text-xs text-subtle">Starter</p>
              </div>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={onMobileClose}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-slate-500 transition hover:bg-white hover:text-slate-900 xl:hidden"
            aria-label="Close sidebar"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 w-full flex-1 overflow-y-auto">
          <div className="w-full space-y-1">
            {dashboardNavigation.map((item) => {
              const active = pathname === item.href;
              const Icon = sidebarIcons[item.href] ?? OverviewIcon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center rounded-[var(--radius-control)] transition-colors",
                    active
                      ? "surface-card-muted text-slate-950"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-950",
                    collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] transition",
                      active
                        ? "bg-[color:color-mix(in_srgb,var(--color-brand)_12%,white)] text-[var(--color-brand)]"
                        : "text-slate-500 group-hover:text-slate-700",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {!collapsed ? <p className="truncate text-sm font-medium">{item.label}</p> : null}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-full shrink-0 pt-4">
          {/* Keep the footer action outside the scrolling nav so it never disappears on shorter screens. */}
          <button
            type="button"
            onClick={toggleCollapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "group flex items-center text-slate-500 transition hover:text-slate-900",
              collapsed ? "w-auto justify-center px-0 py-2" : "w-full gap-3 px-3 py-2",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <CollapseIcon className="h-5 w-5 shrink-0" collapsed={collapsed} />
            {!collapsed ? <span className="text-sm font-medium">Collapse</span> : null}
          </button>
        </div>
      </aside>
    </>
  );
}
