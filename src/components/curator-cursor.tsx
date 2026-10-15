"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";

export function CuratorCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      prefersReducedMotion()
    ) {
      return;
    }

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const move = (event: MouseEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const enter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      label.textContent = target.dataset.curator || "VIEW ARTEFACT";
      gsap.to(cursor, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(cursor, {
        autoAlpha: 0,
        scale: 0.85,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-curator]"),
    );
    targets.forEach((target) => {
      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
    });
    window.addEventListener("mousemove", move);

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
      });
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="curator-cursor" ref={cursorRef} aria-hidden="true">
      <span className="curator-cursor__label" ref={labelRef} />
    </div>
  );
}
