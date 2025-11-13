import { useState } from "react";
import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { BillSplitModal } from "./BillSplitModal";
import { Progress } from "@/components/ui/progress";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'preparing': return 'bg-orange-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-green-700';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusProgress = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 25;
      case 'preparing': return 50;
      case 'ready': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">
                Order {order.orderNumber}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatTime(order.createdAt)}</span>
                {order.tableNumber && (
                  <>
                    <span>•</span>
                    <span>Table {order.tableNumber}</span>
                  </>
                )}
              </div>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-white`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Placed</span>
              <span>Preparing</span>
              <span>Ready</span>
              <span>Served</span>
            </div>
            <Progress value={getStatusProgress(order.status)} className="h-2" />
            {order.estimatedTime > 0 && order.status !== 'completed' && (
              <p className="text-sm text-muted-foreground text-center">
                Estimated time: {order.estimatedTime} minutes
              </p>
            )}
          </div>

          {/* Quick Summary */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </span>
            <span className="text-lg font-semibold">
              ₹{order.total.toFixed(2)}
            </span>
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <div className="space-y-3 pt-3 border-t">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.menuItem.name}</p>
                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span>₹{item.subtotal.toFixed(2)}</span>
                </div>
              ))}

              <div className="space-y-1 pt-2 border-t text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Charge</span>
                  <span>₹{order.serviceCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Less Details
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  More Details
                </>
              )}
            </Button>
            {(order.status === 'ready' || order.status === 'completed') && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowSplitModal(true)}
                className="flex-1"
              >
                Split Bill
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <BillSplitModal
        isOpen={showSplitModal}
        onClose={() => setShowSplitModal(false)}
        totalAmount={order.total}
        orderNumber={order.orderNumber}
      />
    </>
  );
};
