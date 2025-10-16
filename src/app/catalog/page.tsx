"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { allProducts, type Producto } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { clp } from "@/lib/format";

const BLUE = "text-blue-600";
const BLUE_BG = "bg-blue-50";
const BLUE_BORDER = "border-blue-200";

/** Lee params desde la URL y los entrega tipados */
function useCatalogParams() {
  const sp = useSearchParams();

  return {
    q: (sp.get("q") ?? "").trim(),
    brand: sp.get("brand") ?? "",
    compat: sp.get("compat") ?? "",
    min: sp.get("min") ? Number(sp.get("min")) : undefined,
    max: sp.get("max") ? Number(sp.get("max")) : undefined,
    sort: (sp.get("sort") ?? "relevance") as
      | "relevance"
      | "price-asc"
      | "price-desc"
      | "name-asc"
      | "name-desc",
  };
}

export default function CatalogPage() {
  const router = useRouter();
  const params = useCatalogParams();
  const [q, setQ] = useState(params.q);
  const [brand, setBrand] = useState(params.brand);
  const [compat, setCompat] = useState(params.compat);
  const [min, setMin] = useState<number | undefined>(params.min);
  const [max, setMax] = useState<number | undefined>(params.max);
  const [sort, setSort] = useState(params.sort);

  // Mantén inputs sincronizados si cambian por navegación
  useEffect(() => {
    setQ(params.q);
    setBrand(params.brand);
    setCompat(params.compat);
    setMin(params.min);
    setMax(params.max);
    setSort(params.sort);
  }, [params.q, params.brand, params.compat, params.min, params.max, params.sort]);

  const items = useMemo(() => allProducts(), []);
  const allBrands = useMemo(
    () =>
      Array.from(
        new Set(items.map((p) => (p.brand ?? "").trim()).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b)),
    [items]
  );

  // Filtrado
  const filtered = useMemo(() => {
    let list = items.slice();

    if (q) {
      const ql = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(ql) ||
          p.slug.toLowerCase().includes(ql) ||
          (p.brand ?? "").toLowerCase().includes(ql) ||
          (p.compat ?? []).some((c) => c.toLowerCase().includes(ql))
      );
    }

    if (brand) {
      list = list.filter((p) => (p.brand ?? "") === brand);
    }

    if (compat) {
      const cl = compat.toLowerCase();
      list = list.filter((p) => (p.compat ?? []).some((c) => c.toLowerCase().includes(cl)));
    }

    if (typeof min === "number") list = list.filter((p) => p.price >= min);
    if (typeof max === "number") list = list.filter((p) => p.price <= max);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "relevance":
      default:
        // Mantén el orden original (por ahora)
        break;
    }

    return list;
  }, [items, q, brand, compat, min, max, sort]);

  // Construye URL con filtros
  const applyFilters = () => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (brand) sp.set("brand", brand);
    if (compat) sp.set("compat", compat);
    if (typeof min === "number") sp.set("min", String(min));
    if (typeof max === "number") sp.set("max", String(max));
    if (sort && sort !== "relevance") sp.set("sort", sort);
    router.push(`/catalog${sp.toString() ? "?" + sp.toString() : ""}`);
  };

  const clearFilters = () => {
    setQ("");
    setBrand("");
    setCompat("");
    setMin(undefined);
    setMax(undefined);
    setSort("relevance");
    router.push("/catalog");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Título y buscador principal */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">
          <span className={BLUE}>Catálogo</span> de productos
        </h1>

        <div className="flex w-full md:w-auto gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, código o compatibilidad…"
            className="w-full md:w-[420px] rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={applyFilters}
            className="rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Layout con sidebar izquierda */}
      <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6">
        {/* Sidebar filtros */}
        <aside className={`rounded-2xl border ${BLUE_BORDER} ${BLUE_BG} p-4 md:p-5`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Filtrar Productos</h2>
            <button
              onClick={clearFilters}
              className="text-xs underline hover:opacity-80"
            >
              Limpiar
            </button>
          </div>

          {/* Marca */}
          <label className="text-sm font-medium">Marca</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 mb-4 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          >
            <option value="">Todas</option>
            {allBrands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Compatibilidad libre */}
          <label className="text-sm font-medium">Compatibilidad</label>
          <input
            value={compat}
            onChange={(e) => setCompat(e.target.value)}
            placeholder="Ej: Wrangler 2018"
            className="mt-1 mb-4 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          />

          {/* Precio USD (del inventario) */}
          <label className="text-sm font-medium">Precio (USD)</label>
          <div className="mt-1 mb-4 flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              value={typeof min === "number" ? min : ""}
              onChange={(e) => setMin(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Mín."
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              inputMode="decimal"
              value={typeof max === "number" ? max : ""}
              onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Máx."
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            />
          </div>

          {/* Orden */}
          <label className="text-sm font-medium">Ordenar por</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          >
            <option value="relevance">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre: A → Z</option>
            <option value="name-desc">Nombre: Z → A</option>
          </select>

          {/* Botón aplicar */}
          <button
            onClick={applyFilters}
            className="mt-5 w-full rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Filtrar
          </button>

          {/* Hint CLP */}
          <p className="mt-4 text-xs text-gray-500">
            * Los precios base están en USD. Puedes mostrar CLP en la tarjeta usando un tipo de cambio fijo (ej: {clp(1000 * 980)} para $1000 USD).
          </p>
        </aside>

        {/* Grid de productos */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">
              Mostrando <span className={BLUE}>{filtered.length}</span> resultados
            </p>
          </div>

          <div
            className="
              grid gap-4 sm:gap-5
              grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            "
          >
            {filtered.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
