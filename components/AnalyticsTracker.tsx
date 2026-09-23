"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const supabase = createClient();
  const trackedPaths = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Only track once per path per session to avoid spamming on hot reloads
    if (!pathname || trackedPaths.current.has(pathname)) return;
    
    // Ignore admin routes from tracking
    if (pathname.startsWith('/admin')) return;

    trackedPaths.current.add(pathname);

    const trackView = async () => {
      try {
        await supabase.from("page_views").insert([
          { path: pathname }
        ]);
      } catch (err) {
        console.error("Failed to track page view", err);
      }
    };

    trackView();
  }, [pathname, supabase]);

  return null;
}
