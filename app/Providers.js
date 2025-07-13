"use client";  // 👈 This makes it a Client Component

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}