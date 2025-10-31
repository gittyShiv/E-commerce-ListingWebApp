import React from "react";
import { getProductBySlug } from "../../../lib/products";
import { notFound } from "next/navigation";
import AnimatedGradient from "../../../components/AnimatedGradient";

export const revalidate = 60;

type Params = { slug: string };

export default async function ProductPage({ params }: { params: Promise<Params> | Params }) {
  const resolvedParams = (params as Promise<Params>).then ? await params : (params as Params);
  const slug = resolvedParams.slug;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <AnimatedGradient />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Decorative left column (product hero/color band) */}
          <div className="md:col-span-2">
            <div className="card p-8 hover-pop">
              <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
              <p className="text-[rgba(230,238,248,0.8)] mb-6">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <span className="price-pill text-2xl">${product.price.toFixed(2)}</span>
                <BadgeInline text={product.category} />
                <div className="text-sm text-[rgba(230,238,248,0.7)]">Inventory: {product.inventory}</div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Product details</h3>
                <ul className="list-disc pl-5 text-[rgba(230,238,248,0.75)]">
                  <li>Slug: {product.slug}</li>
                  <li>Last updated: {new Date(product.lastUpdated).toLocaleString()}</li>
                  <li>Category: {product.category}</li>
                </ul>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="btn-primary">Add to cart</button>
                <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">Contact seller</button>
              </div>
            </div>
          </div>

          {/* Right column: decorative artwork / placeholder for image */}
          <aside className="flex flex-col gap-4">
            <div className="card p-6 text-center flex items-center justify-center h-full">
              <div>
                <div className="text-sm text-[rgba(230,238,248,0.7)] mb-2">Product Preview</div>
                <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-[rgba(124,58,237,0.14)] to-[rgba(6,182,212,0.12)] flex items-center justify-center">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="opacity-90">
                    <path d="M12 2v20" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M2 12h20" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card p-4 text-[rgba(230,238,248,0.78)]">
              <h4 className="font-semibold mb-2">Additional information</h4>
              <p className="text-sm">If you want to add more fields (specs, dimensions, materials), extend your Product type and they will display here.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

/* small inline badge component used on the page */
function BadgeInline({ text }: { text: string }) {
  return <span className="badge">{text}</span>;
}