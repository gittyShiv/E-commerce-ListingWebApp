import React from "react";
import AnimatedGradient from "../components/AnimatedGradient";
import Hero from "../components/Hero";
import ProductListClient from "../components/ProductListClient";
import { getAllProducts } from "../lib/products";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <AnimatedGradient />
      <header className="site-header">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
          </div>
        </div>
      </header>

      {}
      <Hero />

      {}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-extrabold mb-4">Featured Products</h2>
        <ProductListClient products={products} />
      </section>
    </>
  );
}