import INVENTARIO from "@/data/inventario.json";

export type Producto = {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand?: string;
  image: string;
  description?: string;
  compat?: string[];
};

export function allProducts(): Producto[] {
  return (INVENTARIO as any[]).map((p) => ({
    id: p.codigo,
    slug: p.codigo,
    name: p.nombre,
    price: p.precio_usd ?? 0,
    brand: p.marca,
    image: p.image ?? "/placeholder.png",
    description: p.compat_list?.length
      ? `Compatibilidades: ${p.compat_list.join(", ")}`
      : "",
    compat: p.compat_list ?? [],
  }));
}

export function findProduct(idOrSlug: string): Producto | undefined {
  return allProducts().find(
    (p) => p.slug === idOrSlug || p.id === idOrSlug
  );
}
