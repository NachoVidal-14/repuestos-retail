import { clp } from "@/lib/format";

export function displayPrice(price: number, currency: "USD"|"CLP", fx: number = 980) {
  if (currency === "USD") {
    // Muestra ambas (recomendado para claridad) o solo USD
    const usd = `$${price.toFixed(2)} USD`;
    const clpEq = clp(price * fx);
    return `${usd} · ${clpEq}`;
  }
  return clp(price);
}
