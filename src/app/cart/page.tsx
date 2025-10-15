"use client";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { PRODUCTS } from "@/data/products";
import { clp } from "@/lib/format";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const rows = items.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id)!;
    const subtotal = p.price * i.qty;
    return { ...p, qty: i.qty, subtotal };
  });
  const total = rows.reduce((a,b)=> a + b.subtotal, 0);

  if (!rows.length) return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Tu carrito</h1>
      <p>Está vacío. <Link href="/catalog" className="underline">Ir al catálogo</Link></p>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tu carrito</h1>
      <div className="grid gap-4">
        {rows.map(r=>(
          <div key={r.id} className="border rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-gray-600">{r.sku} {r.oemCode ? `• OEM ${r.oemCode}` : ""}</div>
              <div className="text-sm">{clp(r.price)}</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number" min={1} value={r.qty}
                onChange={e=> setQty(r.id, Math.max(1, Number(e.target.value)))}
                className="w-16 border rounded-lg px-2 py-1"
              />
              <button className="text-red-600" onClick={()=>remove(r.id)}>Quitar</button>
            </div>
            <div className="w-28 text-right font-semibold">{clp(r.subtotal)}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button className="text-sm text-gray-600 underline" onClick={clear}>Vaciar carrito</button>
        <div className="text-xl font-bold">Total: {clp(total)}</div>
      </div>
      <button
        className="bg-black text-white rounded-lg px-4 py-2"
        onClick={()=> alert("Checkout de ejemplo (integraremos Webpay/MercadoPago luego).")}
      >Continuar a pago</button>
    </div>
  );
}
