"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { allProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const BLUE = "text-blue-600";
const BLUE_BG = "bg-blue-50";
const BLUE_BORDER = "border-blue-200";
const PAGE_SIZE = 12;
type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

/** Lee params desde la URL y los entrega tipados */
function useCatalogParams() {
  const sp = useSearchParams();

  return {
    q: (sp.get("q") ?? "").trim(),
    brand: sp.get("brand") ?? "",
    compat: sp.get("compat") ?? "",
    min: sp.get("min") ? Number(sp.get("min")) : undefined,
    max: sp.get("max") ? Number(sp.get("max")) : undefined,
    sort: (sp.get("sort") ?? "relevance") as SortOption,
    page: sp.get("page") ? Number(sp.get("page")) : 1,
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
  const [sort, setSort] = useState<SortOption>(params.sort);
  const [page, setPage] = useState(Math.max(1, params.page));
  const [showFilters, setShowFilters] = useState(false);
  const [garage, setGarage] = useState({
    owner: "",
    brand: "Jeep",
    model: "Wrangler",
    year: "2020",
    plate: "",
  });

  // Carga garaje guardado
  useEffect(() => {
    const saved = localStorage.getItem("garage-profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGarage((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Error leyendo garaje", error);
      }
    }
  }, []);

  // Mantén inputs sincronizados si cambian por navegación
  useEffect(() => {
    setQ(params.q);
    setBrand(params.brand);
    setCompat(params.compat);
    setMin(params.min);
    setMax(params.max);
    setSort(params.sort);
    setPage(Math.max(1, params.page));
  }, [
    params.q,
    params.brand,
    params.compat,
    params.min,
    params.max,
    params.sort,
    params.page,
  ]);

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pagedItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilters = [
    q && { label: `Búsqueda: "${q}"`, onClear: () => setQ("") },
    brand && { label: `Marca: ${brand}`, onClear: () => setBrand("") },
    compat && { label: `Compatibilidad: ${compat}`, onClear: () => setCompat("") },
    typeof min === "number" && {
      label: `Mín: ${min} USD`,
      onClear: () => setMin(undefined),
    },
    typeof max === "number" && {
      label: `Máx: ${max} USD`,
      onClear: () => setMax(undefined),
    },
    sort !== "relevance" && {
      label: `Orden: ${sort}`,
      onClear: () => setSort("relevance"),
    },
  ].filter(Boolean) as { label: string; onClear: () => void }[];

  const garageVehicles = {
    Jeep: ["Wrangler", "Grand Cherokee", "Compass"],
    Dodge: ["Durango", "RAM 1500"],
    Fiat: ["Toro", "Pulse"],
  } as const;

  const pushParams = (nextPage: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (brand) sp.set("brand", brand);
    if (compat) sp.set("compat", compat);
    if (typeof min === "number") sp.set("min", String(min));
    if (typeof max === "number") sp.set("max", String(max));
    if (sort && sort !== "relevance") sp.set("sort", sort);
    if (nextPage > 1) sp.set("page", String(nextPage));
    router.push(`/catalog${sp.toString() ? "?" + sp.toString() : ""}`);
  };

  // Construye URL con filtros
  const applyFilters = () => {
    setPage(1);
    pushParams(1);
  };

  const clearFilters = () => {
    setQ("");
    setBrand("");
    setCompat("");
    setMin(undefined);
    setMax(undefined);
    setSort("relevance");
    setPage(1);
    router.push("/catalog");
  };

  const applyGarage = () => {
    const compatQuery = `${garage.brand} ${garage.model} ${garage.year}`;
    setCompat(compatQuery);
    localStorage.setItem("garage-profile", JSON.stringify(garage));
    setPage(1);
    pushParams(1);
  };

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage || 1), totalPages);
    setPage(clamped);
    pushParams(clamped);
  };

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      {/* Encabezado compacto con buscador y CTA de filtros */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-100 p-5 md:p-7 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Catálogo inteligente</p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Encuentra el repuesto perfecto sin ruido visual
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl">
              Ajusta la búsqueda sin perder contexto: filtros plegables, garaje del cliente y paginación para navegar catálogos extensos.
            </p>
          </div>

          <div className="flex w-full md:w-auto flex-col gap-2 md:flex-row md:items-center">
            <div className="relative w-full md:min-w-[360px]">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Código OEM, SKU, modelo o palabra clave"
                className="w-full rounded-2xl border px-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-inner"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={applyFilters}
                className="rounded-2xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition shadow"
              >
                Buscar
              </button>
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="rounded-2xl px-4 py-2 border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 transition flex items-center gap-2"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filtros
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Layout con sidebar plegable */}
      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 items-start">
        {/* Sidebar filtros */}
        <aside
          className={`rounded-2xl border ${BLUE_BORDER} ${BLUE_BG} p-4 md:p-5 shadow-sm transition-all duration-200 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold">Panel de filtros</h2>
              <p className="text-xs text-gray-500">Activa solo lo necesario; todo es editable.</p>
            </div>
            <button
              onClick={clearFilters}
              className="text-xs underline hover:opacity-80"
            >
              Limpiar
            </button>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((f) => (
                <button
                  key={f.label}
                  onClick={f.onClear}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs text-blue-700 hover:bg-blue-100"
                >
                  {f.label}
                  <span className="text-gray-400">×</span>
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {/* Marca */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Marca</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="">Todas</option>
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Compatibilidad libre */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Compatibilidad</label>
              <input
                value={compat}
                onChange={(e) => setCompat(e.target.value)}
                placeholder="Ej: Wrangler 2018"
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            {/* Precio USD (del inventario) */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Precio (USD)</label>
              <div className="flex items-center gap-2">
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
            </div>

            {/* Orden */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Ordenar por</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre: A → Z</option>
                <option value="name-desc">Nombre: Z → A</option>
              </select>
            </div>

            <div className="pt-1">
              <button
                onClick={applyFilters}
                className="w-full rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Aplicar filtros
              </button>
              <p className="mt-2 text-xs text-gray-500">
                * Los precios base están en USD. Las tarjetas muestran CLP con tipo de cambio estimado.
              </p>
            </div>
          </div>

          {/* Garaje del usuario */}
          <div className="mt-6 rounded-2xl bg-white border border-blue-100 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Garaje del cliente</p>
                <h3 className="font-semibold">Vehículo objetivo</h3>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">Nuevo</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                value={garage.owner}
                onChange={(e) => setGarage((prev) => ({ ...prev, owner: e.target.value }))}
                placeholder="Cliente o flota"
                className="col-span-2 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />

              <select
                value={garage.brand}
                onChange={(e) =>
                  setGarage((prev) => ({
                    ...prev,
                    brand: e.target.value,
                    model:
                      garageVehicles[e.target.value as keyof typeof garageVehicles]?.[0] ?? "",
                  }))
                }
                className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              >
                {Object.keys(garageVehicles).map((brandOption) => (
                  <option key={brandOption} value={brandOption}>
                    {brandOption}
                  </option>
                ))}
              </select>

              <select
                value={garage.model}
                onChange={(e) => setGarage((prev) => ({ ...prev, model: e.target.value }))}
                className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              >
                {(garageVehicles[garage.brand as keyof typeof garageVehicles] ?? []).map((modelOption) => (
                  <option key={modelOption} value={modelOption}>
                    {modelOption}
                  </option>
                ))}
              </select>

              <input
                value={garage.year}
                onChange={(e) => setGarage((prev) => ({ ...prev, year: e.target.value }))}
                placeholder="Año"
                className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />

              <input
                value={garage.plate}
                onChange={(e) => setGarage((prev) => ({ ...prev, plate: e.target.value }))}
                placeholder="Patente / VIN"
                className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 col-span-2"
              />
            </div>

            <button
              onClick={applyGarage}
              className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition"
            >
              Usar vehículo como filtro
            </button>

            <p className="text-xs text-gray-500">
              Guardamos los datos en este navegador para que el siguiente ingreso parta con el mismo vehículo.
            </p>
          </div>
        </aside>

        {/* Grid de productos */}
        <section className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Mostrando <span className={BLUE}>{filtered.length}</span> resultados — página {page} de {totalPages}
              </p>
              {compat && (
                <p className="text-xs text-blue-700">Filtrado por compatibilidad con «{compat}»</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => goToPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-full border border-blue-200 bg-white px-3 py-1 text-sm disabled:opacity-50"
              >
                ← Anterior
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Página</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={page}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="w-16 rounded-lg border px-2 py-1 text-center text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
                <span className="text-gray-500">de {totalPages}</span>
              </div>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="rounded-full border border-blue-200 bg-white px-3 py-1 text-sm disabled:opacity-50"
              >
                Siguiente →
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pagedItems.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap gap-2 items-center justify-center pt-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`rounded-full px-3 py-1 text-sm border ${
                      pageNumber === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
