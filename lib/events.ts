import { OFFICIAL_EVENTS, EventData } from "@/data/events";

export function getAllEvents(): EventData[] {
  return OFFICIAL_EVENTS;
}

export function getRegisterableEvents(): EventData[] {
  const excludedSlugs = ['turnamen-futsal', 'turnamen-esport', 'open-bazaar'];
  return OFFICIAL_EVENTS.filter((event) => !excludedSlugs.includes(event.slug));
}

export function getMainEvents(): EventData[] {
  return OFFICIAL_EVENTS.filter(event => !event.isSubEvent);
}

export function getEventBySlug(slug: string): EventData | undefined {
  return OFFICIAL_EVENTS.find((event) => event.slug === slug);
}

export function getRelatedEvents(currentSlug: string, limit: number = 3): EventData[] {
  return OFFICIAL_EVENTS.filter((event) => event.slug !== currentSlug).slice(0, limit);
}
