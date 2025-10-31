"use client";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-8">
        <div className="z-10">
          <p className="text-sm uppercase tracking-wider text-[rgba(230,238,248,0.7)]">Space just got personal</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight" style={{ color: "white" }}>
            The New HeadPhones
          </h1>
          <p className="mt-6 text-lg text-[rgba(230,238,248,0.85)] max-w-xl">
            A premium listening experience with comfort and studio-grade sound. Designed for people who care about audio.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/products" className="btn-primary">
              Browse products
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
              More info
            </Link>
          </div>
        </div>

        {}
        <div className="hidden md:flex items-center justify-center">
          <div className="card p-6 hover-pop relative flex items-center justify-center">
            {}
            <div className="relative w-full flex items-center justify-center">
              <img
                src="/hero-headphone.png"
                alt="Headphone"
                className="object-contain w-[320px] h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] transition-transform duration-700"
                style={{ transform: "translateX(6%)" }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
              />
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="w-full h-8 bg-gradient-to-r from-[rgba(6,182,212,0.18)] via-[rgba(124,58,237,0.16)] to-[rgba(245,158,11,0.12)] opacity-90" />
    </section>
  );
}