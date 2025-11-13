import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SpinWheelButtonProps {
  onClick: () => void;
}

export const SpinWheelButton = ({ onClick }: SpinWheelButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-24 right-6 z-40 shadow-xl animate-pulse hover:animate-none hover:scale-110 transition-transform font-semibold text-base px-6 py-6 rounded-full"
    >
      <Sparkles className="w-5 h-5 mr-2" />
      Can't Decide? 🎡 Spin the Wheel!
    </Button>
  );
};
