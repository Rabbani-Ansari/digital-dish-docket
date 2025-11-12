import { MenuCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Utensils, Coffee, Dessert, Wine } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: MenuCategory | "all";
  onCategoryChange: (category: MenuCategory | "all") => void;
}

const categories = [
  { id: "all" as const, label: "All", icon: Utensils },
  { id: "appetizer" as const, label: "Appetizers", icon: Coffee },
  { id: "main" as const, label: "Mains", icon: Utensils },
  { id: "dessert" as const, label: "Desserts", icon: Dessert },
  { id: "beverage" as const, label: "Beverages", icon: Wine },
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;

        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className={cn(
              "whitespace-nowrap",
              isSelected && "shadow-[var(--shadow-card)]"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};
