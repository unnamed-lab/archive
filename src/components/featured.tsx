"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";
import { artefacts } from "@/lib/artefacts";

const sleeveSizes = "(max-width: 760px) 100vw, (max-width: 1000px) 46vw, 31vw";

const renderChars = (text: string) =>
  text.split("").map((char, index) => (
    <span className="char" key={`c${index}`}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

export function Featured() {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const busy = useRef(false);
  const revealed = useRef(false);

  const artefact = artefacts[selected];

  useGSAP(
    () => {
      const section = root.current;
      if (!section || prefersReducedMotion()) return;

      const q = gsap.utils.selector(root);
      const vinyl = section.querySelector("[data-vinyl]");
      const sleeve = section.querySelector("[data-sleeve]");
      const object = section.querySelector("[data-artefact-object]");

      if (vinyl) {
        const spin = gsap.to(vinyl, {
          rotation: "+=360",
          duration: 8,
          ease: "none",
          repeat: -1,
          paused: true,
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => spin.play(),
          onEnterBack: () => spin.play(),
          onLeave: () => spin.pause(),
          onLeaveBack: () => spin.pause(),
        });
      }

      if (object) {
        gsap.to(object, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      const chars = q("[data-artefact-title] .char");
      const sweeps = q("[data-thumb-sweep]");

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        })
        .fromTo(
          vinyl,
          { xPercent: 32, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 1.05 },
          0,
        )
        .fromTo(
          sleeve,
          { xPercent: -5, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.95 },
          0.06,
        )
        .fromTo(
          q(".kicker"),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.4,
        )
        .fromTo(
          chars,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.65, stagger: 0.022 },
          0.5,
        )
        .fromTo(
          q("[data-artefact-meta]"),
          { autoAlpha: 0, y: 12, letterSpacing: "0.18em" },
          { autoAlpha: 1, y: 0, letterSpacing: "0em", duration: 0.6 },
          0.88,
        )
        .fromTo(
          q("[data-artefact-body]"),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.98,
        )
        .fromTo(
          q(".pill"),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          1.08,
        )
        .fromTo(
          q(".thumbs li"),
          { autoAlpha: 0, x: 16 },
          { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.08 },
          0.5,
        )
        .fromTo(
          sweeps,
          { scaleX: 0, autoAlpha: 0 },
          { scaleX: 1, autoAlpha: 1, duration: 0.4, stagger: 0.09 },
          0.65,
        )
        .to(
          sweeps,
          { scaleX: 0, autoAlpha: 0, duration: 0.4, stagger: 0.09 },
          1.05,
        );
    },
    { scope: root },
  );

  useLayoutEffect(() => {
    if (!revealed.current) {
      revealed.current = true;
      return;
    }

    const section = root.current;
    if (!section) {
      busy.current = false;
      return;
    }
    if (prefersReducedMotion()) {
      busy.current = false;
      return;
    }

    const artwork =
      section.querySelector("[data-artefact-artwork]") ??
      section.querySelector(".sleeve img");
    const copy = section.querySelector("[data-artefact-copy]");

    gsap.fromTo(
      [artwork, copy],
      { autoAlpha: 0, y: 16, overwrite: "auto" },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.06,
        onComplete: () => {
          busy.current = false;
        },
      },
    );
  }, [selected]);

  const select = (next: number) => {
    if (busy.current || next === selected) return;

    const section = root.current;
    if (!section || prefersReducedMotion()) {
      setSelected(next);
      return;
    }

    const artwork =
      section.querySelector("[data-artefact-artwork]") ??
      section.querySelector(".sleeve img");
    const copy = section.querySelector("[data-artefact-copy]");

    busy.current = true;
    gsap
      .timeline({ onComplete: () => setSelected(next) })
      .to([artwork, copy], {
        autoAlpha: 0,
        y: -12,
        duration: 0.34,
        ease: "power2.inOut",
        stagger: 0.05,
        overwrite: "auto",
      });
  };

  return (
    <section className="feat" id="featured" data-featured-artefact ref={root}>
      <div className="wrap feat-grid">
        <div className="sleeve-wrap" data-artefact-object>
          <div className="vinyl" data-vinyl aria-hidden="true" />
          <div className="sleeve" data-sleeve style={{ background: artefact.tint }}>
            <Image
              key={artefact.image}
              src={`/images/${artefact.image}`}
              alt={`${artefact.title} — ${artefact.titleEm}`}
              fill
              sizes={sleeveSizes}
              data-artefact-artwork
            />
          </div>
        </div>
        <div data-artefact-copy>
          <p className="kicker">Featured artefact</p>
          <h2 data-artefact-title>
            <span className="sr-only">{`${artefact.title} ${artefact.titleEm}`}</span>
            <span className="title-row" aria-hidden="true">
              {renderChars(artefact.title)}
            </span>
            <em aria-hidden="true">{renderChars(artefact.titleEm)}</em>
          </h2>
          <div className="meta" data-artefact-meta>
            {artefact.meta.map((entry) => (
              <span key={entry}>{entry}</span>
            ))}
          </div>
          <p className="body" data-artefact-body>
            {artefact.body}
          </p>
          <a className="pill dark" href="#">
            View details
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.6} />
          </a>
        </div>
        <ul className="thumbs">
          {artefacts.map((item, index) => (
            <li key={item.num}>
              <button
                type="button"
                className="thumb"
                data-active={index === selected}
                aria-current={index === selected ? "true" : undefined}
                onClick={() => select(index)}
              >
                <Image src={`/images/${item.thumb}`} alt="" width={76} height={76} />
                <span className="thumb-label">
                  {item.num}
                  <br />
                  {item.discipline}
                </span>
                <span className="thumb-sweep" data-thumb-sweep aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
