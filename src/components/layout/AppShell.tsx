"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div
        className={`mobile-overlay${sidebarOpen ? " show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <div className="app">
        <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
        <main className="main" id="main" tabIndex={-1}>
          <Topbar onMenu={() => setSidebarOpen(true)} />
          {children}
          <div className="footer">
            © 2026 Level Up BA. All rights reserved. ·{" "}
            <Link href="/privacy">Privacy Policy</Link> ·{" "}
            <Link href="/terms">Terms of Service</Link>
          </div>
        </main>
      </div>
    </>
  );
}