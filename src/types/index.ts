export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  description: string;
  cuisine: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  operatingHours: {
    [day: string]: { open: string; close: string };
  };
  settings: {
    taxRate: number;
    serviceCharge: number;
    currency: string;
    acceptsOrders: boolean;
  };
}

export type MenuCategory = 'appetizer' | 'main' | 'dessert' | 'beverage';
export type DietaryTag = 'vegan' | 'vegetarian' | 'gluten-free' | 'keto' | 'dairy-free';
export type SpiceLevel = 0 | 1 | 2 | 3;

export interface Customization {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  options: {
    id: string;
    name: string;
    priceAdjustment: number;
  }[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  image: string;
  images?: string[];
  prepTime: number;
  calories: number;
  allergens: string[];
  dietary: DietaryTag[];
  spiceLevel: SpiceLevel;
  popular: boolean;
  available: boolean;
  customizations: Customization[];
  nutritionalInfo: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  ingredients: string[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedCustomizations: {
    [customizationId: string]: string | string[];
  };
  specialInstructions: string;
  subtotal: number;
}

export type OrderType = 'dine-in' | 'takeout' | 'delivery';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  tip: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  estimatedTime: number;
  specialInstructions?: string;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedAddresses: Address[];
  dietaryRestrictions: string[];
  allergens: string[];
  favoriteItems: string[];
  orderHistory: Order[];
  loyaltyPoints: number;
  loyaltyTier: LoyaltyTier;
}

export interface Review {
  id: string;
  menuItemId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: string;
  helpful: number;
}
