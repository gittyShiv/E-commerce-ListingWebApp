"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin-login");
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      console.error("Logout error", err);
      alert("Logout error");
    }
  };

  return <button onClick={logout}>Logout</button>;
}