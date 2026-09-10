import { OFFICIAL_EVENTS } from './data/events';

const eventSlug = 'seminar-nasional';
const eventCatalogData = OFFICIAL_EVENTS.find(e => e.slug === eventSlug);
const isGratis = eventCatalogData?.price?.toLowerCase().includes("gratis") || 
                 eventCatalogData?.price?.toLowerCase() === "free" || 
                 eventCatalogData?.price === "Rp 0";

console.log("Price:", eventCatalogData?.price);
console.log("isGratis:", isGratis);
