"use client";
import React from "react";
import Link from "next/link";
import AuthNav from "./AuthNav";


export default function Header() {
  return (
    <header className="site-header">
      <div className="max-w-7xl mx-auto w-full px-4">
        {/* Top utility row: subtle, small text */}
        <div className="flex items-center justify-between py-2 text-xs text-[rgba(230,238,248,0.6)]">
          <div>Newsletter • <a href="#" className="underline">Subscribe</a></div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="facebook" className="opacity-80 hover:opacity-100">FB</a>
            <a href="#" aria-label="twitter" className="opacity-80 hover:opacity-100">TW</a>
            <a href="#" aria-label="instagram" className="opacity-80 hover:opacity-100">IG</a>
          </div>
        </div>

        {}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              {}
              <div className="logo-badge">
                <span className="logo-initials">YS</span>
              </div>
              <div className="site-title">
                <div className="text-lg font-bold">YourStore</div>
                <div className="text-xs text-[rgba(230,238,248,0.6)] -mt-0.5">Catalog Demo</div>
              </div>
            </Link>
          </div>

          {/* AuthNav handles links + logout button */}
          <div>
            <AuthNav />
          </div>
        </div>

        {/* subtle divider so content below doesn't feel disconnected */}
        <div className="w-full border-t border-[rgba(255,255,255,0.03)]" />
      </div>
    </header>
  );
}