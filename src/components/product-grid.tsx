import { ProductCard } from "./product-card";

export function ProductGrid({items}:{items:any[]}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p:any)=> <ProductCard key={p.slug} p={p}/>)}
    </div>
  );
}
