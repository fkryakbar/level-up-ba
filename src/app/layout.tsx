import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/app-provider";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Level Up BA — Performance Gamification",
  description:
    "Gamification dashboard for Brand Ambassador performance: XP, missions, rewards, leaderboard, and analytics.",
};

export const viewport: Viewport = {
  themeColor: "#071426",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}