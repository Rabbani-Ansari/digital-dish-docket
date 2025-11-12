import { MenuItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Flame } from "lucide-react";
import { useState } from "react";
import { ItemDetailsModal } from "./ItemDetailsModal";

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getSpiceIcons = (level: number) => {
    return Array.from({ length: level }, (_, i) => (
      <Flame key={i} className="w-3 h-3 fill-primary text-primary" />
    ));
  };

  return (
    <>
      <Card className="food-card overflow-hidden cursor-pointer group" onClick={() => setShowDetails(true)}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {item.popular && (
            <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
              Popular
            </Badge>
          )}
          {!item.available && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">Unavailable</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-food text-lg font-semibold line-clamp-1">{item.name}</h3>
            <span className="text-lg font-bold text-primary whitespace-nowrap">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>

          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{item.rating}</span>
              <span>({item.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{item.prepTime} min</span>
            </div>
            {item.spiceLevel > 0 && (
              <div className="flex items-center gap-0.5">{getSpiceIcons(item.spiceLevel)}</div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {item.dietary.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Button
            className="w-full"
            variant="default"
            disabled={!item.available}
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(true);
            }}
          >
            {item.customizations.length > 0 ? "Customize & Add" : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>

      <ItemDetailsModal
        item={item}
        open={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};
