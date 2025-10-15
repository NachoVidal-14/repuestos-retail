export type Product = {
  id: string; slug: string; sku: string;
  name: string; brand?: string; price: number;
  image?: string; category: string; oemCode?: string;
  stock: number; description?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "bomba-agua-accent-16",
    sku: "BW-AC16-001",
    name: "Bomba de agua Hyundai Accent 1.6",
    brand: "Gates",
    price: 54990,
    image: "/demo/bomba.jpg",
    category: "Motor",
    oemCode: "25100-2B000",
    stock: 12,
    description: "Compatibilidad: Accent 1.6 MPI. Garantía 6 meses."
  },
  {
    id: "p2",
    slug: "pastillas-freno-ceramicas",
    sku: "PF-CER-002",
    name: "Pastillas de freno cerámicas",
    brand: "ACDelco",
    price: 29990,
    image: "/demo/pastillas.jpg",
    category: "Frenos",
    stock: 30,
    description: "Bajo polvo, buena disipación térmica."
  },
  {
    id: "p3",
    slug: "amortiguador-delantero-derecho-accent-16",
    sku: "AM-ACC16-R",
    name: "Amortiguador delantero derecho Accent 1.6",
    brand: "KYB",
    price: 82990,
    image: "/demo/amortiguador.jpg",   // opcional, o quítalo
    category: "Suspensión",
    oemCode: "54661-1R000",
    stock: 8,
    description: "Mejora estabilidad y confort. Garantía 6 meses."
  }
];
