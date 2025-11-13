import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useTable } from "@/lib/TableContext";
import { useOrders } from "@/lib/OrderContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { restaurantData } from "@/data/restaurantData";
import { toast } from "@/hooks/use-toast";
import { UtensilsCrossed } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { tableNumber } = useTable();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [specialInstructions, setSpecialInstructions] = useState("");

  const tax = subtotal * restaurantData.settings.taxRate;
  const serviceCharge = subtotal * restaurantData.settings.serviceCharge;
  const total = subtotal + tax + serviceCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tableNumber) {
      toast({
        title: "Table number missing",
        description: "Please refresh and scan the QR code at your table.",
        variant: "destructive",
      });
      return;
    }

    // Create order object
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    
    addOrder({
      items: items,
      customer: {
        name: "In-Store Customer",
        phone: "",
      },
      orderType: 'dine-in' as const,
      tableNumber: tableNumber,
      subtotal: subtotal,
      tax: tax,
      serviceCharge: serviceCharge,
      tip: 0,
      total: total,
      status: 'pending' as const,
      paymentMethod: "Pay at Counter",
      paymentStatus: 'pending' as const,
      estimatedTime: Math.floor(15 + Math.random() * 10), // Random 15-25 minutes
      specialInstructions: specialInstructions,
    });

    toast({
      title: "Order sent to kitchen!",
      description: `Order #${orderNumber} for Table ${tableNumber}. Your food will be ready in 15-25 minutes.`,
    });

    clearCart();
    navigate("/my-orders");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold">Confirm Your Order</h1>
        <p className="text-muted-foreground mt-1">Table {tableNumber}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm border-b pb-2 last:border-0">
                  <div className="flex-1">
                    <div className="font-medium">{item.quantity}x {item.menuItem.name}</div>
                    {item.specialInstructions && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Note: {item.specialInstructions}
                      </div>
                    )}
                  </div>
                  <span className="font-medium">${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ({(restaurantData.settings.taxRate * 100).toFixed(0)}%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Charge ({(restaurantData.settings.serviceCharge * 100).toFixed(0)}%)</span>
                <span>${serviceCharge.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Special Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="instructions" className="text-sm text-muted-foreground">
              Any allergies or special requests?
            </Label>
            <Textarea
              id="instructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., No onions, extra spicy..."
              rows={3}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>💳 You'll pay at the counter after your meal</p>
          <p className="mt-1">🔔 Your order will be sent directly to the kitchen</p>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Send Order to Kitchen
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
