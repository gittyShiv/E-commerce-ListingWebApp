import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "../../../../../lib/products";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // 👈 must await this now
  console.log("[API GET] requested slug:", JSON.stringify(slug));

  try {
    const product = await getProductBySlug(slug);
    console.log(
      "[API GET] product result:",
      product ? { id: product.id, slug: product.slug, name: product.name } : null
    );

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("[API GET] error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
