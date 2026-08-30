import { EventData } from "@/data/events";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Trophy, GraduationCap, Gamepad2, BookOpen, Store } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface StepEventSelectionProps {
  events: EventData[];
  selectedEventSlug: string;
  onSelect: (slug: string) => void;
  onNext: () => void;
}

const IconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={24} className="text-white drop-shadow-md" />,
  Trophy: <Trophy size={24} className="text-white drop-shadow-md" />,
  Gamepad2: <Gamepad2 size={24} className="text-white drop-shadow-md" />,
  BookOpen: <BookOpen size={24} className="text-white drop-shadow-md" />,
  Store: <Store size={24} className="text-white drop-shadow-md" />,
};

export function StepEventSelection({ events, selectedEventSlug, onSelect, onNext }: StepEventSelectionProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-white mb-3">Pilih Acara</h2>
        <p className="text-white/70">Pilih acara SI FEST 2026 yang ingin Anda ikuti.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => {
          const isSelected = selectedEventSlug === event.slug;
          return (
            <button
              key={event.id}
              type="button"
              onClick={() => onSelect(event.slug)}
              className={cn(
                "relative text-left w-full rounded-3xl p-6 transition-all duration-300",
                isSelected
                  ? "bg-brand-primary/20 border-2 border-brand-accent shadow-[0_0_30px_rgba(245,183,22,0.15)] backdrop-blur-xl"
                  : "glass-light border-2 border-transparent hover:border-white/20 hover:bg-white/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    isSelected ? "bg-brand-accent" : "glass-strong"
                  )}
                >
                  {IconMap[event.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold tracking-wider text-brand-accent uppercase">
                      {event.category}
                    </span>
                    {isSelected && <CheckCircle2 size={20} className="text-brand-accent" />}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-white/60 line-clamp-2">{event.shortDescription}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-8 border-t border-white/10 mt-8">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onNext}
          disabled={!selectedEventSlug}
          className="w-full sm:w-auto px-12"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
