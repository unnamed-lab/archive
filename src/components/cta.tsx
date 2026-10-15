"use client";

import Image from "next/image";
import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";

export function Cta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || prefersReducedMotion()) return;

      const q = gsap.utils.selector(root);
      const bgImage = section.querySelector("[data-cta-bg] img");
      const collage = section.querySelector("[data-cta-collage]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });

      if (bgImage) {
        tl.fromTo(
          bgImage,
          { autoAlpha: 0, scale: 1.08, filter: "grayscale(100%)" },
          {
            autoAlpha: 1,
            scale: 1,
            filter: "grayscale(0%)",
            duration: 1.3,
          },
          0,
        );
      }

      if (collage) {
        tl.fromTo(
          collage,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power2.inOut" },
          0.25,
        );
      }

      tl.fromTo(
        q(".cta-lead .kicker"),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        0.6,
      )
        .fromTo(
          q(".cta-lead h2"),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.7,
        )
        .fromTo(
          q(".cta-mid p"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.85,
        )
        .fromTo(
          q(".cta-mid .pill"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.95,
        );
    },
    { scope: root },
  );

  return (
    <section className="cta" ref={root}>
      <div className="cta-bg" data-cta-bg>
        <Image src="/images/cta-background.jpg" alt="" fill sizes="58vw" />
      </div>
      <div className="cta-collage" data-cta-collage>
        <Image
          src="/images/cta-collage.png"
          alt="Torn-paper collage card reading Same People. New Stories."
          fill
          sizes="27vw"
        />
      </div>
      <div className="wrap cta-grid">
        <div className="cta-lead">
          <p className="kicker">The archive lives</p>
          <h2>
            Share a memory.
            <br />
            Be part of the story.
          </h2>
        </div>
        <div className="cta-mid">
          <p>
            Nigerian creativity is a living, evolving artefact. If you have a
            memory, a story or an artefact that belongs in ARCHIVE, we’d love to
            hear it.
          </p>
          <a className="pill sm" href="#">
            Share your story
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </section>
  );
}
