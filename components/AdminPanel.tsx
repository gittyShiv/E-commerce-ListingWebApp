"use client";
import React, { useEffect, useState } from "react";
import AdminForm from "./AdminForm";
import { Product } from "../types/product";

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        setProducts(await res.json());
      } else {
        console.error("Failed to load products");
      }
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setRefreshKey((k) => k + 1);
    } catch (err) {
      alert("Delete failed");
    }
  }

  function handleSaved(p?: Product) {
    // after create/update, refresh the list and reset editing
    setEditing(null);
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Form (takes 2/3 on large screens) */}
        <div className="lg:col-span-2">
          <AdminForm onSaved={handleSaved} editingProduct={editing} onCancelEdit={() => setEditing(null)} />
        </div>

        {/* Right: Product list */}
        <aside className="lg:col-span-1 space-y-3">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Products</h4>
              <div className="text-sm text-[rgba(230,238,248,0.7)]">{products.length}</div>
            </div>
          </div>

          <div className="space-y-3 max-h-[62vh] overflow-auto">
            {loading ? (
              <div className="card p-4">Loading…</div>
            ) : products.length === 0 ? (
              <div className="card p-4">No products yet</div>
            ) : (
              products.map((p) => (
                <div key={p.id} className="card p-3 flex items-center justify-between hover-pop">
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-[rgba(230,238,248,0.65)]">{p.category} · ${p.price.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.04)] text-sm"
                      onClick={() => setEditing(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded-md bg-red-600/20 hover:bg-red-600/30 text-sm text-red-100"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}