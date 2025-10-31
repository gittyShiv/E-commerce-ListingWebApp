"use client";
import React from "react";

export default function AnimatedGradient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -left-16 -top-16 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[rgba(124,58,237,0.18)] to-[rgba(6,182,212,0.12)] blur-3xl animate-spin-slow opacity-70"></div>
      <div className="absolute -right-20 bottom-10 w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-[rgba(255,107,107,0.14)] to-[rgba(245,158,11,0.10)] blur-3xl animate-hue-rot opacity-80"></div>
    </div>
  );
}