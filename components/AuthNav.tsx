"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";


export default function AuthNav() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const res = await fetch("/api/auth/verify", { cache: "no-store" });
        if (!mounted) return;
        setAuthenticated(res.ok);
      } catch (err) {
        if (!mounted) return;
        setAuthenticated(false);
      }
    }

    check();

    return () => {
      mounted = false;
    };
  }, [pathname]);


  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  if (authenticated === null) {
    return (
      <nav className="flex items-center gap-3">
        <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
        <span className="text-[rgba(255,255,255,0.18)]">|</span>
        <Link href="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>Dashboard</Link>
        <span className="text-[rgba(255,255,255,0.18)]">|</span>
        <Link href="/admin-login" className={`nav-link ${isActive("/admin-login") ? "active" : ""}`}>Admin</Link>
        <span className="text-[rgba(255,255,255,0.18)]">|</span>
        <Link href="/recommendations" className={`nav-link nav-recommendation ${isActive("/recommendations") ? "active" : ""}`}>Recommendations</Link>
      </nav>
    );
  }

  if (authenticated) {
    return (
      <nav className="flex items-center gap-3">
        <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
        <span className="text-[rgba(255,255,255,0.18)]">|</span>

        <Link href="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>Dashboard</Link>
        <span className="text-[rgba(255,255,255,0.18)]">|</span>

        <Link href="/admin" className={`nav-link ${isActive("/admin") ? "active" : ""}`}>Admin</Link>
        <span className="text-[rgba(255,255,255,0.18)]">|</span>

        <Link href="/recommendations" className={`nav-link nav-recommendation ${isActive("/recommendations") ? "active" : ""}`}>Recommendations</Link>

        {}
        <div style={{ marginLeft: 12 }}>
          <LogoutButton />
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-3">
      <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
      <span className="text-[rgba(255,255,255,0.18)]">|</span>

      <Link href="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>Dashboard</Link>
      <span className="text-[rgba(255,255,255,0.18)]">|</span>

      <Link href="/admin-login" className={`nav-link ${isActive("/admin-login") ? "active" : ""}`}>Admin</Link>
      <span className="text-[rgba(255,255,255,0.18)]">|</span>

      <Link href="/recommendations" className={`nav-link nav-recommendation ${isActive("/recommendations") ? "active" : ""}`}>Recommendations</Link>
    </nav>
  );
}