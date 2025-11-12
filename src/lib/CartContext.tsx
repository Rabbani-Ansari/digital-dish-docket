import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, MenuItem } from "@/types";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, customizations: any, specialInstructions: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const calculateItemSubtotal = (
    menuItem: MenuItem,
    customizations: any,
    quantity: number
  ): number => {
    let total = menuItem.price;

    // Add customization prices
    menuItem.customizations.forEach((custom) => {
      const selected = customizations[custom.id];
      if (custom.type === "radio" && selected) {
        const option = custom.options.find((opt) => opt.id === selected);
        if (option) total += option.priceAdjustment;
      } else if (custom.type === "checkbox" && Array.isArray(selected)) {
        selected.forEach((optionId: string) => {
          const option = custom.options.find((opt) => opt.id === optionId);
          if (option) total += option.priceAdjustment;
        });
      }
    });

    return total * quantity;
  };

  const addItem = (
    item: MenuItem,
    customizations: any,
    specialInstructions: string
  ) => {
    const cartItemId = `${item.id}-${Date.now()}`;
    const quantity = 1;
    const subtotal = calculateItemSubtotal(item, customizations, quantity);

    const newItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity,
      selectedCustomizations: customizations,
      specialInstructions,
      subtotal,
    };

    setItems((prev) => [...prev, newItem]);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const subtotal = calculateItemSubtotal(
            item.menuItem,
            item.selectedCustomizations,
            quantity
          );
          return { ...item, quantity, subtotal };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
