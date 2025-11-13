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
import { Plus, Minus, Sparkles } from "lucide-react";
import { PaymentRouletteWheel } from "./PaymentRouletteWheel";

interface PaymentRouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  orderNumber: string;
}

export const PaymentRouletteModal = ({
  isOpen,
  onClose,
  totalAmount,
  orderNumber,
}: PaymentRouletteModalProps) => {
  const [step, setStep] = useState<'input' | 'spin' | 'result'>('input');
  const [names, setNames] = useState<string[]>(['', '']);
  const [winner, setWinner] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);

  const addNameField = () => {
    if (names.length < 10) {
      setNames([...names, '']);
    }
  };

  const removeNameField = (index: number) => {
    if (names.length > 2) {
      setNames(names.filter((_, i) => i !== index));
    }
  };

  const updateName = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const validNames = names.filter(name => name.trim() !== '');

  const handleSpinStart = () => {
    if (validNames.length >= 2) {
      setStep('spin');
    }
  };

  const handleSpinComplete = (selectedName: string) => {
    setWinner(selectedName);
    setStep('result');
    
    // Haptic feedback simulation
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handleReset = () => {
    setStep('input');
    setNames(['', '']);
    setWinner('');
    setIsSpinning(false);
  };

  const funnyMessages = [
    "Better luck next time! 😅",
    "The wheel has spoken! 🎯",
    "Congratulations, you're the chosen one! 🎉",
    "Your wallet is about to get lighter! 💸",
    "The fate has decided your destiny! ✨",
    "Time to treat your friends! 🍽️"
  ];

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Who Pays? Payment Roulette
          </DialogTitle>
        </DialogHeader>

        {step === 'input' && (
          <div className="space-y-6 py-4">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Order {orderNumber} • Total Amount
              </p>
              <p className="text-3xl font-bold">₹{totalAmount.toFixed(2)}</p>
            </div>

            <div className="space-y-3">
              <Label className="text-lg">Enter Names (2-10 people)</Label>
              {names.map((name, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Person ${index + 1}`}
                    value={name}
                    onChange={(e) => updateName(index, e.target.value)}
                    className="flex-1"
                  />
                  {names.length > 2 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeNameField(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              {names.length < 10 && (
                <Button
                  variant="outline"
                  onClick={addNameField}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Person
                </Button>
              )}
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={validNames.length < 2}
              onClick={handleSpinStart}
            >
              Spin to Decide! 🎰
            </Button>
          </div>
        )}

        {step === 'spin' && (
          <div className="space-y-4 py-4">
            <PaymentRouletteWheel
              names={validNames}
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
            />
            
            {!isSpinning && (
              <Button
                size="lg"
                className="w-full"
                onClick={() => setIsSpinning(true)}
              >
                SPIN! 🎯
              </Button>
            )}
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-6 py-4 text-center">
            {/* Confetti Effect */}
            <div className="relative h-32">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                >
                  🎉
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-primary animate-scale-in">
                {winner}
              </h2>
              <p className="text-xl">pays the full bill! 💸</p>
              <p className="text-lg text-muted-foreground">{randomMessage}</p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Amount to Pay</p>
              <p className="text-4xl font-bold">₹{totalAmount.toFixed(2)}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button size="lg" className="w-full">
                Proceed to Payment
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    setStep('spin');
                    setIsSpinning(false);
                  }}
                >
                  Spin Again
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleReset}
                >
                  Split Equally
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
