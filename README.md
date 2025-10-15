===========================================
🚗 PROYECTO: REPUESTOS RETAIL
===========================================

Tienda web de venta de repuestos automotrices, inspirada en sitios como Lamartine y Repuestos del Sol.
Desarrollada con Next.js 15, React, TypeScript y TailwindCSS.

===========================================
1. DESCRIPCIÓN GENERAL
===========================================

El proyecto es una aplicación web de e-commerce que permite:
- Mostrar productos (nombre, imagen, precio, descripción, compatibilidad).
- Buscar por SKU, OEM o nombre.
- Ver detalles de cada producto.
- Agregar productos al carrito y visualizar el total.
- Simular login y cuenta de usuario (demo).
- Preparar el terreno para base de datos, autenticación real y pagos.

El objetivo es tener una tienda modular, escalable y fácil de mantener.

===========================================
2. TECNOLOGÍAS PRINCIPALES
===========================================

- Next.js 15 (App Router)
- React 18 + TypeScript
- TailwindCSS v4
- Lucide-react (iconos)
- Context API de React (estado del carrito)
- Node.js (entorno)
- Datos locales (archivo TypeScript con mock de productos)

===========================================
3. ESTRUCTURA DE CARPETAS
===========================================

src/
│
├─ app/                      → Sistema de rutas de la aplicación
│  ├─ layout.tsx             → Layout global (Navbar + Footer + CartProvider)
│  ├─ page.tsx               → Página principal (Home)
│  ├─ catalog/page.tsx       → Catálogo de productos
│  ├─ product/[slug]/page.tsx→ Detalle de producto (ruta dinámica)
│  ├─ cart/page.tsx          → Página del carrito de compras
│  ├─ vehicle/page.tsx       → Buscador por vehículo (placeholder)
│  ├─ login/page.tsx         → Login demo (localStorage)
│  └─ account/page.tsx       → Perfil de usuario demo
│
├─ components/               → Componentes reutilizables
│  ├─ navbar.tsx             → Barra superior de navegación
│  ├─ footer.tsx             → Pie de página
│  ├─ product-card.tsx       → Tarjeta de producto individual
│  ├─ product-grid.tsx       → Grilla de productos
│  └─ cart-provider.tsx      → Contexto global del carrito
│
├─ data/
│  └─ products.ts            → Fuente local de productos (mock)
│
├─ lib/
│  └─ format.ts              → Funciones auxiliares (formateo de precios CLP)
│
├─ styles/
│  └─ globals.css            → Estilos globales base con TailwindCSS
│
└─ public/
   ├─ demo/                  → Imágenes de ejemplo de productos
   └─ placeholder.png        → Imagen por defecto

===========================================
4. CÓMO FUNCIONA EL PROYECTO
===========================================

layout.tsx
- Define la estructura global del sitio.
- Carga Navbar y Footer en todas las páginas.
- Usa el CartProvider para que el carrito esté disponible en toda la app.

cart-provider.tsx
- Maneja el estado del carrito con Context API.
- Permite agregar, quitar, vaciar y modificar productos.
- Persistencia opcional en localStorage.

products.ts
- Simula una base de datos con productos.
- Cada producto tiene: id, slug, sku, nombre, marca, categoría, precio, imagen, stock y descripción.

pages (app/)
- Home (page.tsx): muestra productos destacados.
- Catalog: lista general con filtro por búsqueda.
- Product/[slug]: muestra detalles del producto seleccionado.
- Cart: muestra el carrito con subtotales y total.
- Login y Account: flujo de usuario demo con localStorage.
- Vehicle: sección futura para buscar por marca, modelo y año.

===========================================
5. CÓMO AGREGAR O MODIFICAR ELEMENTOS
===========================================

A) Agregar un nuevo producto:
1. Editar src/data/products.ts.
2. Agregar un nuevo objeto dentro del arreglo PRODUCTS.

Ejemplo:
{
  id: "p3",
  slug: "filtro-aire-accent-16",
  sku: "FA-ACC16",
  name: "Filtro de aire Hyundai Accent 1.6",
  brand: "MANN",
  category: "Motor",
  price: 15990,
  image: "/demo/filtro.jpg",
  stock: 20,
  description: "Filtro de aire de alto rendimiento."
}

B) Crear un nuevo componente:
1. Crear archivo en src/components/, por ejemplo searchbar.tsx.
2. Importarlo donde se usará: import { SearchBar } from "@/components/searchbar";
3. Llamarlo en JSX: <SearchBar />

C) Crear una nueva página:
1. Crear carpeta y archivo page.tsx dentro de src/app/.
   Ejemplo: src/app/contacto/page.tsx
2. Exportar un componente React que retorne el contenido.
   export default function Contacto() { return <div>Contacto</div>; }

D) Conectar con base de datos (futuro):
1. Instalar Prisma y configurar PostgreSQL.
2. Crear modelo Product en prisma/schema.prisma.
3. Reemplazar imports de PRODUCTS por consultas a la base de datos.
4. Migrar con: npx prisma migrate dev.

E) Implementar autenticación real:
1. Instalar NextAuth.
2. Crear modelo User en Prisma.
3. Configurar proveedor Credentials (email/contraseña).
4. Reemplazar login demo por NextAuth.

===========================================
6. ESTILO Y FRONTEND
===========================================

- TailwindCSS define el estilo mediante clases.
- Cambiar colores: reemplazar bg-white, text-gray-600, etc.
- Redondear bordes: rounded-xl, rounded-2xl.
- Sombras y animaciones: hover:shadow-md, transition.
- Inputs y botones con focus:ring y outline-none.

Recomendación: mantener consistencia en tipografía y espaciados usando container mx-auto px-4.

===========================================
7. LIMPIEZA DE ARCHIVOS INNECESARIOS
===========================================

Puedes eliminar los siguientes archivos de la plantilla original de Next.js:
- src/app/favicon.ico
- src/app/page.module.css
- src/app/layout.module.css
- src/app/api/ (si existe)
- public/next.svg
- public/vercel.svg
- README.md original (reemplazar por este)

Mantén solo:
- carpeta src/ con tus componentes y páginas
- public/demo/ con tus imágenes
- package.json y archivos de configuración

===========================================
8. COMANDOS BÁSICOS
===========================================

Instalar dependencias:
npm install

Correr en modo desarrollo:
npm run dev

Construir para producción:
npm run build
npm start

Guardar cambios en Git:
git add .
git commit -m "Descripción de los cambios"
git push

===========================================
9. PRÓXIMOS PASOS RECOMENDADOS
===========================================

- Guardar carrito en localStorage (persistencia).
- Implementar checkout real (Webpay o MercadoPago).
- Migrar productos a base de datos (PostgreSQL).
- Integrar NextAuth para usuarios reales.
- Agregar panel administrador con CRUD de productos.
- Crear buscador avanzado con filtros y compatibilidad por vehículo.

===========================================
10. AUTOR
===========================================

Ignacio Vidal
Desarrollo del proyecto Repuestos Retail
GitHub: https://github.com/NachoVidal-14

===========================================
FIN DEL DOCUMENTO
===========================================
