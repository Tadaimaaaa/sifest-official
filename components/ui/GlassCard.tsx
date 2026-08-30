import { cn } from "@/lib/utils";
import React, { HTMLAttributes, forwardRef } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "medium" | "strong";
  interactive?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "medium", interactive = false, children, ...props }, ref) => {
    const variants = {
      light: "glass-light",
      medium: "glass-medium",
      strong: "glass-strong",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-card)] p-6 md:p-8",
          variants[variant],
          interactive && "transition-standard hover:-translate-y-1 hover:bg-[var(--color-surface-glass-hover)] hover:box-glow cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
