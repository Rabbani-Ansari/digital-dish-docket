import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/CartContext";
import { useNavigate } from "react-router-dom";
import { restaurantData } from "@/data/restaurantData";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">
              {restaurantData.name.charAt(0)}
            </span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-heading font-bold text-lg">{restaurantData.name}</h1>
            <p className="text-xs text-muted-foreground">{restaurantData.cuisine.join(" • ")}</p>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search menu..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 cart-bounce">
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};
