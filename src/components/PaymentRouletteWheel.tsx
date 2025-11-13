import { useEffect, useRef, useState } from "react";

interface PaymentRouletteWheelProps {
  names: string[];
  onSpinComplete: (name: string) => void;
  isSpinning: boolean;
}

export const PaymentRouletteWheel = ({
  names,
  onSpinComplete,
  isSpinning,
}: PaymentRouletteWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  const colors = [
    "#FF6B35", "#F7931E", "#FDC830", "#37B3A0", "#4ECDC4",
    "#45B7D1", "#96CEB4", "#FFEAA7", "#74B9FF", "#A29BFE"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const drawWheel = (currentRotation: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const sliceAngle = (2 * Math.PI) / names.length;

      // Draw wheel segments
      names.forEach((name, index) => {
        const startAngle = currentRotation + index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px Inter";
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        
        const text = name.length > 15 ? name.substring(0, 13) + "..." : name;
        ctx.fillText(text, radius * 0.65, 5);
        ctx.restore();
      });

      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = "#FF6B35";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw center text
      ctx.fillStyle = "#FF6B35";
      ctx.font = "bold 14px Inter";
      ctx.textAlign = "center";
      ctx.fillText("WHO", centerX, centerY - 5);
      ctx.fillText("PAYS?", centerX, centerY + 10);

      // Draw pointer at top
      ctx.beginPath();
      ctx.moveTo(centerX, 10);
      ctx.lineTo(centerX - 15, 40);
      ctx.lineTo(centerX + 15, 40);
      ctx.closePath();
      ctx.fillStyle = "#FF6B35";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawWheel(rotation);
  }, [names, rotation, colors]);

  useEffect(() => {
    if (isSpinning && names.length > 0) {
      const spinDuration = 5000; // 5 seconds
      const startTime = Date.now();
      const startRotation = rotation;
      const spins = 5 + Math.random() * 3;
      const totalRotation = spins * 2 * Math.PI;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Easing function for deceleration
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentRotation = startRotation + totalRotation * easeOut;
        
        setRotation(currentRotation);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Calculate winning name
          const normalizedRotation = currentRotation % (2 * Math.PI);
          const sliceAngle = (2 * Math.PI) / names.length;
          const adjustedRotation = (2 * Math.PI - normalizedRotation + Math.PI / 2) % (2 * Math.PI);
          const winningIndex = Math.floor(adjustedRotation / sliceAngle) % names.length;
          
          setTimeout(() => {
            onSpinComplete(names[winningIndex]);
          }, 200);
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isSpinning, names, onSpinComplete]);

  return (
    <div className="relative flex items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="max-w-full h-auto"
        style={{ maxHeight: "60vh" }}
      />
    </div>
  );
};
