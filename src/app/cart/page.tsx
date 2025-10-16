"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/components/cart-provider";
import { allProducts, type Producto } from "@/lib/products";
import { clp } from "@/lib/format";

const FX = 980; // tipo de cambio fijo temporal para mostrar CLP

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();

  // Index rápido por id (codigo)
  const productById = useMemo(() => {
    const map = new Map<string, Producto>();
    for (const p of allProducts()) map.set(p.id, p);
    return map;
  }, []);

  // Enlaza items del carrito con info del producto
  const rows = items
    .map((i) => {
      const p = productById.get(String(i.id));
      if (!p) return null; // por si quedó algo “huérfano”
      const subtotalUsd = p.price * i.qty;
      return {
        ...p,
        qty: i.qty,
        subtotalUsd,
      };
    })
    .filter(Boolean) as Array<Producto & { qty: number; subtotalUsd: number }>;

  const totalUsd = rows.reduce((a, b) => a + b.subtotalUsd, 0);
  const totalClp = totalUsd * FX;

  if (rows.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-4">Tu carrito</h1>
        <p>
          Está vacío.{" "}
          <Link href="/catalog" className="underline text-blue-600">
            Ir al catálogo
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tu carrito</h1>

      <div className="grid gap-4">
        {rows.map((r) => (
          <div
            key={r.id}
            className="border border-blue-200 rounded-xl p-3 md:p-4 flex items-center justify-between gap-4 bg-white"
          >
            {/* Imagen + nombre */}
            <div className="flex items-center gap-3 md:gap-4 flex-1">
              <div className="relative w-16 h-12 md:w-20 md:h-16 bg-white rounded-lg overflow-hidden border">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  className="object-contain p-1.5"
                />
              </div>

              <div className="min-w-0">
                <div className="font-medium line-clamp-2">{r.name}</div>
                <div className="text-xs text-gray-600">
                  {r.brand ?? "—"} • {r.slug}
                </div>
                <div className="text-sm text-blue-700 font-semibold">
                  ${r.price.toFixed(2)} USD{" "}
                  <span className="text-gray-400 ml-1">({clp(r.price * FX)})</span>
                </div>
              </div>
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={r.qty}
                onChange={(e) =>
                  setQty(r.id, Math.max(1, Number(e.target.value || 1)))
                }
                className="w-16 border rounded-lg px-2 py-1 text-right"
              />
              <button
                className="text-red-600 hover:underline"
                onClick={() => remove(r.id)}
              >
                Quitar
              </button>
            </div>

            {/* Subtotal */}
            <div className="w-36 text-right">
              <div className="font-semibold">
                ${r.subtotalUsd.toFixed(2)} USD
              </div>
              <div className="text-sm text-gray-500">{clp(r.subtotalUsd * FX)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer del carrito */}
      <div className="flex items-center justify-between">
        <button
          className="text-sm text-gray-600 underline"
          onClick={clear}
          title="Vaciar carrito"
        >
          Vaciar carrito
        </button>
        <div className="text-right">
          <div className="text-xl font-bold">
            Total: ${totalUsd.toFixed(2)} USD
          </div>
          <div className="text-sm text-gray-600">{clp(totalClp)}</div>
        </div>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition"
        onClick={() =>
          alert("Checkout de ejemplo (integraremos Webpay/MercadoPago luego).")
        }
      >
        Continuar a pago
      </button>
    </div>
  );
}
