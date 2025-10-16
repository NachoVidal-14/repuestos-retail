"use client";

import Link from "next/link";
import Image from "next/image";

type PromoHeroProps = {
  title?: string;
  subtitle?: string;
  promoLabel?: string;
  promoStrong?: string;
  ctaPrimaryHref?: string;
  ctaPrimaryText?: string;
  ctaSecondaryHref?: string;
  ctaSecondaryText?: string;
  bgImageSrc?: string; // pon el path a /public
};

export default function PromoHero({
  title = "Encuentra el repuesto correcto, a la primera.",
  subtitle = "Busca por código OEM, SKU, categoría o tu vehículo.",
  promoLabel = "Promoción de fin de año",
  promoStrong = "¡Hasta 20% dcto!",
  ctaPrimaryHref = "/catalog",
  ctaPrimaryText = "Ver catálogo",
  ctaSecondaryHref = "/vehicle",
  ctaSecondaryText = "Buscar por vehículo",
  bgImageSrc = "/hero/garage-bg.jpg",
}: PromoHeroProps) {
  return (
    <section
      className="group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5
                 bg-gradient-to-br from-blue-700 to-blue-600 text-white"
      aria-label="Promoción de fin de año"
    >
      {/* Fondo con imagen + zoom en hover */}
      <div className="absolute inset-0">
        <Image
          src={bgImageSrc}
          alt=""
          fill
          priority
          className="object-cover opacity-60 scale-105 transition-transform duration-700 ease-out
                     group-hover:scale-110"
        />
        {/* Overlay de degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-900/50 to-blue-800/30" />
        {/* Glow suave */}
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_60%)]" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
        {/* Badges superiores */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm ring-1 ring-white/20 shadow">
            🔔 {promoLabel}
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-400/90 px-3 py-1.5 text-xs font-extrabold text-emerald-950 shadow-md">
            {promoStrong}
          </span>
        </div>

        <h1 className="max-w-5xl text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm">
          {title}
        </h1>
        <p className="max-w-2xl mt-3 md:mt-4 text-blue-50/90 text-base md:text-lg">
          {subtitle}
        </p>

        {/* CTA */}
        <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={ctaPrimaryHref}
            className="inline-flex items-center justify-center rounded-full bg-white text-blue-700
                       px-5 py-2.5 text-sm md:text-base font-semibold shadow-md
                       hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition"
          >
            {ctaPrimaryText}
          </Link>

          <Link
            href={ctaSecondaryHref}
            className="inline-flex items-center justify-center rounded-full bg-blue-500/30 text-white
                       px-5 py-2.5 text-sm md:text-base font-semibold shadow-md ring-1 ring-white/20
                       hover:bg-blue-500/40 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition"
          >
            {ctaSecondaryText}
          </Link>
        </div>

        {/* Pie con micro-copy */}
        <p className="mt-4 text-xs text-blue-100/80">
          *Descuentos aplican a categorías seleccionadas. Revisa términos en el catálogo.
        </p>
      </div>
    </section>
  );
}
