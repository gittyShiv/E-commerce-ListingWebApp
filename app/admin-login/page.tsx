"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        // Refresh server components so the new cookie is taken into account.
        router.refresh();
        // Then navigate to admin (server guard will render admin UI)
        router.push("/admin");
      } else {
        const body = await res.json().catch(() => ({}));
        setMsg(body.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      setMsg("Network error");
    }
  }

  return (
    <section>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </section>
  );
}