"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../types/product";
import RecommendationCard from "./RecommendationCard";

export default function RecommendationsList({ initialItems = [] as Product[] & { recommendedReason?: string }[] }: { initialItems?: (Product & { recommendedReason?: string })[] }) {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally refresh from API — keep no-store so we get updated recommendations
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const r = await fetch("/api/products", { cache: "no-store" });
        if (!mounted) return;
        if (r.ok) {
          const data: Product[] = await r.json();
          // pick a subset for demo purposes, you should call your real recommendations API
          setItems(data.slice(0, 12).map((d) => ({ ...d, recommendedReason: "Based on your interest" })));
        }
      } catch (e) {
        // ignore, keep initialItems
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category || "uncategorized"));
    return ["all", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      if (category !== "all" && (p.category || "uncategorized") !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
      );
    });
  }, [items, query, category]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search recommendations..." className="rounded-lg px-4 py-2 w-full md:w-80 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="text-sm text-[rgba(230,238,248,0.75)]">Showing {filtered.length} recommendations</div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-6 skeleton h-40" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <RecommendationCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}