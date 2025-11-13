import { useNavigate } from "react-router-dom";
import { useOrders } from "@/lib/OrderContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { OrderCard } from "@/components/OrderCard";
import { useEffect } from "react";

const MyOrders = () => {
  const navigate = useNavigate();
  const { getSessionOrders, clearOldOrders } = useOrders();
  const orders = getSessionOrders();

  useEffect(() => {
    clearOldOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">My Orders</h1>
              <p className="text-sm text-muted-foreground">Recent orders from this session</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No orders yet</p>
            <Button onClick={() => navigate("/")}>
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrders;
