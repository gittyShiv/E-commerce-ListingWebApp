import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true, message: "Logged out" });
  // Clear cookie by setting it to empty and maxAge=0; Path should match login cookie path.
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0
  });
  return res;
}

// Also allow GET if you prefer visiting /api/auth/logout in a browser
export async function GET() {
  return POST();
}