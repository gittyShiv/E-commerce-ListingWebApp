"use client";
import React from "react";

export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}