import { NextRequest, NextResponse } from "next/server";
import { createProduct, getAllProducts } from "../../../lib/products";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Basic validation
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const created = await createProduct(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}