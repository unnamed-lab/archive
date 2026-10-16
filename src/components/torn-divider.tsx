"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";

type EdgeVariant = "a" | "b" | "c";

const edges: Record<EdgeVariant, string> = {
  a: "M0 45 L95 36 L174 49 L268 28 L355 41 L447 24 L535 39 L640 20 L745 38 L852 27 L951 44 L1050 23 L1150 41 L1260 29 L1350 44 L1440 32 L1440 100 L0 100 Z",
  b: "M0 30 L88 44 L180 31 L272 47 L366 26 L458 42 L552 29 L648 45 L742 27 L838 43 L934 30 L1028 46 L1122 28 L1216 44 L1310 31 L1400 45 L1440 38 L1440 100 L0 100 Z",
  c: "M0 52 L104 40 L198 54 L296 34 L392 50 L488 30 L584 46 L680 26 L776 44 L872 32 L968 50 L1064 28 L1160 46 L1256 33 L1352 49 L1440 36 L1440 100 L0 100 Z",
};

interface TornDividerProps {
  variant?: EdgeVariant;
  above: string;
  below: string;
  reveal?: "down" | "up";
}

export function TornDivider({
  variant = "a",
  above,
  below,
  reveal = "down",
}: TornDividerProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;

      // "down" reveals the torn edge from the top; "up" from the bottom.
      // Dividers below a dark section tear downward, those above tear upward.
      // Keep every side as a percentage so GSAP tweens a single, same-unit value
      // (mixing `100%` with a unitless `0` snaps instead of animating).
      gsap.fromTo(
        root.current,
        {
          clipPath:
            reveal === "up"
              ? "inset(100% 0% 0% 0%)"
              : "inset(0% 0% 100% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root.current,
            // Play the tear with the divider clear of the viewport's bottom
            // edge; at 95% it starts hard against the screen edge mid-scroll.
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <div
      className="archive-transition"
      aria-hidden="true"
      ref={root}
      style={{ background: above, color: below }}
    >
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d={edges[variant]} fill="currentColor" />
      </svg>
    </div>
  );
}
