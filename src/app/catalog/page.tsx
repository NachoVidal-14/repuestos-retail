import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product-grid";

export default function Catalog({ searchParams }:{ searchParams: Record<string,string|undefined> }) {
  const q = (searchParams.query ?? "").toLowerCase();
  const items = PRODUCTS.filter(p =>
    !q ||
    p.name.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q) ||
    (p.oemCode ?? "").toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.brand ?? "").toLowerCase().includes(q)
  );
  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">{items.length} resultado(s)</div>
      <ProductGrid items={items}/>
    </div>
  );
}
