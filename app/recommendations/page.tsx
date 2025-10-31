import React from "react";
import AnimatedGradient from "../../components/AnimatedGradient";
import RecommendationsList from "../../components/RecommendationsList";
import { getAllProducts } from "../../lib/products";

export const revalidate = 60;

export default async function RecommendationsPage() {
  const products = await getAllProducts();
  const recommended = products.slice(0, 9).map((p) => ({ ...p, recommendedReason: "Popular choice" }));

  return (
    <>
      <AnimatedGradient />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold">Recommendations</h1>
            <p className="mt-3 text-[rgba(230,238,248,0.8)] max-w-prose">
              Hand-picked items you might love — powered by usage signals and editor picks. Refine with filters or search to find the perfect match.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="/products" className="btn-primary">Browse full catalog</a>
              <a href="/dashboard" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
                Admin
              </a>
            </div>
          </div>

          <div>
            <div className="card p-6 hover-pop">
              <h3 className="text-lg font-semibold mb-3">Editor picks</h3>
              <p className="text-sm text-[rgba(230,238,248,0.75)]">Items curated for quality, value and delight.</p>
            </div>
          </div>
        </div>

        <RecommendationsList initialItems={recommended} />
      </section>
    </>
  );
}