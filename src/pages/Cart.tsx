import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { restaurantData } from "@/data/restaurantData";

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const tax = subtotal * restaurantData.settings.taxRate;
  const serviceCharge = subtotal * restaurantData.settings.serviceCharge;
  const total = subtotal + tax + serviceCharge;

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-24 h-24 text-muted-foreground mb-4" />
        <h2 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some delicious items to get started!</p>
        <Button variant="hero" onClick={() => navigate("/")}>
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">Your Cart</h1>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Clear All
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-food font-semibold">{item.menuItem.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.menuItem.price.toFixed(2)} each
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  {Object.keys(item.selectedCustomizations).length > 0 && (
                    <div className="text-xs text-muted-foreground mb-2">
                      {Object.entries(item.selectedCustomizations).map(([key, value]) => {
                        const customization = item.menuItem.customizations.find(
                          (c) => c.id === key
                        );
                        if (!customization) return null;

                        if (Array.isArray(value)) {
                          return value.map((v) => {
                            const option = customization.options.find((o) => o.id === v);
                            return option ? (
                              <div key={v}>• {option.name}</div>
                            ) : null;
                          });
                        } else {
                          const option = customization.options.find((o) => o.id === value);
                          return option ? (
                            <div key={key}>• {option.name}</div>
                          ) : null;
                        }
                      })}
                    </div>
                  )}

                  {item.specialInstructions && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Note: {item.specialInstructions}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-primary">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="font-heading text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax ({(restaurantData.settings.taxRate * 100).toFixed(0)}%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Service Charge ({(restaurantData.settings.serviceCharge * 100).toFixed(0)}%)</span>
              <span>${serviceCharge.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>

          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
