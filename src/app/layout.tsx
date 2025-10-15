import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";

export const metadata: Metadata = {
  title: "Repuestos Retail",
  description: "Encuentra repuestos por código u opción de vehículo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* ← aquí las clases Tailwind */}
      <body className="bg-white text-gray-900">
        <CartProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
