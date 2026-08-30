import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-[var(--color-brand-accent)] text-[var(--color-brand-secondary)] hover:bg-[#FFA800] hover:shadow-[0_0_15px_rgba(245,183,22,0.6)] rounded-[var(--radius-pill)]",
      secondary:
        "bg-[var(--color-brand-secondary)] text-white hover:bg-[#1546A0] hover:shadow-[0_0_15px_rgba(24,86,201,0.6)] rounded-[var(--radius-pill)]",
      ghost:
        "bg-transparent text-white hover:bg-white/10 rounded-[var(--radius-md)]",
      glass:
        "glass-medium text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded-[var(--radius-pill)] border-[var(--color-surface-glass-border)] border",
      danger:
        "bg-[var(--color-status-error)] text-white hover:bg-red-600 rounded-[var(--radius-pill)]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
