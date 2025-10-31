import { ObjectId } from "mongodb";
import { getProductsCollection } from "./mongodb";
import { Product } from "../types/product";

function toPublic(doc: any): Product {
  return {
    id: doc._id?.toString?.() ?? String(doc._id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    price: doc.price,
    category: doc.category,
    inventory: doc.inventory,
    lastUpdated: doc.lastUpdated
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const col = await getProductsCollection();
  const docs = await col.find().sort({ lastUpdated: -1 }).toArray();
  return docs.map(toPublic);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const col = await getProductsCollection();
  const doc = await col.findOne({ slug });
  return doc ? toPublic(doc) : null;
}

export async function createProduct(
  data: Omit<Product, "id" | "lastUpdated"> & Partial<Pick<Product, "lastUpdated">>
): Promise<Product> {
  const col = await getProductsCollection();
  const now = new Date().toISOString();
  const insertDoc: any = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    category: data.category,
    inventory: data.inventory,
    lastUpdated: data.lastUpdated ?? now
  };
  const res = await col.insertOne(insertDoc);
  return toPublic({ _id: res.insertedId, ...insertDoc });
}

export async function updateProductById(id: string, partial: Partial<Product>): Promise<Product | null> {
  const col = await getProductsCollection();
  const _id = new ObjectId(id);
  const updateDoc: any = { ...partial, lastUpdated: new Date().toISOString() };
  delete updateDoc.id;

  // findOneAndUpdate may return null (if no document matched), and `res.value` may be null.
  const res = await col.findOneAndUpdate(
    { _id },
    { $set: updateDoc },
    { returnDocument: "after" } // returns the document after update
  );

  if (!res || !res.value) return null;
  return toPublic(res.value);
}