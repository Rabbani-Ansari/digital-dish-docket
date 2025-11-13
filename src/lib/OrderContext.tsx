import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order, CartItem } from "@/types";

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getSessionOrders: () => Order[];
  clearOldOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const getSessionId = () => {
  let sessionId = localStorage.getItem('customer_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('customer_session_id', sessionId);
  }
  return sessionId;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('restaurant_orders');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurant_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderNumber: `#${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getSessionOrders = () => {
    const sessionId = getSessionId();
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
    
    return orders.filter(order => {
      const orderTime = new Date(order.createdAt).getTime();
      return orderTime > twentyFourHoursAgo;
    });
  };

  const clearOldOrders = () => {
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
    setOrders(prev => 
      prev.filter(order => {
        const orderTime = new Date(order.createdAt).getTime();
        return orderTime > twentyFourHoursAgo;
      })
    );
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrderStatus, 
      getSessionOrders,
      clearOldOrders 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
