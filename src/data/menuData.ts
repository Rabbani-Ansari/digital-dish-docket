import { MenuItem } from "@/types";
import pizzaImg from "@/assets/pizza.jpg";
import salmonImg from "@/assets/salmon.jpg";
import pastaImg from "@/assets/pasta.jpg";
import dessertImg from "@/assets/dessert.jpg";
import saladImg from "@/assets/salad.jpg";
import burgerImg from "@/assets/burger.jpg";

export const menuItems: MenuItem[] = [
  {
    id: "item_001",
    name: "Margherita Pizza",
    description: "Classic Neapolitan pizza with fresh mozzarella, San Marzano tomatoes, and basil",
    category: "main",
    price: 16.99,
    image: pizzaImg,
    prepTime: 15,
    calories: 850,
    allergens: ["gluten", "dairy"],
    dietary: ["vegetarian"],
    spiceLevel: 0,
    popular: true,
    available: true,
    customizations: [
      {
        id: "crust_type",
        name: "Crust Type",
        type: "radio",
        required: true,
        options: [
          { id: "thin", name: "Thin Crust", priceAdjustment: 0 },
          { id: "thick", name: "Thick Crust", priceAdjustment: 2 },
          { id: "gf", name: "Gluten-Free", priceAdjustment: 4 }
        ]
      },
      {
        id: "extra_toppings",
        name: "Extra Toppings",
        type: "checkbox",
        required: false,
        options: [
          { id: "mushrooms", name: "Mushrooms", priceAdjustment: 2 },
          { id: "olives", name: "Olives", priceAdjustment: 2 },
          { id: "pepperoni", name: "Pepperoni", priceAdjustment: 3 }
        ]
      }
    ],
    nutritionalInfo: {
      protein: 35,
      carbs: 95,
      fat: 28,
      fiber: 6
    },
    ingredients: ["Flour", "Tomatoes", "Mozzarella", "Basil", "Olive Oil"],
    rating: 4.7,
    reviewCount: 328
  },
  {
    id: "item_002",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herb butter, seasonal vegetables, and lemon",
    category: "main",
    price: 24.99,
    image: salmonImg,
    prepTime: 20,
    calories: 620,
    allergens: ["fish"],
    dietary: ["gluten-free", "keto"],
    spiceLevel: 0,
    popular: true,
    available: true,
    customizations: [
      {
        id: "cooking_level",
        name: "Cooking Level",
        type: "radio",
        required: true,
        options: [
          { id: "medium", name: "Medium", priceAdjustment: 0 },
          { id: "well", name: "Well Done", priceAdjustment: 0 }
        ]
      }
    ],
    nutritionalInfo: {
      protein: 48,
      carbs: 12,
      fat: 32,
      fiber: 4
    },
    ingredients: ["Salmon", "Herbs", "Butter", "Vegetables", "Lemon"],
    rating: 4.8,
    reviewCount: 256
  },
  {
    id: "item_003",
    name: "Truffle Pasta",
    description: "Fresh fettuccine with creamy truffle sauce, parmesan, and wild mushrooms",
    category: "main",
    price: 21.99,
    image: pastaImg,
    prepTime: 18,
    calories: 780,
    allergens: ["gluten", "dairy", "eggs"],
    dietary: ["vegetarian"],
    spiceLevel: 0,
    popular: true,
    available: true,
    customizations: [
      {
        id: "pasta_type",
        name: "Pasta Type",
        type: "radio",
        required: true,
        options: [
          { id: "fettuccine", name: "Fettuccine", priceAdjustment: 0 },
          { id: "penne", name: "Penne", priceAdjustment: 0 },
          { id: "gf_pasta", name: "Gluten-Free", priceAdjustment: 3 }
        ]
      },
      {
        id: "protein_add",
        name: "Add Protein",
        type: "radio",
        required: false,
        options: [
          { id: "none", name: "None", priceAdjustment: 0 },
          { id: "chicken", name: "Grilled Chicken", priceAdjustment: 5 },
          { id: "shrimp", name: "Shrimp", priceAdjustment: 7 }
        ]
      }
    ],
    nutritionalInfo: {
      protein: 24,
      carbs: 82,
      fat: 38,
      fiber: 5
    },
    ingredients: ["Pasta", "Truffle Oil", "Mushrooms", "Cream", "Parmesan"],
    rating: 4.9,
    reviewCount: 412
  },
  {
    id: "item_004",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan, croutons, and classic Caesar dressing",
    category: "appetizer",
    price: 12.99,
    image: saladImg,
    prepTime: 10,
    calories: 380,
    allergens: ["gluten", "dairy", "eggs", "fish"],
    dietary: [],
    spiceLevel: 0,
    popular: false,
    available: true,
    customizations: [
      {
        id: "protein_add",
        name: "Add Protein",
        type: "radio",
        required: false,
        options: [
          { id: "none", name: "None", priceAdjustment: 0 },
          { id: "chicken", name: "Grilled Chicken", priceAdjustment: 5 },
          { id: "salmon", name: "Grilled Salmon", priceAdjustment: 8 }
        ]
      }
    ],
    nutritionalInfo: {
      protein: 12,
      carbs: 28,
      fat: 24,
      fiber: 3
    },
    ingredients: ["Romaine", "Parmesan", "Croutons", "Caesar Dressing"],
    rating: 4.5,
    reviewCount: 189
  },
  {
    id: "item_005",
    name: "Gourmet Burger",
    description: "Angus beef patty, aged cheddar, bacon, caramelized onions, special sauce",
    category: "main",
    price: 18.99,
    image: burgerImg,
    prepTime: 15,
    calories: 920,
    allergens: ["gluten", "dairy", "eggs"],
    dietary: [],
    spiceLevel: 1,
    popular: true,
    available: true,
    customizations: [
      {
        id: "cooking_level",
        name: "Cooking Level",
        type: "radio",
        required: true,
        options: [
          { id: "rare", name: "Rare", priceAdjustment: 0 },
          { id: "medium", name: "Medium", priceAdjustment: 0 },
          { id: "well", name: "Well Done", priceAdjustment: 0 }
        ]
      },
      {
        id: "bun_type",
        name: "Bun Type",
        type: "radio",
        required: true,
        options: [
          { id: "regular", name: "Regular", priceAdjustment: 0 },
          { id: "gf", name: "Gluten-Free", priceAdjustment: 2 }
        ]
      },
      {
        id: "extras",
        name: "Extras",
        type: "checkbox",
        required: false,
        options: [
          { id: "extra_cheese", name: "Extra Cheese", priceAdjustment: 2 },
          { id: "avocado", name: "Avocado", priceAdjustment: 3 },
          { id: "fried_egg", name: "Fried Egg", priceAdjustment: 2 }
        ]
      }
    ],
    nutritionalInfo: {
      protein: 45,
      carbs: 58,
      fat: 48,
      fiber: 4
    },
    ingredients: ["Beef", "Cheddar", "Bacon", "Onions", "Bun", "Special Sauce"],
    rating: 4.6,
    reviewCount: 367
  },
  {
    id: "item_006",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, vanilla ice cream, and berry coulis",
    category: "dessert",
    price: 9.99,
    image: dessertImg,
    prepTime: 12,
    calories: 580,
    allergens: ["gluten", "dairy", "eggs"],
    dietary: ["vegetarian"],
    spiceLevel: 0,
    popular: true,
    available: true,
    customizations: [],
    nutritionalInfo: {
      protein: 8,
      carbs: 72,
      fat: 28,
      fiber: 3
    },
    ingredients: ["Chocolate", "Flour", "Butter", "Eggs", "Sugar", "Vanilla Ice Cream"],
    rating: 4.9,
    reviewCount: 421
  }
];
