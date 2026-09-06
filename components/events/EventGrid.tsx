import { EventData } from "@/data/events";
import { EventCard } from "./EventCard";
import React from "react";

export function EventGrid({ events }: { events: EventData[] }) {
  const isTwoItems = events.length === 2;
  const gridClass = isTwoItems 
    ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8" 
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className={gridClass}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
