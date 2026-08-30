import { cn } from "@/lib/utils";
import React from "react";

export interface CloudProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: "light" | "medium" | "heavy";
  animate?: boolean;
  blur?: boolean;
}

export function Cloud({ className, opacity = "medium", animate = true, blur = true, ...props }: CloudProps) {
  // We use CSS shapes for a performant, resolution-independent cloud.
  // Alternatively, this could be an SVG. Here we use a pure CSS cloud.
  
  const opacities = {
    light: "opacity-30",
    medium: "opacity-60",
    heavy: "opacity-90",
  };

  return (
    <div
      className={cn(
        "relative",
        opacities[opacity],
        animate && "animate-float-slow",
        blur && "blur-[2px]",
        className
      )}
      {...props}
    >
      <div className="relative w-[200px] h-[60px] bg-white rounded-full">
        {/* Top left bump */}
        <div className="absolute top-[-30px] left-[30px] w-[70px] h-[70px] bg-white rounded-full" />
        {/* Top right bump */}
        <div className="absolute top-[-45px] left-[85px] w-[90px] h-[90px] bg-white rounded-full" />
      </div>
    </div>
  );
}
