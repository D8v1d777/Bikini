import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { WishlistItem } from '../types/index.ts';

const WishlistContext = createContext<{
  items: WishlistItem[];
  toggleWishlist: (productId: string, colorId: string) => void;
  isInWishlist: (productId: string, colorId: string) => boolean;
  clearWishlist: () => void;
} | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem('solun-wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('solun-wishlist', JSON.stringify(items));
  }, [items]);

  const toggleWishlist = (productId: string, colorId: string) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.productId === productId && item.colorId === colorId);
      if (exists) {
        return prev.filter((item) => !(item.productId === productId && item.colorId === colorId));
      }
      return [...prev, { productId, colorId }];
    });
  };

  const isInWishlist = (productId: string, colorId: string) => {
    return items.some((item) => item.productId === productId && item.colorId === colorId);
  };

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}