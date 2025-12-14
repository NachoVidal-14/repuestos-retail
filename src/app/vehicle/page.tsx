"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { allProducts } from "@/lib/products";

const vehicles = {
  Jeep: {
    Wrangler: ["2018", "2019", "2020", "2021"],
    "Grand Cherokee": ["2017", "2018", "2019"],
  },
  Dodge: {
    Durango: ["2016", "2017", "2018", "2019"],
    "RAM 1500": ["2015", "2016", "2017", "2018"],
  },
  Fiat: {
    Toro: ["2020", "2021"],
    Pulse: ["2022", "2023"],
  },
};

export default function VehiclePage() {
  const [brand, setBrand] = useState<keyof typeof vehicles>("Jeep");
  const [model, setModel] = useState<string>("Wrangler");
  const [year, setYear] = useState("2020");
  const [notes, setNotes] = useState("");

  const products = useMemo(() => allProducts(), []);

  const matches = useMemo(
    () =>
      products.filter((p) => {
        const label = `${brand} ${model} ${year}`.toLowerCase();
        return (
          p.compat?.some((c) => c.toLowerCase().includes(label)) ||
          p.name.toLowerCase().includes(model.toLowerCase())
        );
      }),
    [brand, model, year, products]
  );

  const models = Object.keys(vehicles[brand]);
  const years = vehicles[brand][model as keyof (typeof vehicles)[typeof brand]] ?? [];

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold">Búsqueda guiada</p>
        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Encuentra repuestos por tu vehículo</h1>
            <p className="text-sm text-gray-600 max-w-2xl">
              Selecciona marca, modelo y año. Calculamos compatibilidades y guardamos notas de cliente para tus siguientes cotizaciones.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white border border-blue-100 px-4 py-2 shadow-inner">
            <Search className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-800 font-medium">Catálogo filtrado en vivo</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6">
        <div className="rounded-2xl border border-blue-100 bg-white shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Perfil del vehículo</h2>
            <span className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">Cliente</span>
          </div>

          <label className="text-sm font-medium">Marca</label>
          <select
            value={brand}
            onChange={(e) => {
              const nextBrand = e.target.value as keyof typeof vehicles;
              const firstModel = Object.keys(vehicles[nextBrand])[0];
              setBrand(nextBrand);
              setModel(firstModel);
              setYear(vehicles[nextBrand][firstModel as keyof (typeof vehicles)[typeof nextBrand]][0]);
            }}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
          >
            {Object.keys(vehicles).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium">Modelo</label>
          <select
            value={model}
            onChange={(e) => {
              const nextModel = e.target.value;
              setModel(nextModel);
              setYear(vehicles[brand][nextModel as keyof (typeof vehicles)[typeof brand]][0]);
            }}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
          >
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium">Año</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium">Notas del usuario / flota</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej: necesita instalación a domicilio, preferir Mopar."
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          />

          <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-sm text-blue-900">
            <p className="font-semibold">Resumen</p>
            <p>{brand} {model} {year}</p>
            {notes && <p className="text-blue-700">Notas: {notes}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Resultados compatibles</h2>
              <p className="text-sm text-gray-600">{matches.length} repuestos alineados con tu selección.</p>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>Filtrado por: {brand} / {model} / {year}</p>
              {notes && <p className="text-blue-700">Notas visibles en la cotización.</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {matches.map((p) => (
              <div key={p.slug} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-xs text-blue-600 font-semibold">{p.brand ?? "Sin marca"}</p>
                <p className="font-semibold leading-tight">{p.name}</p>
                <p className="text-sm text-gray-500">Compatibilidad: {(p.compat ?? []).join(", ") || "No declarada"}</p>
                <p className="text-sm font-semibold text-blue-700 mt-1">${p.price.toFixed(2)} USD</p>
              </div>
            ))}
          </div>

          {matches.length === 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              No encontramos compatibilidades exactas. Ajusta marca, modelo o año y vuelve a intentar.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
