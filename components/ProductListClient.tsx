"use client";
import React, { useMemo, useState } from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";

export default function ProductListClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
      );
    });
  }, [products, query]);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <input
          id="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-lg px-4 py-2 w-72 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.22)]"
        />
        <div className="text-sm text-[rgba(230,238,248,0.75)]">Showing {filtered.length} products</div>
      </div>

      {/* TWO cards per row on small screens and up (responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}