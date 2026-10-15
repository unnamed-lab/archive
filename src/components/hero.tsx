"use client";

import Image from "next/image";
import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(root);
      const sheet = q("[data-hero-sheet]");
      const collage = q("[data-collage]");

      gsap.set(sheet, { display: "block" });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(sheet, { xPercent: 104, duration: 1.15 }, 0)
        .fromTo(
          q("[data-hero-photograph]"),
          { autoAlpha: 0, x: -18 },
          { autoAlpha: 1, x: 0, duration: 0.8 },
          0.35,
        )
        .fromTo(
          q("[data-hero-portrait]"),
          { autoAlpha: 0, scale: 1.05 },
          { autoAlpha: 1, scale: 1, duration: 0.9 },
          0.85,
        )
        .fromTo(
          q("[data-hero-line]"),
          { yPercent: 110, rotate: 1.5 },
          { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.12 },
          0.67,
        )
        .fromTo(
          q("[data-hero-kicker]"),
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55 },
          1.17,
        )
        .fromTo(
          q("[data-hero-description]"),
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65 },
          1.5,
        )
        .fromTo(
          q("[data-hero-link]"),
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          1.9,
        );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 761px)", () => {
        gsap.to(collage, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="hero" ref={root}>
      <div className="wrap">
        <div className="hero-copy">
          <p className="kicker" data-hero-kicker>
            A living record of Nigerian creativity
          </p>
          <h1>
            <span className="line-mask">
              <span data-hero-line>Our past is</span>
            </span>
            <span className="line-mask">
              <span data-hero-line>still making</span>
            </span>
            <span className="line-mask">
              <span data-hero-line>
                <em>the future.</em>
              </span>
            </span>
          </h1>
          <p data-hero-description>
            A digital museum celebrating Nigeria’s creative history across
            photography, music, fashion and design.
          </p>
          <a className="arrow-btn" data-hero-link href="#archive">
            Explore the archive{" "}
            <span className="circ">
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.6} />
            </span>
          </a>
        </div>
      </div>
      <div className="hero-collage" data-collage>
        <div className="hero-sheet" data-hero-sheet aria-hidden="true" />
        <div className="hero-layer" data-hero-photograph>
          <Image
            src="/images/hero-collage-2.png"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="hero-layer" data-hero-portrait>
          <Image
            src="/images/hero-collage.png"
            alt="Moody mixed-media collage with torn-paper edges"
            fill
            sizes="100vw"
            preload
          />
        </div>
      </div>
    </section>
  );
}
