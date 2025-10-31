"use client";
import React from "react";
import { Product } from "../types/product";

export default function RecommendationCard({ product }: { product: Product & { recommendedReason?: string } }) {
  return (
    <article className="card hover-pop p-6 flex flex-col justify-between transform transition-all duration-300">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-xs text-[rgba(230,238,248,0.65)] mt-1">{product.category}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-[rgba(230,238,248,0.7)]">Score</div>
            <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
          </div>
        </div>

        <p className="mt-3 text-sm text-[rgba(230,238,248,0.72)] line-clamp-3">
          {product.description || "No description available."}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="badge">{product.recommendedReason || "Recommended"}</span>
          <span className="text-xs text-[rgba(230,238,248,0.6)]">Stock: <strong>{product.inventory}</strong></span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={() => (window.location.href = `/products/${product.slug}`)} className="btn-primary text-sm">View</button>
        <button className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.04)] text-sm">Save</button>
      </div>
    </article>
  );
}