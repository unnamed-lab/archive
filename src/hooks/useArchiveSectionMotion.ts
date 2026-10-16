"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";

export function useArchiveSectionMotion() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const scope = root.current;
      if (!scope) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const $ = gsap.utils.selector(scope);

        // 1. PHOTOGRAPHY ARCHIVE — DEVELOPING IN FOCUS
        const photoHeading = $("[data-photo-heading]");
        const photoDescription = $("[data-photo-description]");

        gsap.fromTo(
          photoHeading,
          { y: 34, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scope,
              start: "top 78%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          photoDescription,
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scope,
              start: "top 75%",
              once: true,
            },
          },
        );

        // 2. FEATURED EXHIBITION — UNVEIL THE PHOTOGRAPH
        const exhibition = $("[data-featured-exhibition]");
        const exhibitionImage = $("[data-exhibition-image]");
        const exhibitionCopy = $("[data-exhibition-copy]");
        const exhibitionTitle = $("[data-exhibition-title]");

        const exhibitionTl = gsap.timeline({
          scrollTrigger: {
            trigger: exhibition,
            start: "top 76%",
            once: true,
          },
        });

        exhibitionTl
          .fromTo(
            exhibitionImage,
            {
              clipPath: "inset(0 100% 0 0)",
              scale: 1.06,
            },
            {
              clipPath: "inset(0 0% 0 0)",
              scale: 1,
              duration: 1.2,
              ease: "power3.inOut",
            },
          )
          .fromTo(
            exhibitionCopy,
            { x: -22, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.65",
          )
          .fromTo(
            exhibitionTitle,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.42",
          );

        gsap.fromTo(
          exhibitionImage,
          { backgroundPosition: "52% 50%" },
          {
            backgroundPosition: "48% 50%",
            ease: "none",
            scrollTrigger: {
              trigger: exhibition,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        // 3. EXHIBITION GRID — CONTACT SHEET
        const cards = $("[data-exhibition-card]");

        gsap.fromTo(
          cards,
          {
            y: 42,
            autoAlpha: 0,
            rotate: (i: number) => (i % 2 === 0 ? -0.7 : 0.7),
          },
          {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.75,
            stagger: 0.13,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-exhibition-grid]",
              start: "top 82%",
              once: true,
            },
          },
        );

        cards.forEach((card) => {
          const image = card.querySelector("img");
          if (!image) return;
          gsap.fromTo(
            image,
            { scale: 1.13 },
            {
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return root;
}

export function useJourneySectionMotion() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const scope = root.current;
      if (!scope) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const $ = gsap.utils.selector(scope);

        // STORY BRIDGE — THE WOVEN THREAD
        const collage = $("[data-story-collage]");
        const storyCopy = $("[data-story-copy]");
        const links = $("[data-story-link]");

        const storyTl = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top 76%",
            once: true,
          },
        });

        storyTl
          .fromTo(
            collage,
            {
              xPercent: -12,
              autoAlpha: 0,
              clipPath: "inset(0 35% 0 0)",
            },
            {
              xPercent: 0,
              autoAlpha: 1,
              clipPath: "inset(0 0% 0 0)",
              duration: 1.05,
              ease: "power3.out",
            },
          )
          .fromTo(
            storyCopy,
            { x: 24, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.55",
          )
          .fromTo(
            links,
            { x: 18, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.3",
          );

        gsap.to(collage, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return root;
}
