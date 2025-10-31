"use client";
import React from "react";
import { Product } from "../types/product";
import Badge from "./Badge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card hover-pop transition-all duration-300 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="product-title">{product.name}</h3>
          <Badge>{product.category}</Badge>
        </div>

        <p className="mt-3 text-sm text-[rgba(230,238,248,0.72)] line-clamp-3">
          {product.description || "No description provided."}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="price-pill text-lg">${product.price.toFixed(2)}</span>
          <span className="text-sm text-[rgba(230,238,248,0.6)]">Stock: <strong>{product.inventory}</strong></span>
        </div>

        <div className="mt-4 text-xs text-[rgba(230,238,248,0.55)]">
          <div>Slug: <code className="bg-[rgba(255,255,255,0.02)] px-2 py-1 rounded">{product.slug}</code></div>
          <div className="mt-1">Last updated: {new Date(product.lastUpdated).toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="btn-primary text-sm" onClick={() => (window.location.href = `/products/${product.slug}`)}>
          View details
        </button>
        <button className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.04)]" title="Quick add">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-85">
            <path d="M3 3h18v4H3z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 15h10l-1.5 4h-7L7 15z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </article>
  );
}