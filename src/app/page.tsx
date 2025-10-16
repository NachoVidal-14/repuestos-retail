import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { allProducts } from "@/lib/products";
import PromoHero from "@/components/promo-hero";
import CategoryBubbles from "@/components/category-bubbles";

export default function Home() {
  const destacados = allProducts().slice(0, 2);


  return (
    <div className="space-y-10 md:space-y-12">
      {/* HERO PROMOCIONAL */}
      <PromoHero
        title="Encuentra el repuesto correcto, a la primera."
        subtitle="Busca por código OEM, SKU, categoría o tu vehículo."
        promoLabel="Promoción de fin de año"
        promoStrong="¡Hasta 20% dcto!"
        ctaPrimaryHref="/catalog"
        ctaPrimaryText="Ver catálogo"
        ctaSecondaryHref="/vehicle"
        ctaSecondaryText="Buscar por vehículo"
        bgImageSrc="/hero/garage-bg.jpg"
      />

      <CategoryBubbles />

      {/* DESTACADOS */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Destacados</h2>
        <ProductGrid items={destacados} />
      </section>
    </div>
  );
}
