"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../types/product";

export default function AdminForm({
  onSaved,
  editingProduct,
  onCancelEdit
}: {
  onSaved: (p?: Product) => void;
  editingProduct?: Product | null;
  onCancelEdit?: () => void;
}) {
  const empty = {
    name: "",
    slug: "",
    description: "",
    price: 0,
    category: "",
    inventory: 0
  };

  const [form, setForm] = useState({
    ...empty
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        slug: editingProduct.slug || "",
        description: editingProduct.description || "",
        price: Number(editingProduct.price) || 0,
        category: editingProduct.category || "",
        inventory: Number(editingProduct.inventory) || 0
      });
      setMsg("Editing product — make changes and Save");
      setError(null);
    } else {
      setForm({ ...empty });
      setMsg(null);
      setError(null);
    }
  }, [editingProduct]);

  function valid() {
    return form.name.trim().length > 2 && form.slug.trim().length > 2 && form.price > 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid()) {
      setError("Please provide at least a name, slug and price > 0.");
      return;
    }
    setSaving(true);
    setError(null);
    setMsg(null);
    try {
      if (editingProduct) {
        // update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error((await res.json()).error || "Update failed");
        const updated = await res.json();
        setMsg("Product updated");
        onSaved(updated);
      } else {
        // create
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error((await res.json()).error || "Create failed");
        const created = await res.json();
        setMsg("Product created");
        setForm({ ...empty });
        onSaved(created);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Network error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{editingProduct ? "Edit product" : "Add product"}</h3>
        {editingProduct && (
          <button
            className="text-sm text-[rgba(230,238,248,0.7)] hover:underline"
            onClick={() => onCancelEdit && onCancelEdit()}
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm block mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"
            placeholder="Product name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm block mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"
              placeholder="product-slug"
              required
            />
            <p className="text-xs text-[rgba(230,238,248,0.6)] mt-1">URL friendly identifier (lowercase, hyphens)</p>
          </div>

          <div>
            <label className="text-sm block mb-1">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"
              placeholder="electronics"
            />
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] min-h-[88px]"
            placeholder="Short product description"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm block mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="w-full rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"
              placeholder="99.99"
              required
            />
          </div>
          <div>
            <label className="text-sm block mb-1">Inventory</label>
            <input
              type="number"
              value={form.inventory}
              onChange={(e) => setForm({ ...form, inventory: Number(e.target.value) })}
              className="w-full rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"
              placeholder="10"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!valid() || saving}
              className="btn-primary w-full"
            >
              {saving ? "Saving..." : editingProduct ? "Save changes" : "Create product"}
            </button>
          </div>
        </div>

        {msg && <div className="text-sm text-green-300">{msg}</div>}
        {error && <div className="text-sm text-red-400">{error}</div>}
      </form>
    </div>
  );
}