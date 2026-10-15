"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Lenis from "lenis";

export function AnimationProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
      });

      const updateScroll = () => ScrollTrigger.update();
      const tick = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", updateScroll);
      gsap.ticker.add(tick);

      // Lenis and ScrollTrigger share the same animation clock.
      gsap.ticker.lagSmoothing(0);

      const refresh = () => ScrollTrigger.refresh();

      // Refresh after fonts and layout-sensitive assets settle.
      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh);
      }
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        lenis.off("scroll", updateScroll);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
