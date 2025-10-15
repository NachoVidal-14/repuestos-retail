"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { clp } from "@/lib/format";
import { useCart } from "@/components/cart-provider";

export default function ProductPage() {
  const { slug } = useParams<{slug:string}>();
  const p = PRODUCTS.find(x => x.slug === slug);
  const { add } = useCart();
  const router = useRouter();

  if (!p) return <div>Producto no encontrado</div>;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
        <Image src={p.image ?? "/placeholder.png"} alt={p.name} fill className="object-contain p-6"/>
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{p.name}</h1>
        <div className="text-gray-600">{p.brand} • {p.sku} {p.oemCode ? `• OEM ${p.oemCode}` : ""}</div>
        <div className="text-3xl font-bold">{clp(p.price)}</div>
        <button
          className="bg-black text-white rounded-lg px-4 py-2"
          onClick={()=> { add(p.id, 1); router.push("/cart"); }}
        >Agregar al carrito</button>
        <p className="text-sm text-gray-700 pt-2">{p.description}</p>
        <div className="text-sm text-gray-600">Stock: {p.stock}</div>
      </div>
    </div>
  );
}
