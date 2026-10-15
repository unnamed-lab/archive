# Animation Spec — "The Living Archive"

> Status: **spec, not yet implemented.** Read this file before writing any GSAP code in this repo.
> Source concept: user-provided. Adapt to the component map below; do not invent new easings or motion language.

## 🎬 Core Concept

Motion philosophy: nothing should pop onto the screen. Everything should feel excavated, woven, or unveiled — echoing how archives, textiles (aso-oke), and oral tradition unfold in layers.

Three motion primitives drive the whole page:

| Primitive | Inspired by | GSAP technique |
|---|---|---|
| Unveil | Torn paper / archival reveals | `clip-path` inset animations |
| Weave | Kente cloth interlacing | Staggered column/row reveals with `power3` easing |
| Pulse / Drums | Talking drum rhythm | Short sequences with `stagger: { each: 0.08 }` like drum hits |

- **Global easing:** `power3.out` for reveals, `power2.inOut` for scroll-scrubbed motion. No bouncy/elastic easings anywhere — the archive is dignified, not playful.
- **Scroll engine:** Lenis smooth scroll + GSAP ScrollTrigger (`scrub` for parallax, `toggleActions` for entrances). In Next.js, wrap this in a `useGSAP` hook.

## Dependencies

```bash
pnpm add lenis            # smooth scroll
pnpm add gsap @gsap/react # already installed — listed for reference
```

## File / component map

| Animation target | Component |
|---|---|
| Smooth scroll + ScrollTrigger sync, global registration | `src/lib/gsap.ts` + `src/components/animation-provider.tsx` |
| Nav stagger, header blur-on-scroll | `src/components/site-header.tsx` |
| Hero sequence + collage parallax | `src/components/hero.tsx` |
| Discipline cards "weave" | `src/components/disciplines.tsx` |
| Then/Now slider auto-sweep | `src/components/then-now.tsx` |
| Vinyl spin, title/meta reveals | `src/components/featured.tsx` |
| CTA darkroom fade, floating collage | `src/components/cta.tsx` |
| Torn-paper section boundaries | `src/components/torn-divider.tsx` |

## 1️⃣ Hero — "The Archive Wakes Up"

Sequence (on load, ~2.4s total):

1. Collage slides in from the right with a torn-edge clip-path wipe (`clip-path: inset(0 0 0 100%)` → `inset(0 0 0 0)`).
2. Headline lines rise out of masks, staggered `0.12s` — each line has an `overflow: hidden` wrapper.
3. Kicker and sub-copy fade up `0.3s` after.
4. "the future." italic line does a color sweep: starts white, accent red-orange wipes across via a gradient `background-clip` animation — like ink spreading.
5. Button draws its circular arrow in with an SVG `stroke-dashoffset` animation.
6. Ambient: the collage has a very slow `yPercent: -5 → 5` scrub-parallax on scroll, with inner images drifting at different speeds (multi-layer parallax, 3 layers).

## 2️⃣ Nav — "Ink Appears"

- Header links stagger in from `y: -10, autoAlpha: 0` with `0.06s` delays after hero starts.
- On scroll, header gets a `backdrop-filter: blur` + background transition (CSS class toggled by ScrollTrigger).

## 3️⃣ Four Discipline Cards — "The Weave"

The signature moment of the page. Cards don't just fade in:

- As the section enters viewport, cards reveal column-by-column from the left, each card rising with `y: 60 → 0`, `rotate: 1deg → 0` (a slight "settling" feel).
- Inner image does an inverse scale reveal: image starts `scale: 1.4` and settles to `1.0` while its container clips open — classic "Ken Burns unveil".
- The big serif numerals "01–04" slide in from below their own text mask after the image opens (no counting animation — that's overkill).
- Arrow buttons draw their circle stroke (SVG dashoffset) **on hover only**.
- On scroll past, cards get a subtle scrub-parallax: outer cards move slightly slower than inner ones, creating a woven depth.
- Hover: card image `scale: 1.08` over `0.8s` + a warm amber overlay gradient fades in.

## 4️⃣ Then / Now Slider — "Time Dissolve"

- Section headline "Same Roots. New Expressions." — words reveal one-by-one (`stagger: 0.08`) like spoken word.
- The comparison slider auto-animates on first view: the divider sweeps `100% → 40% → 50%` automatically (like time sweeping across), then becomes draggable. Visitors watch B&W become color without touching anything.
- Labels "THEN" / "NOW" fade in anchored to each side.
- On drag: subtle magnetic feel — divider has a `0.3s` GSAP-tweened follow rather than 1:1 mouse tracking (feels premium, not twitchy).

## 5️⃣ Featured Artefact — "The Record Spins"

- Vinyl disc placeholder rotates continuously (`rotation: 360, repeat: -1, duration: 8, ease: "none"`) once section is 30% in view — ScrollTrigger `toggleActions: "play none none pause"` so it stops off-screen (performance!).
- Album art + disc slide in from left with parallax speeds.
- Title "Fela Kuti" — characters reveal via stagger mask; "This Is Africa" italic line follows.
- Meta row "1972 / Album Cover Design / by Ola Olaniyi" fades in with `letter-spacing` animating `0.2em → 0.08em` — like a typewriter settling.
- Right thumbnail rail: items highlight sequentially once (accent border sweeps down the list), then stay static.
- Scroll-scrubbed: the whole vinyl group drifts `x: -40` as you scroll past — like the record is sliding out of its sleeve.

## 6️⃣ CTA — "The Story Continues"

- Dark background photo cross-fades from pure black (like a photo developing in a darkroom — very on-theme).
- "Share a memory. Be part of the story." — lines mask-reveal.
- The torn-paper collage card on the right does a gentle continuous float (`y: -10`, `yoyo: true`) plus scroll parallax.
- Button: on hover, arrow launches forward with a small trail (quick `x` burst + fade duplicate).
- Background has slow `scale: 1.1 → 1` zoom-out scrub — cinematic push-in reversed.

## 7️⃣ Section Transitions — "Torn Edges Between Worlds"

The killer detail: sections don't cut with straight lines. Cream sections transitioning to black sections use a torn-paper SVG divider that animates its `clip-path` or mask on scroll — the edge appears to tear as you scroll into the next section. Implement as an absolutely-positioned SVG at each boundary, scrubbed `0 → 1` as it enters.

## ⚙️ Next.js / React Integration

`src/components/animation-provider.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Lenis + ScrollTrigger sync
      const lenis = new Lenis({ lerp: 0.09 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      return () => lenis.destroy();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
```

### Critical gotchas

- `"use client"` on every animated component (GSAP touches refs/DOM).
- One `gsap.registerPlugin` call in a shared module (`src/lib/gsap.ts`) — never per-component.
- Use `useGSAP(() => {...}, { scope: ref })` — auto-cleanup prevents double-animation in React StrictMode.
- For the vinyl's `repeat: -1` tween: create with `paused: true`, play via ScrollTrigger `onEnter`.
- SSR-safe: all animations live inside `useGSAP`, so initial HTML renders static (good for SEO + no flash).
- Reduced motion: `if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;` at the top of every animation scope.
- Bundle: import `gsap/ScrollTrigger` directly (not `gsap/all`) to keep the bundle lean.

## 🥁 The "Breathtaking" Checklist

If you only implement 5 things, make them these:

- ✅ Hero collage torn-edge wipe + headline mask reveals
- ✅ Cards weave-in with inverse-scale image reveals
- ✅ Then/Now slider auto-sweep on first view (the moment people screenshot)
- ✅ Vinyl record that spins only while on screen
- ✅ Torn-paper SVG section dividers

Everything else is polish — these five carry the concept.

## Verification

After implementation run:

```bash
pnpm lint
pnpm build
```

and manually confirm: no double-firing animations under StrictMode, no layout shift before hydration, and correct behavior with `prefers-reduced-motion: reduce` enabled.
