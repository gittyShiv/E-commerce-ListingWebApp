import { NextRequest, NextResponse } from "next/server";
import { updateProductById } from "../../../../lib/products";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // 👈 this is the only key change
    const body = await req.json();

    const updated = await updateProductById(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
