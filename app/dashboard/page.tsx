import React from "react";
import AdminPanel from "../../components/AdminPanel";
import AnimatedGradient from "../../components/AnimatedGradient";
export default function DashboardPage() {
  return (
    <>
      <AnimatedGradient />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
          <p className="text-sm text-[rgba(230,238,248,0.75)] mt-1">Manage products, create new items, and edit existing catalog entries.</p>
        </header>

        <AdminPanel />
      </div>
    </>
  );
}