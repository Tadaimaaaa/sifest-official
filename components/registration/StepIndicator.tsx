import { cn } from "@/lib/utils";
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: "Acara" },
  { id: 2, label: "Data Peserta" },
  { id: 3, label: "Ulasan" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full max-w-xl mx-auto mb-12">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  isActive
                    ? "bg-brand-primary text-white shadow-[0_0_20px_rgba(42,108,246,0.5)] border-2 border-white/20"
                    : isCompleted
                    ? "bg-brand-accent text-white shadow-[0_0_15px_rgba(245,183,22,0.3)]"
                    : "glass-strong text-white/50 border border-white/10"
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "absolute top-12 text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-300",
                  isActive || isCompleted ? "text-white" : "text-white/40"
                )}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 md:mx-4 bg-white/10 relative overflow-hidden rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-brand-accent transition-all duration-500 ease-out"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
