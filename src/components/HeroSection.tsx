import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />

      <div className="relative h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Taste the{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Extraordinary
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Discover our curated selection of gourmet dishes, crafted with passion and served with
          love.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" variant="hero" onClick={onExploreClick}>
            Explore Menu
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline">
            View Offers
          </Button>
        </div>
      </div>
    </div>
  );
};
