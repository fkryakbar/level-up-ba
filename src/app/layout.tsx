import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/app-provider";
import AppShell from "@/components/layout/AppShell";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

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
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}