import { cn } from "@/lib/utils";
import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  subtitle?: string;
}

export function Section({ id, title, subtitle, className, children, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative z-10", className)} {...props}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {(title || subtitle) && (
          <div className="mb-16 text-center flex flex-col items-center">
            {title && (
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white text-glow mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
