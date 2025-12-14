import { ProductCard } from "./product-card";
import { type Producto } from "@/lib/products";

export function ProductGrid({ items }: { items: Producto[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
