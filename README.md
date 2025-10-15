========================================================
🧰 PROYECTO: REPUESTOS RETAIL
========================================================

Tienda web de venta RETAIL de repuestos automotrices, inspirada en sitios como LAMARTINE y REPUESTOS DEL SOL.
Desarrollada con NEXT.JS 15 (App Router), REACT, TYPESCRIPT y TAILWINDCSS.

========================================================
🚀 DESCRIPCIÓN GENERAL
========================================================

Repuestos Retail permite explorar, buscar y comprar repuestos automotrices de forma sencilla.

FUNCIONALIDADES PRINCIPALES:
- Catálogo de productos con búsqueda por nombre, SKU u OEM.
- Detalle individual con imagen, precio, compatibilidad y stock.
- Carrito de compras persistente.
- Simulación de inicio de sesión y cuenta de usuario (localStorage).
- Arquitectura preparada para conectar con base de datos real y pasarela de pago.

========================================================
🧩 TECNOLOGÍAS PRINCIPALES
========================================================

NEXT.JS 15 (App Router) → Enrutamiento, SSR y CSR híbrido.
REACT + TYPESCRIPT → Componentes y tipado estático.
TAILWINDCSS v4 → Estilos utilitarios.
LUCIDE-REACT → Iconos livianos.
CONTEXT API → Manejo de carrito global.
NODE.JS + NPM → Entorno de ejecución y dependencias.

========================================================
🏗️ ESTRUCTURA DEL PROYECTO
========================================================

src/
├─ app/                        Sistema de rutas (App Router)
│  ├─ layout.tsx               Layout global (Navbar + Footer + CartProvider)
│  ├─ page.tsx                 Página principal (Home)
│  ├─ catalog/                 Catálogo general
│  │  └─ page.tsx
│  ├─ product/
│  │  └─ [slug]/page.tsx       Detalle de producto (ruta dinámica)
│  ├─ cart/page.tsx            Página del carrito
│  ├─ vehicle/page.tsx         Buscador por vehículo (placeholder)
│  ├─ login/page.tsx           Login demo
│  └─ account/page.tsx         Perfil de usuario demo
│
├─ components/                 Componentes reutilizables
│  ├─ navbar.tsx
│  ├─ footer.tsx
│  ├─ product-card.tsx
│  ├─ product-grid.tsx
│  └─ cart-provider.tsx
│
├─ data/                       Fuente local de datos
│  └─ products.ts
│
├─ lib/                        Funciones auxiliares
│  └─ format.ts
│
├─ styles/
│  └─ globals.css
│
└─ public/
   ├─ demo/                    Imágenes de ejemplo
   └─ placeholder.png

========================================================
⚙️ FUNCIONAMIENTO
========================================================

layout.tsx
- Define el marco global del sitio.
- Carga Navbar y Footer en todas las páginas.
- Provee el contexto del carrito (CartProvider).

cart-provider.tsx
- Maneja el estado global del carrito con Context API.
- Permite agregar, quitar, modificar y vaciar productos.
- Puede guardar el carrito en localStorage.

products.ts
- Fuente local de productos simulando una base de datos.

Estructura de un producto:
{
  id: string,
  slug: string,      // ruta dinámica /product/[slug]
  sku: string,
  name: string,
  brand: string,
  category: string,
  price: number,
  image?: string,
  stock: number,
  description?: string
}

========================================================
🧰 CÓMO DESARROLLAR O EXTENDER
========================================================

➕ AGREGAR UN NUEVO PRODUCTO:
1. Editar src/data/products.ts
2. Añadir un nuevo objeto al array PRODUCTS

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

Colocar la imagen en public/demo/ o eliminar la propiedad "image".

--------------------------------------------------------
🧱 CREAR UN NUEVO COMPONENTE:
1. Crear archivo en src/components/ (ej: searchbar.tsx)
2. Escribir el componente:
   export function SearchBar() {
     return <input placeholder="Buscar producto..." />;
   }
3. Importarlo donde se usará:
   import { SearchBar } from "@/components/searchbar"
   <SearchBar />

--------------------------------------------------------
🧭 CREAR UNA NUEVA PÁGINA:
1. Crear carpeta y archivo page.tsx dentro de src/app/
   Ejemplo: src/app/contacto/page.tsx
2. Escribir el componente:
   export default function Contacto() { return <div>Contacto</div>; }

Next.js generará automáticamente la ruta /contacto.

========================================================
🗄️ MIGRAR A BASE DE DATOS REAL
========================================================

1. Instalar Prisma:
   npm i @prisma/client
   npm i -D prisma
   npx prisma init

2. Definir el modelo Product en prisma/schema.prisma
3. Configurar la variable DATABASE_URL en .env
4. Ejecutar migración:
   npx prisma migrate dev
5. Reemplazar los imports locales por consultas Prisma:
   import { prisma } from "@/lib/prisma"
   const productos = await prisma.product.findMany()

========================================================
👥 AUTENTICACIÓN REAL (FUTURO)
========================================================

- Sustituir login con localStorage por NextAuth.
- Crear modelo User y Order con Prisma.
- Permitir registro, login y vista de pedidos.

========================================================
💅 ESTILO Y PERSONALIZACIÓN
========================================================

El estilo se maneja completamente con TailwindCSS.
Se pueden ajustar los colores, bordes y sombras usando clases utilitarias.

Ejemplos:
bg-white              → Fondo blanco
text-gray-600         → Texto secundario
rounded-xl            → Bordes redondeados
hover:shadow-md       → Sombra al pasar el mouse
transition            → Animación suave
focus:ring-2          → Anillo de enfoque en inputs

========================================================
🧹 LIMPIEZA DEL BOILERPLATE ORIGINAL
========================================================

Puedes eliminar los siguientes archivos de la plantilla original:

src/app/favicon.ico  
src/app/page.module.css  
src/app/layout.module.css  
src/app/api/ (si existe)  
public/next.svg  
public/vercel.svg  
README.md original  

Mantener solo:
- src/ (páginas y componentes)
- public/demo/ (imágenes)
- package.json, tsconfig.json, tailwind.config.ts, etc.

========================================================
🧾 COMANDOS ÚTILES
========================================================

Instalar dependencias:
npm install

Correr en modo desarrollo:
npm run dev

Compilar para producción:
npm run build
npm start

Guardar y subir cambios a Git:
git add .
git commit -m "Descripción de los cambios"
git push

========================================================
🧭 ROADMAP DE DESARROLLO
========================================================

🧩  Carrito persistente → Guardar en localStorage  
💳  Checkout real → Integrar Webpay o MercadoPago  
🗄️  Base de datos → Migrar productos a PostgreSQL con Prisma  
👥  Usuarios reales → Implementar NextAuth  
🧾  Panel administrador → CRUD de productos e importación CSV  
🔍  Buscador avanzado → Filtros por categoría, marca y compatibilidad  

========================================================
👤 AUTOR
========================================================

IGNACIO VIDAL  
Desarrollador del proyecto Repuestos Retail  
GitHub: https://github.com/NachoVidal-14  

========================================================
🪄 LICENCIA
========================================================

Código abierto bajo licencia MIT.

========================================================
FIN DEL DOCUMENTO
========================================================
