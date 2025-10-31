import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import AdminPanel from "../../components/AdminPanel";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const secret = process.env.JWT_SECRET || "";
    if (!token) throw new Error("No token");
    jwt.verify(token, secret);
    // Authenticated -> render client AdminPanel
    return <AdminPanel />;
  } catch (err) {
    // Not authenticated -> redirect to login
    redirect("/admin-login");
  }
}