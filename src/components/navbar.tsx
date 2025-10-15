"use client";
import Link from "next/link";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";

export function Navbar() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const { items } = useCart();
  const count = items.reduce((a, b) => a + b.qty, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-16 flex items-center gap-3">
        <button className="md:hidden p-2"><Menu /></button>
        <Link href="/" className="font-bold text-xl">Repuestos</Link>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl ml-4">
          <input
            className="w-full border rounded-lg px-3 py-2 outline-none"
            placeholder="Buscar (SKU, OEM, nombre)…"
            value={q}
            onChange={e=>setQ(e.target.value)}
            onKeyDown={e=> e.key === "Enter" && router.push(`/catalog?query=${encodeURIComponent(q)}`)}
          />
          <button
            className="border rounded-lg px-3 py-2"
            onClick={()=> router.push(`/catalog?query=${encodeURIComponent(q)}`)}
          ><Search className="inline mr-2" size={16}/>Buscar</button>
        </div>
        <nav className="ml-auto flex items-center gap-5">
          <Link href="/catalog">Catálogo</Link>
          <Link href="/vehicle">Por vehículo</Link>
          <Link href="/cart" className="relative">
            <ShoppingCart />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1.5 py-0.5">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
