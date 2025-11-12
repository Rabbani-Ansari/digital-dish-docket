import { Restaurant } from "@/types";

export const restaurantData: Restaurant = {
  id: "rest_001",
  name: "Bella Vista Bistro",
  logo: "/placeholder.svg",
  description: "Contemporary Italian cuisine with a modern twist",
  cuisine: ["Italian", "Mediterranean", "Contemporary"],
  contactInfo: {
    phone: "+1 (555) 123-4567",
    email: "info@bellavistabistro.com",
    address: "123 Culinary Lane, Food City, FC 12345"
  },
  operatingHours: {
    monday: { open: "11:00", close: "22:00" },
    tuesday: { open: "11:00", close: "22:00" },
    wednesday: { open: "11:00", close: "22:00" },
    thursday: { open: "11:00", close: "23:00" },
    friday: { open: "11:00", close: "23:30" },
    saturday: { open: "10:00", close: "23:30" },
    sunday: { open: "10:00", close: "21:00" }
  },
  settings: {
    taxRate: 0.08,
    serviceCharge: 0.05,
    currency: "USD",
    acceptsOrders: true
  }
};
