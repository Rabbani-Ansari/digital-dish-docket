import { useState, useEffect } from "react";
import { MenuItem, MenuCategory } from "@/types";
import { menuItems } from "@/data/menuData";
import { SpinWheel } from "./SpinWheel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import { X, Sparkles, ShoppingCart, RotateCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DietaryFilter = "all" | "vegetarian" | "vegan" | "non-veg";
type PriceFilter = "all" | "under-200" | "200-500" | "above-500";

export const SpinWheelModal = ({ isOpen, onClose }: SpinWheelModalProps) => {
  const [categoryFilter, setCategoryFilter] = useState<MenuCategory | "all">("all");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<MenuItem | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    // Load saved filters
    const savedCategory = localStorage.getItem("spinWheel_category") as MenuCategory | "all";
    const savedDietary = localStorage.getItem("spinWheel_dietary") as DietaryFilter;
    const savedPrice = localStorage.getItem("spinWheel_price") as PriceFilter;
    
    if (savedCategory) setCategoryFilter(savedCategory);
    if (savedDietary) setDietaryFilter(savedDietary);
    if (savedPrice) setPriceFilter(savedPrice);
  }, []);

  useEffect(() => {
    let filtered = menuItems.filter(item => item.available);

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Dietary filter
    if (dietaryFilter === "vegetarian") {
      filtered = filtered.filter(item => item.dietary.includes("vegetarian"));
    } else if (dietaryFilter === "vegan") {
      filtered = filtered.filter(item => item.dietary.includes("vegan"));
    } else if (dietaryFilter === "non-veg") {
      filtered = filtered.filter(item => 
        !item.dietary.includes("vegetarian") && !item.dietary.includes("vegan")
      );
    }

    // Price filter
    if (priceFilter === "under-200") {
      filtered = filtered.filter(item => item.price < 200);
    } else if (priceFilter === "200-500") {
      filtered = filtered.filter(item => item.price >= 200 && item.price <= 500);
    } else if (priceFilter === "above-500") {
      filtered = filtered.filter(item => item.price > 500);
    }

    setFilteredItems(filtered);
  }, [categoryFilter, dietaryFilter, priceFilter]);

  const handleSpin = () => {
    if (filteredItems.length < 3) {
      toast.error("Please select filters that show at least 3 items!");
      return;
    }

    // Save filters
    localStorage.setItem("spinWheel_category", categoryFilter);
    localStorage.setItem("spinWheel_dietary", dietaryFilter);
    localStorage.setItem("spinWheel_price", priceFilter);

    setIsSpinning(true);
    setResult(null);
    setShowConfetti(false);
  };

  const handleSpinComplete = (item: MenuItem) => {
    setIsSpinning(false);
    setResult(item);
    setShowConfetti(true);
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleAddToCart = () => {
    if (result) {
      addItem(result, {}, "");
      toast.success(`${result.name} added to cart!`);
    }
  };

  const handleSpinAgain = () => {
    setResult(null);
    setShowConfetti(false);
  };

  const handleClose = () => {
    setResult(null);
    setShowConfetti(false);
    setIsSpinning(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50"
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Confetti effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-fade-in"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10px`,
                    animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                    fontSize: `${20 + Math.random() * 20}px`,
                  }}
                >
                  {["🎉", "✨", "🎊", "⭐", "🌟"][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}

          <div className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-primary" />
                What Should I Eat?
              </h2>
              <p className="text-muted-foreground mt-2">
                Let fate decide your delicious destiny!
              </p>
            </div>

            {/* Filters */}
            {!result && (
              <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "appetizer", "main", "dessert", "beverage"] as const).map((cat) => (
                      <Button
                        key={cat}
                        variant={categoryFilter === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategoryFilter(cat)}
                      >
                        {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Dietary Preference</label>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "vegetarian", "vegan", "non-veg"] as const).map((diet) => (
                      <Button
                        key={diet}
                        variant={dietaryFilter === diet ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDietaryFilter(diet)}
                      >
                        {diet === "all" ? "All" : diet === "non-veg" ? "Non-Veg" : diet.charAt(0).toUpperCase() + diet.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Price Range</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={priceFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriceFilter("all")}
                    >
                      All Prices
                    </Button>
                    <Button
                      variant={priceFilter === "under-200" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriceFilter("under-200")}
                    >
                      Under $20
                    </Button>
                    <Button
                      variant={priceFilter === "200-500" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriceFilter("200-500")}
                    >
                      $20-$50
                    </Button>
                    <Button
                      variant={priceFilter === "above-500" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriceFilter("above-500")}
                    >
                      Above $50
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  {filteredItems.length} items available for spinning
                </p>
              </div>
            )}

            {/* Spin Wheel */}
            {!result && filteredItems.length >= 3 && (
              <div className="space-y-4">
                <SpinWheel
                  items={filteredItems.slice(0, 12)}
                  onSpinComplete={handleSpinComplete}
                  isSpinning={isSpinning}
                />
                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="px-8 py-6 text-lg font-bold"
                  >
                    {isSpinning ? "Spinning..." : "SPIN THE WHEEL! 🎡"}
                  </Button>
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
              <Card className="p-6 space-y-4 border-2 border-primary animate-scale-in">
                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                    🎉 Your Destiny Awaits! 🎉
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-heading text-2xl font-bold">{result.name}</h4>
                      <p className="text-lg font-bold text-primary mt-1">
                        ${result.price.toFixed(2)}
                      </p>
                    </div>

                    <p className="text-muted-foreground">{result.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {result.dietary.map((diet) => (
                        <Badge key={diet} variant="secondary">
                          {diet}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={handleSpinAgain}
                      >
                        <RotateCw className="w-5 h-5 mr-2" />
                        Spin Again
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
