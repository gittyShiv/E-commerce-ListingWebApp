"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="w-full h-40 bg-[url('/footer-banner.jpg')] bg-cover bg-center rounded-t-lg opacity-95" />
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-[rgba(230,238,248,0.7)]">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} YourStore. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}