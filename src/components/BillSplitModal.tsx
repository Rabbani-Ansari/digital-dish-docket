import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Dices } from "lucide-react";
import { PaymentRouletteModal } from "./PaymentRouletteModal";

interface BillSplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  orderNumber: string;
}

export const BillSplitModal = ({
  isOpen,
  onClose,
  totalAmount,
  orderNumber,
}: BillSplitModalProps) => {
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [showRoulette, setShowRoulette] = useState(false);

  const perPersonAmount = totalAmount / numberOfPeople;

  const handleNumberChange = (value: string) => {
    const num = parseInt(value);
    if (num >= 2 && num <= 10) {
      setNumberOfPeople(num);
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showRoulette} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Split Bill</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Total Amount Display */}
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Order {orderNumber} • Total Bill
              </p>
              <p className="text-3xl font-bold">₹{totalAmount.toFixed(2)}</p>
            </div>

            {/* Equal Split Option */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Split Equally</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="people-count">Number of People</Label>
                <Input
                  id="people-count"
                  type="number"
                  min="2"
                  max="10"
                  value={numberOfPeople}
                  onChange={(e) => handleNumberChange(e.target.value)}
                  className="text-center text-lg"
                />
                <p className="text-xs text-muted-foreground text-center">
                  (2-10 people)
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  Each person pays
                </p>
                <p className="text-2xl font-bold text-primary">
                  ₹{perPersonAmount.toFixed(2)}
                </p>
              </div>

              <Button className="w-full" size="lg">
                Proceed to Payment
              </Button>
            </div>

            {/* Payment Roulette Option */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or let fate decide
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => setShowRoulette(true)}
            >
              <Dices className="h-5 w-5 mr-2" />
              Payment Roulette! 🎰
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentRouletteModal
        isOpen={showRoulette}
        onClose={() => {
          setShowRoulette(false);
          onClose();
        }}
        totalAmount={totalAmount}
        orderNumber={orderNumber}
      />
    </>
  );
};
