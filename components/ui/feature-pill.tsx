import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturePillProps {
  icon: LucideIcon;
  text: string;
  variant?: "primary" | "green" | "blue";
  className?: string;
}

const variantStyles = {
  primary: "bg-primary/10 border-primary/20 text-primary",
  green: "bg-green-500/10 border-green-500/20 text-green-400",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
};

export function FeaturePill({
  icon: Icon,
  text,
  variant = "primary",
  className,
}: FeaturePillProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-200 hover:scale-105",
        variantStyles[variant],
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{text}</span>
    </div>
  );
}
