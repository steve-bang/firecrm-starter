import type { Metadata } from "next";

import { ThemeCustomizationPanel } from "@/modules/customization/components/theme-customization-panel";

export const metadata: Metadata = {
  title: "Customization",
  description:
    "Adjust theme mode and brand color presets for the FireCRM Starter dashboard experience.",
};

export default function DashboardCustomizationPage() {
  return <ThemeCustomizationPanel />;
}
