"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Cat = {
  name: string;
  slug: string;
  // usa emoji simple o un string SVG (opcional). Te dejo ambos.
  emoji?: string;
  svg?: React.ReactNode;
};

const CATS: Cat[] = [
  { name: "Transmisión",  slug: "transmision",  emoji: "⚙️" },
  { name: "Motores",      slug: "motores",      emoji: "🚗" },
  { name: "Inyección",    slug: "inyeccion",    emoji: "🧪" },
  { name: "Iluminación",  slug: "iluminacion",  emoji: "💡" },
  { name: "Frenos",       slug: "frenos",       emoji: "🛑" },
  { name: "Filtros",      slug: "filtros",      emoji: "🛢️" },
  { name: "Encendido",    slug: "encendido",    emoji: "⚡" },
  { name: "Climatización",slug: "climatizacion",emoji: "❄️" },
  { name: "Carrocería",   slug: "carroceria",   emoji: "🚙" },
];

type Props = {
  queryKey?: string; // p.ej. "category"
  categories?: Cat[];
};

export default function CategoryCarousel({
  queryKey = "category",
  categories = CATS,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth * 3 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Categorías"
      // full-bleed: rompe los márgenes del container para ocupar todo el ancho
      className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-gray-100 py-6 md:py-8"
    >
      {/* Flechas */}
      <button
        aria-label="Anterior"
        onClick={() => scrollByCards("left")}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10
                   inline-flex items-center justify-center w-9 h-9 rounded-full
                   bg-white/90 ring-1 ring-blue-200 shadow hover:bg-blue-50
                   transition"
      >
        <ChevronLeft className="text-blue-700" />
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => scrollByCards("right")}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10
                   inline-flex items-center justify-center w-9 h-9 rounded-full
                   bg-white/90 ring-1 ring-blue-200 shadow hover:bg-blue-50
                   transition"
      >
        <ChevronRight className="text-blue-700" />
      </button>

      {/* Fades laterales (estético) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

      {/* Pista */}
      <div
        ref={trackRef}
        className="relative px-6 md:px-10 overflow-x-auto hide-scrollbar
                   snap-x snap-mandatory scroll-p-6 md:scroll-p-10"
      >
        <div className="flex items-start gap-5 md:gap-8">
          {categories.map(({ name, slug, emoji, svg }) => (
            <Link
              key={slug}
              href={`/catalog?${queryKey}=${encodeURIComponent(slug)}`}
              data-card
              className="group w-[120px] md:w-[140px] shrink-0 snap-start text-center focus:outline-none"
            >
              {/* burbuja = botón */}
              <div
                className="mx-auto flex items-center justify-center
                           w-[96px] h-[96px] md:w-[112px] md:h-[112px]
                           rounded-full bg-white ring-2 ring-blue-200
                           hover:ring-blue-400 shadow-sm hover:shadow-md
                           transition transform group-hover:-translate-y-0.5"
              >
                {/* Contenido (emoji o svg) */}
                {svg ? (
                  <div className="text-blue-700 opacity-90">{svg}</div>
                ) : (
                  // emojis no siempre heredan color; usamos azul en el ring y movimiento
                  <span className="text-3xl md:text-4xl select-none">
                    {emoji}
                  </span>
                )}
              </div>

              {/* nombre */}
              <div className="mt-3 text-sm md:text-base font-semibold text-gray-900">
                {name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
