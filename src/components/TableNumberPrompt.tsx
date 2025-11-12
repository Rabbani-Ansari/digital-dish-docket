import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTable } from "@/lib/TableContext";

export const TableNumberPrompt = () => {
  const { tableNumber, setTableNumber } = useTable();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTableNumber(inputValue.trim());
    }
  };

  return (
    <Dialog open={!tableNumber} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Welcome to {import.meta.env.VITE_RESTAURANT_NAME || "Our Restaurant"}!</DialogTitle>
          <DialogDescription>
            Please enter your table number to get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="table">Table Number</Label>
            <Input
              id="table"
              type="text"
              placeholder="e.g., 12"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
