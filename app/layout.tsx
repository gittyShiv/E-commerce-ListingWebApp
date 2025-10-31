import "./globals.css";
import React from "react";
import AuthNav from "../components/AuthNav";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata = {
  title: "Catalog Demo",
  description: "A polished e‑commerce demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}