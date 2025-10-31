"use client";
import React from "react";

export default function WishlistButton({ productId }: { productId: string }) {
  const add = async () => {
    alert("Added to wishlist: " + productId);
  };
  return <button onClick={add}>Add to Wishlist</button>;
}