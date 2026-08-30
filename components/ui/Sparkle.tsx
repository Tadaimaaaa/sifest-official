import { cn } from "@/lib/utils";
import React from "react";

interface SparkleProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  animate?: boolean;
}

export function Sparkle({ className, size = 24, animate = true, ...props }: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-white/80", animate && "animate-pulse-glow", className)}
      {...props}
    >
      <path
        d="M12 0C12 0 12 9.5 24 12C24 12 12.5 14 12 24C12 24 11.5 14.5 0 12C0 12 11 9.5 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
