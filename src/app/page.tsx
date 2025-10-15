import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { PRODUCTS } from "../data/products";


export default function Home() {
  const destacados = PRODUCTS.slice(0, 2);
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-gray-50 to-white p-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Encuentra el repuesto correcto, a la primera.</h1>
        <p className="text-gray-600 mt-2">Busca por código OEM, SKU, categoría o tu vehículo.</p>
        <div className="mt-4">
          <Link href="/catalog" className="underline">Ver catálogo</Link>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">Destacados</h2>
        <ProductGrid items={destacados}/>
      </section>
    </div>
  );
}
