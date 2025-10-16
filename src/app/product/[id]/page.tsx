"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { clp } from "@/lib/format";
import { useCart } from "@/components/cart-provider";
import { findProduct } from "@/lib/products";

function parseCompat(raw: string[]): string[] {
  if (!raw || raw.length === 0) return [];
  // Tomamos el string (que suele venir todo junto) y lo separamos
  // buscando patrones de "YYYY-YYYY" seguidos de un espacio.
  return raw[0]
    .split(/(?<=\d{4})\s+(?=[A-Z])/g) // divide después de un año y antes de otra marca
    .map(s => s.trim())
    .filter(Boolean);
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const p = id ? findProduct(id) : null;
  const { add } = useCart();
  const router = useRouter();

  if (!p) return <div>Producto no encontrado</div>;

  const compatList = parseCompat(p.compat ?? []);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Imagen */}
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-contain p-6"
        />
      </div>

      {/* Información */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{p.name}</h1>
        <div className="text-gray-600">{p.brand ?? "—"} • {p.slug}</div>
        <div className="text-3xl font-bold">${p.price.toFixed(2)} USD</div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition"
          onClick={() => { add(p.id, 1); router.push("/cart"); }}
        >
          Agregar al carrito
        </button>

        {/* Compatibilidades */}
        {compatList.length > 0 && (
          <div className="pt-4">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Compatibilidades
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {compatList.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Descripción estática */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Descripción</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Producto Nuevo Original Nissan. <br />
            Prefiera Original, mayor duración, seguridad y confianza.
          </p>
        </div>
      </div>
    </div>
  );
}
