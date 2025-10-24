"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  rating?: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getTotalItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Use useCallback to prevent function recreation on every render
  const addItem = useCallback((item: WishlistItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If item is already in wishlist, remove it (toggle behavior)
        return prevItems.filter((i) => i.id !== item.id);
      } else {
        // Add item to wishlist
        return [...prevItems, item];
      }
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  // Memoize these functions to prevent unnecessary re-renders
  const isInWishlist = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id);
    },
    [items]
  );

  const getTotalItems = useCallback(() => {
    return items.length;
  }, [items]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      isInWishlist,
      getTotalItems,
    }),
    [items, addItem, removeItem, isInWishlist, getTotalItems]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
