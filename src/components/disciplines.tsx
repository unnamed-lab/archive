"use client";

import Image from "next/image";
import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";

const disciplines = [
  {
    num: "01",
    title: "Photography",
    description: "The people and moments that framed our history.",
    image: "photography-card-01.jpg",
    tint: "#4a4a48",
  },
  {
    num: "02",
    title: "Music",
    description: "The sounds that carried our stories.",
    image: "music-card-02.jpg",
    tint: "#7a3d44",
  },
  {
    num: "03",
    title: "Fashion",
    description: "The garment and identities we make our own.",
    image: "fashion-card-03.jpg",
    tint: "#8a2a2a",
  },
  {
    num: "04",
    title: "Design",
    description: "The visual ideas that shaped how we see.",
    image: "design-card-04.jpg",
    tint: "#6b5a2a",
  },
];

const cardSizes = "(max-width: 480px) 100vw, (max-width: 1000px) 50vw, 25vw";

const threadPaths = {
  desktop: {
    viewBox: "0 0 1200 100",
    d: "M0 68 C120 68 120 24 300 40 S480 86 600 48 S810 18 900 44 S1080 76 1200 28",
  },
  tablet: {
    viewBox: "0 0 1200 200",
    d: "M0 52 C160 52 220 22 380 42 S580 78 740 48 S1020 26 1150 54 C1214 68 1204 122 1144 134 S950 178 790 152 S530 120 350 148 S150 172 44 144",
  },
  mobile: {
    viewBox: "0 0 100 1600",
    d: "M50 0 C50 120 78 180 74 320 S44 520 52 660 S78 860 70 1010 S42 1240 54 1380 S76 1520 50 1600",
  },
} as const;

export function Disciplines() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (context, contextSafe) => {
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(root);
      const cards = q("[data-discipline-card]");
      const section = root.current;

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        })
        .fromTo(
          cards,
          {
            y: 54,
            rotate: (i: number) => (i % 2 === 0 ? -1.2 : 1.2),
            autoAlpha: 0,
          },
          {
            y: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.14,
          },
        )
        .fromTo(
          q(".card .num"),
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.6,
            stagger: 0.14,
          },
          "<0.45",
        );

      cards.forEach((card) => {
        const image = card.querySelector("[data-card-image]");
        if (!image) return;
        gsap.fromTo(
          image,
          { scale: 1.22 },
          {
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          },
        );
      });

      const svg = root.current?.querySelector<SVGSVGElement>("[data-thread]");
      const path = root.current?.querySelector<SVGPathElement>(
        "[data-thread-path]",
      );
      if (svg && path) {
        const mm = gsap.matchMedia();

        const drawThread = (variant: keyof typeof threadPaths) => {
          const { viewBox, d } = threadPaths[variant];
          svg.setAttribute("viewBox", viewBox);
          path.setAttribute("d", d);

          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
          });
        };

        mm.add("(min-width: 1001px)", () => drawThread("desktop"));
        mm.add(
          "(min-width: 481px) and (max-width: 1000px)",
          () => drawThread("tablet"),
        );
        mm.add("(max-width: 480px)", () => drawThread("mobile"));
      }

      let removeHover: (() => void) | undefined;
      if (window.matchMedia("(hover: hover)").matches && contextSafe) {
        const safe = contextSafe;
        const cleanups = cards.map((card) => {
          const image = card.querySelector("[data-card-image]");

          const onEnter = () =>
            safe(() => {
              if (image) {
                gsap.to(image, {
                  scale: 1.06,
                  duration: 0.75,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }
              gsap.to(card, {
                y: -6,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          const onLeave = () =>
            safe(() => {
              if (image) {
                gsap.to(image, {
                  scale: 1,
                  duration: 0.8,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }
              gsap.to(card, {
                y: 0,
                duration: 0.55,
                ease: "power3.out",
                overwrite: "auto",
              });
            });

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          return () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          };
        });
        removeHover = () => cleanups.forEach((fn) => fn());
      }

      return () => removeHover?.();
    },
    { scope: root },
  );

  return (
    <section className="disc" id="archive" data-disciplines ref={root}>
      <div className="wrap">
        <div className="disc-head">
          <div>
            <p className="kicker">The archive</p>
            <h2>
              Four disciplines.
              <br />
              One cultural memory.
            </h2>
          </div>
          <div className="disc-side">
            <p>
              Culture is never still. it moves through photographs, records,
              garments and the ideas we pass from one generation to the next.
            </p>
            <a className="arrow-btn" href="#">
              Learn more{" "}
              <span className="circ">
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.6} />
              </span>
            </a>
          </div>
        </div>
        <div className="cards">
          <svg
            className="archive-thread"
            data-thread
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              data-thread-path
              d={threadPaths.desktop.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {disciplines.map((discipline) => (
            <article
              key={discipline.num}
              className="card"
              data-discipline-card
              style={{ backgroundColor: discipline.tint }}
            >
              <Image
                src={`/images/${discipline.image}`}
                alt={`${discipline.title} collection`}
                fill
                sizes={cardSizes}
                data-card-image
              />
              <div className="card-body">
                <span className="num">{discipline.num}</span>
                <h3>{discipline.title}</h3>
                <p>{discipline.description}</p>
                <a className="circ-btn" href="#" aria-label={`Explore ${discipline.title}`}>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={1.6} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
