import { cn } from "@/lib/utils";
import React from "react";

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  animate?: boolean;
}

export function Bubble({ className, size = "md", glow = true, animate = true, children, ...props }: BubbleProps) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  return (
    <div
      className={cn(
        "rounded-full glass-medium flex items-center justify-center relative",
        "border-[var(--color-surface-glass-border)] border backdrop-blur-md",
        sizes[size],
        glow && "box-glow",
        animate && "animate-float",
        className
      )}
      {...props}
    >
      {/* Decorative reflection inside the bubble */}
      <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white/40 rounded-full blur-[2px]" />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
