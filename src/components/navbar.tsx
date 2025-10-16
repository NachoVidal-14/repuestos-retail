"use client";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";

export function Navbar() {
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { items } = useCart();
  const count = items.reduce((a, b) => a + b.qty, 0);

  const goSearch = () => {
    if (!q.trim()) return;
    router.push(`/catalog?query=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-blue-600 text-white shadow-md">
      {/* más espacio en los bordes con px-6 y en pantallas grandes px-8 */}
      <div className="container mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* IZQUIERDA: botón menú siempre visible + marca */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 hover:bg-blue-700 rounded-lg transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu />
          </button>
          <Link
            href="/"
            className="font-bold text-2xl tracking-wide hover:text-blue-200 transition"
          >
            Repuestos Repuestín
          </Link>
        </div>

        {/* BUSCADOR CENTRADO (visible en todas las vistas) */}
        <div className="flex items-center justify-center flex-1">
          <div className="relative w-full max-w-xl">
            {/* icono de lupa a la izquierda */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700/80 pointer-events-none" size={18} />
            <input
              className="w-full rounded-lg pl-9 pr-28 py-2 text-gray-900 bg-gray-100 shadow-sm
                         focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Buscar (SKU, OEM, nombre)…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
            />
            {/* botón buscar a la derecha del input */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800
                         rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition"
              onClick={goSearch}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* DERECHA: links y carrito (si quieres, puedes duplicarlos dentro del menú lateral) */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
        <Link
          href="/catalog"
          className="bg-white text-blue-700 px-4 py-2 rounded-full shadow-md hover:shadow-lg 
                    hover:bg-blue-50 transition font-semibold"
        >
          Catálogo
        </Link>
        <Link
          href="/vehicle"
          className="bg-white text-blue-700 px-4 py-2 rounded-full shadow-md hover:shadow-lg 
                    hover:bg-blue-50 transition font-semibold"
        >
          Vehículo
        </Link>
        <Link
          href="/cart"
          className="relative flex items-center justify-center bg-white text-blue-700 
                    w-10 h-10 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition"
          aria-label="Carrito"
        >
          <ShoppingCart size={20} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white 
                            rounded-full px-1 py-0.5 shadow">
              {count}
            </span>
          )}
        </Link>
      </nav>
      </div>

      {/* MENÚ LATERAL (drawer) — ahora útil también en pantallas grandes */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-[78%] max-w-sm bg-blue-700 text-white
                       p-8 flex flex-col gap-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">Menú</span>
              <button
                className="p-2 hover:bg-blue-800 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X />
              </button>
            </div>

            <Link className="hover:underline underline-offset-4" href="/" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
            <Link className="hover:underline underline-offset-4" href="/catalog" onClick={() => setMenuOpen(false)}>
              Catálogo
            </Link>
            <Link className="hover:underline underline-offset-4" href="/vehicle" onClick={() => setMenuOpen(false)}>
              Por vehículo
            </Link>
            <Link className="hover:underline underline-offset-4" href="/cart" onClick={() => setMenuOpen(false)}>
              Carrito
            </Link>

            <div className="mt-auto pt-6 border-t border-blue-600/50 text-sm text-blue-100">
              © {new Date().getFullYear()} Repuestos Repuestín
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
