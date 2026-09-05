import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { gelatos, type Gelato } from "./shop-data";

type CartLine = { id: string; qty: number };

type ShopContextValue = {
  cart: CartLine[];
  favorites: string[];
  cartCount: number;
  subtotal: number;
  cartItems: Array<{ gelato: Gelato; qty: number }>;
  favoriteItems: Gelato[];
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "gelato-cart";
const FAV_KEY = "gelato-favorites";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const f = localStorage.getItem(FAV_KEY);
      if (c) setCart(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    const cartItems = cart
      .map((line) => {
        const gelato = gelatos.find((g) => g.id === line.id);
        return gelato ? { gelato, qty: line.qty } : null;
      })
      .filter(Boolean) as Array<{ gelato: Gelato; qty: number }>;

    return {
      cart,
      favorites,
      cartItems,
      favoriteItems: favorites
        .map((id) => gelatos.find((g) => g.id === id))
        .filter(Boolean) as Gelato[],
      cartCount: cart.reduce((sum, l) => sum + l.qty, 0),
      subtotal: cartItems.reduce((sum, i) => sum + i.gelato.price * i.qty, 0),
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite: (id: string) => favorites.includes(id),
    };
  }, [cart, favorites, addToCart, setQty, removeFromCart, clearCart, toggleFavorite]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
