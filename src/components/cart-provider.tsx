"use client";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type Item = { id: string; qty: number };
type CartCtx = {
  items: Item[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};
const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const api = useMemo<CartCtx>(() => ({
    items,
    add: (id, qty = 1) =>
      setItems(prev => {
        const i = prev.findIndex(p => p.id === id);
        if (i >= 0) {
          const copy = [...prev]; copy[i] = { ...copy[i], qty: copy[i].qty + qty };
          return copy;
        }
        return [...prev, { id, qty }];
      }),
    remove: id => setItems(prev => prev.filter(p => p.id !== id)),
    setQty: (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p)),
    clear: () => setItems([])
  }), [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
