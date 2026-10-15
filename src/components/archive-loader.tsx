"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";
import { NIGERIA_OUTLINE_PATH, NIGERIA_VIEW_BOX } from "@/lib/nigeria-map";

const WORD_CHARS = "ARCHIVE".split("");

// Matches the viewBox bounds of the vendored Nigeria outline (src/lib/nigeria-map.ts).
const MAP_X = 2000;
const MAP_Y = 179.7;
const MAP_H = 1640.5;
const MAP_BOTTOM = MAP_Y + MAP_H;

// Deterministic irregular leading edge for the ink-like reveal mask.
const REVEAL_WOBBLE = [0, 30, -12, 38, -6, 22, -26, 34, -10, 28, -20, 32, -8, 24, -18, 14, 0];
const REVEAL_STEP = MAP_X / (REVEAL_WOBBLE.length - 1);
const REVEAL_PATH =
  "M" +
  REVEAL_WOBBLE.map(
    (wobble, index) =>
      `${Math.round(index * REVEAL_STEP)},${Math.round((MAP_Y + wobble) * 10) / 10}`,
  ).join("L") +
  `L${MAP_X},${MAP_BOTTOM + 60}L0,${MAP_BOTTOM + 60}Z`;

const WEAVE_VERTICAL = Array.from({ length: 15 }, (_, index) => 130 + index * 130).filter(
  (x) => x < MAP_X,
);
const WEAVE_HORIZONTAL = Array.from(
  { length: 12 },
  (_, index) => Math.round((MAP_Y + 130 + index * 130) * 10) / 10,
).filter((y) => y < MAP_BOTTOM);

// The four timed acts run for ~2s; the loader never idles after they finish.
const MIN_DISPLAY_MS = 2100;
const READY_TIMEOUT_MS = 4200;

export function ArchiveLoader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      el.classList.add("archive-loader--js");
      document.documentElement.classList.add("is-loading");

      const unlock = () => {
        document.documentElement.classList.remove("is-loading");
        ScrollTrigger.refresh();
      };

      const q = gsap.utils.selector(root);
      const pigment = q("[data-al-pigment]");
      const silhouette = q("[data-al-silhouette]");
      const reveal = q("[data-al-reveal]");
      const chars = q("[data-al-char]");
      const dot = q("[data-al-dot]");
      const strap = q("[data-al-strap]");
      const bar = q("[data-al-bar]");
      const stage = q("[data-al-stage]");
      const grain = q("[data-al-grain]");
      const topPanel = q("[data-al-panel='top']");
      const bottomPanel = q("[data-al-panel='bottom']");
      const outline = el.querySelector<SVGPathElement>("[data-al-outline]");
      const frame = el.querySelector<SVGRectElement>("[data-al-frame]");
      const weave = gsap.utils.toArray<SVGLineElement>("[data-al-weave]");

      if (outline) {
        const length = outline.getTotalLength();
        gsap.set(outline, { strokeDasharray: length, strokeDashoffset: length });
      }
      if (frame) {
        const length = frame.getTotalLength();
        gsap.set(frame, { strokeDasharray: length, strokeDashoffset: length });
      }
      weave.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      });

      const started = performance.now();
      let pageReady = false;
      let introDone = false;
      let exiting = false;

      const readiness = new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve();
          return;
        }
        window.addEventListener("load", () => resolve(), { once: true });
        window.setTimeout(resolve, READY_TIMEOUT_MS);
      });
      const fonts = document.fonts?.ready ?? Promise.resolve();

      const finish = () => {
        exiting = true;
        // Hand off to the hero: its entrance waits for this signal so the two
        // animations read as one continuous reveal.
        document.documentElement.dataset.archiveRevealed = "true";
        window.dispatchEvent(new Event("archive:reveal"));
        gsap.set(el, { pointerEvents: "none" });
        gsap
          .timeline({
            onComplete: () => {
              gsap.set(el, { autoAlpha: 0 });
              unlock();
            },
          })
          .to(stage, { autoAlpha: 0, y: -14, duration: 0.45, ease: "power2.in" }, 0)
          .to(grain, { autoAlpha: 0, duration: 0.4 }, 0)
          .to(topPanel, { yPercent: -100, duration: 0.95, ease: "power3.inOut" }, 0.22)
          .to(bottomPanel, { yPercent: 100, duration: 0.95, ease: "power3.inOut" }, 0.22);
      };

      const exitWhenReady = () => {
        if (exiting || !introDone || !pageReady) return;
        const remaining = Math.max(0, MIN_DISPLAY_MS - (performance.now() - started));
        gsap.delayedCall(remaining / 1000, finish);
      };

      if (prefersReducedMotion()) {
        el.classList.add("archive-loader--static");
        Promise.all([readiness, fonts]).then(() => {
          if (exiting) return;
          exiting = true;
          gsap.to(el, {
            autoAlpha: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(el, { pointerEvents: "none" });
              unlock();
            },
          });
        });
        return unlock;
      }

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            introDone = true;
            exitWhenReady();
          },
        })
        // I — darkroom
        .fromTo(pigment, { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 0.4 }, 0)
        .to(frame, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.1)
        // II — nation emerges
        .set(reveal, { y: -(MAP_H + 80) }, 0.3)
        .fromTo(silhouette, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.32)
        .to(reveal, { y: 0, duration: 0.72, ease: "power2.inOut" }, 0.34)
        .to(outline, { strokeDashoffset: 0, duration: 0.62, ease: "power2.inOut" }, 0.34)
        // III — weave
        .to(weave, { strokeDashoffset: 0, duration: 0.5, stagger: { each: 0.012 }, ease: "power2.out" }, 0.9)
        // IV — name recorded
        .fromTo(chars, { yPercent: 115 }, { yPercent: 0, duration: 0.5, stagger: 0.045 }, 1.5)
        .fromTo(dot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 1.72)
        .fromTo(strap, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.78)
        // V — archive opens
        .fromTo(bar, { scaleX: 0 }, { scaleX: 0.9, duration: 1.6, ease: "power1.out" }, 1.9);

      Promise.all([readiness, fonts]).then(() => {
        pageReady = true;
        exitWhenReady();
      });

      return unlock;
    },
    { scope: root },
  );

  return (
    <div className="archive-loader" ref={root}>
      <div className="al-panel al-panel--top" data-al-panel="top" aria-hidden="true" />
      <div className="al-panel al-panel--bottom" data-al-panel="bottom" aria-hidden="true" />
      <div className="al-grain" data-al-grain aria-hidden="true" />
      <div className="al-stage" data-al-stage>
        <div className="al-pigment" data-al-pigment aria-hidden="true" />
        <div className="al-seal">
          <svg
            className="al-map"
            viewBox={NIGERIA_VIEW_BOX}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath id="al-map-clip">
                <path d={NIGERIA_OUTLINE_PATH} />
              </clipPath>
              <mask id="al-map-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={MAP_X} height={MAP_BOTTOM + 60}>
                <g data-al-reveal>
                  <path d={REVEAL_PATH} fill="#fff" />
                </g>
              </mask>
            </defs>
            <g mask="url(#al-map-reveal)">
              <path
                className="al-silhouette"
                data-al-silhouette
                d={NIGERIA_OUTLINE_PATH}
                fill="currentColor"
                fillOpacity={0.14}
              />
              <g className="al-weave" clipPath="url(#al-map-clip)">
                {WEAVE_VERTICAL.map((x) => (
                  <line key={`v${x}`} data-al-weave x1={x} y1={MAP_Y} x2={x} y2={MAP_BOTTOM} />
                ))}
                {WEAVE_HORIZONTAL.map((y) => (
                  <line key={`h${y}`} data-al-weave x1={0} y1={y} x2={MAP_X} y2={y} />
                ))}
              </g>
            </g>
            <path
              className="al-outline"
              data-al-outline
              d={NIGERIA_OUTLINE_PATH}
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
          <svg className="al-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <rect data-al-frame x="0.5" y="0.5" width="99" height="99" />
          </svg>
        </div>
        <div className="al-copy">
          <div className="al-title">
            {WORD_CHARS.map((char) => (
              <span className="al-char-mask" key={char}>
                <span className="al-char" data-al-char>
                  {char}
                </span>
              </span>
            ))}
            <span className="al-char-mask">
              <span className="al-char al-dot" data-al-dot>
                .
              </span>
            </span>
          </div>
          <p className="al-strap" data-al-strap>
            A living record of Nigerian creativity
          </p>
        </div>
        <div className="al-progress">
          <span className="al-progress-bar" data-al-bar />
        </div>
      </div>
    </div>
  );
}
