import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { restaurantData } from "@/data/restaurantData";
import { toast } from "@/hooks/use-toast";
import { OrderType } from "@/types";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [tip, setTip] = useState(0.15);

  const tax = subtotal * restaurantData.settings.taxRate;
  const serviceCharge = subtotal * restaurantData.settings.serviceCharge;
  const tipAmount = subtotal * tip;
  const total = subtotal + tax + serviceCharge + tipAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (orderType === "dine-in" && !tableNumber) {
      toast({
        title: "Table number required",
        description: "Please enter your table number.",
        variant: "destructive",
      });
      return;
    }

    if (orderType === "delivery" && !deliveryAddress) {
      toast({
        title: "Delivery address required",
        description: "Please enter your delivery address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate order placement
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    toast({
      title: "Order placed successfully!",
      description: `Your order number is ${orderNumber}. Estimated time: 25-30 minutes.`,
    });

    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="font-heading text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Type</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={orderType} onValueChange={(value) => setOrderType(value as OrderType)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dine-in" id="dine-in" />
                  <Label htmlFor="dine-in" className="cursor-pointer">Dine-in</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="takeout" id="takeout" />
                  <Label htmlFor="takeout" className="cursor-pointer">Takeout</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="cursor-pointer">Delivery</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {orderType === "dine-in" && (
            <Card>
              <CardHeader>
                <CardTitle>Table Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="table">Table Number *</Label>
                  <Input
                    id="table"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {orderType === "delivery" && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Special Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests for your order?"
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[0.15, 0.18, 0.20, 0.25].map((percentage) => (
                  <Button
                    key={percentage}
                    type="button"
                    variant={tip === percentage ? "default" : "outline"}
                    onClick={() => setTip(percentage)}
                  >
                    {(percentage * 100).toFixed(0)}%
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Custom tip amount"
                onChange={(e) => setTip(parseFloat(e.target.value) / subtotal || 0)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    <span>${item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Service Charge</span>
                  <span>${serviceCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tip</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
