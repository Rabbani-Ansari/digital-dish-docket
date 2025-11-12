import { MenuItem } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Flame, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ItemDetailsModalProps {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}

export const ItemDetailsModal = ({ item, open, onClose }: ItemDetailsModalProps) => {
  const { addItem } = useCart();
  const [customizations, setCustomizations] = useState<any>({});
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleAddToCart = () => {
    // Validate required customizations
    const missingRequired = item.customizations.some(
      (custom) => custom.required && !customizations[custom.id]
    );

    if (missingRequired) {
      return;
    }

    addItem(item, customizations, specialInstructions);
    onClose();
    setCustomizations({});
    setSpecialInstructions("");
  };

  const handleRadioChange = (customizationId: string, optionId: string) => {
    setCustomizations((prev: any) => ({
      ...prev,
      [customizationId]: optionId,
    }));
  };

  const handleCheckboxChange = (customizationId: string, optionId: string, checked: boolean) => {
    setCustomizations((prev: any) => {
      const current = prev[customizationId] || [];
      if (checked) {
        return { ...prev, [customizationId]: [...current, optionId] };
      } else {
        return {
          ...prev,
          [customizationId]: current.filter((id: string) => id !== optionId),
        };
      }
    });
  };

  const calculateTotal = () => {
    let total = item.price;

    item.customizations.forEach((custom) => {
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

    return total;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-food text-2xl">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <img
            src={item.image}
            alt={item.name}
            className="w-full aspect-[16/9] object-cover rounded-lg"
          />

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{item.rating}</span>
              <span className="text-muted-foreground">({item.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{item.prepTime} min</span>
            </div>
            {item.spiceLevel > 0 && (
              <div className="flex items-center gap-1">
                {Array.from({ length: item.spiceLevel }, (_, i) => (
                  <Flame key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            )}
            <span className="font-bold text-xl text-primary ml-auto">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-muted-foreground">{item.description}</p>

          {item.allergens.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Contains: {item.allergens.join(", ")}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-wrap gap-2">
            {item.dietary.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Customizations */}
          {item.customizations.map((custom) => (
            <div key={custom.id} className="space-y-3">
              <Label className="text-base font-semibold">
                {custom.name}
                {custom.required && <span className="text-destructive ml-1">*</span>}
              </Label>

              {custom.type === "radio" ? (
                <RadioGroup
                  value={customizations[custom.id]}
                  onValueChange={(value) => handleRadioChange(custom.id, value)}
                >
                  {custom.options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="font-normal cursor-pointer">
                          {option.name}
                        </Label>
                      </div>
                      {option.priceAdjustment !== 0 && (
                        <span className="text-sm text-muted-foreground">
                          +${option.priceAdjustment.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {custom.options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={(customizations[custom.id] || []).includes(option.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(custom.id, option.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={option.id} className="font-normal cursor-pointer">
                          {option.name}
                        </Label>
                      </div>
                      {option.priceAdjustment !== 0 && (
                        <span className="text-sm text-muted-foreground">
                          +${option.priceAdjustment.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Any special requests? (e.g., no onions, extra sauce)"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          <Button
            className="w-full"
            size="lg"
            variant="hero"
            onClick={handleAddToCart}
            disabled={!item.available}
          >
            Add to Cart - ${calculateTotal().toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
