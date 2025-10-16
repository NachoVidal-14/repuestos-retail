"use client";
import Link from "next/link";
import Image from "next/image";
import { Producto } from "@/lib/products";
import { clp } from "@/lib/format";

const BLUE = "text-blue-600";
const BLUE_BORDER = "border-blue-200";

export function ProductCard({ p }: { p: Producto }) {
  return (
    <Link href={`/product/${encodeURIComponent(p.slug)}`} className="group block">
      <div
        className={`
          rounded-xl border ${BLUE_BORDER} bg-white
          overflow-hidden transition
          hover:shadow-md hover:border-blue-300
        `}
      >
        {/* Imagen más compacta */}
        <div className="relative aspect-[4/3] bg-white">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
            className="object-contain p-3 md:p-4"
          />
        </div>

        <div className="p-3 md:p-4">
          {/* Marca como pill */}
          {p.brand && (
            <span className="inline-block text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {p.brand}
            </span>
          )}

          {/* Nombre */}
          <div className="mt-1.5 text-sm md:text-[15px] font-medium group-hover:underline line-clamp-2">
            {p.name}
          </div>

          {/* Precio: muestra USD + CLP estimado (fx fijo opcional) */}
          <div className={`mt-2 text-base md:text-lg font-semibold ${BLUE}`}>
            ${p.price.toFixed(2)} USD
            <span className="ml-2 text-gray-400 text-xs md:text-sm">
              ({clp(p.price * 980)})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
