# Animation Spec — “The Living Archive” (v2)

> **Status: spec, not yet implemented. Read this file before writing any GSAP code in this repo.**
> Version 2 — the upgraded motion direction supplied by the user. Supersedes v1 where they
> conflict (conflicts are listed under “Carried-over v1 details”). Compatible v1 micro-details
> are merged in. Do not invent easings or motion language beyond this document.
> Binding rules for this repo: package manager **pnpm**, TypeScript/TSX, icons Hugeicons-first.

## Core concept

For ARCHIVE., preserve the editorial layout, cream-and-black palette, burnt-orange accents,
oversized serif typography, and Nigerian cultural imagery. The motion should make the site feel
like an archive that is **physically coming alive** — less a collection of premium website
animations, more a coherent system. The creativity comes from the relationships between
elements: paper uncovering photographs, textile-inspired movement connecting disciplines, time
dissolving between generations, and sound-inspired rhythms guiding the scroll.

Guiding principle: make the page feel like the visitor is uncovering something meaningful, not
watching an animation demo. If an effect doesn’t deepen the connection between Nigerian creative
history, the artefact and the person discovering it, leave it out.

## Motion rules

Easing canon (unchanged from v1): `power3.out` for reveals, `power2.inOut` for scrubs,
`stagger: { each: 0.08 }` drum rhythm. Never bounce or elastic.

1. **Depth is earned.** Large photographs move slowly; paper edges, labels and fine details
   move at different rates. Avoid applying the same parallax to every element.
2. **Every animation has a narrative purpose.** Reveals introduce an artefact, transitions
   connect periods, hover interactions invite exploration.
3. **The rhythm changes by section.** The hero is cinematic, the discipline cards are
   rhythmic, the comparison is contemplative, the artefact section is slow and deliberate.

## Motion score (illustrative — not a literal duration requirement for every scroll)

| # | Title | Timing | What happens |
|---|-------|--------|--------------|
| 01 | The archive wakes | 0–2.4 s | Paper masks retract; portrait and headline resolve in layers. |
| 02 | The disciplines weave | On scroll | Four staggered cards, travelling thread, image depth. |
| 03 | Time becomes visible | On first view | Monochrome dissolves into colour; slider settles at centre. |
| 04 | The record breathes | While visible | Vinyl rotation, coordinated artefact selection, quiet parallax. |
| 05 | Memory continues | On scroll | Darkroom fade, handwritten paper reveal, line carries into footer. |

## Dependencies (installed)

`gsap` ^3.15.0, `@gsap/react` ^2.1.2, `lenis` 1.3.26 — installed with `pnpm add` (never
npm/yarn/bun). The spec’s `npm install gsap lenis @gsap/react` is conceptual only.

## Architecture — fix before adding effects (DONE)

Implemented in `src/components/animation-provider.tsx`; plugin registration lives in the shared
client-safe module `src/lib/gsap.ts` (`gsap.registerPlugin(ScrollTrigger, useGSAP)`). Mounted
exactly once from `src/app/layout.tsx`.

```tsx
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
```

### Architecture rules

- Cleanup removes the Lenis callback from the GSAP ticker — not just `lenis.destroy()`.
- Keep a **single** Lenis instance and a **single** ScrollTrigger integration.
- Respect reduced-motion **globally** (Lenis off) *and* in each component (skip its own
  animations, including slider autoplay and vinyl rotation).
- Never animate from hidden CSS states — content must stay visible if JavaScript fails
  (animate *from* visible states / use `fromTo` inside `useGSAP`).
- All GSAP work lives inside `useGSAP` with `{ scope: root }`; never create animations outside
  that lifecycle.
- Avoid pinning every section. A few carefully chosen scrubbed animations feel more
  sophisticated than a page full of scroll hijacking.
- Event listeners that trigger animations must use GSAP’s `contextSafe()` (or equivalent
  cleanup) so React Strict Mode cannot leave duplicate listeners.
- Components with interactions are Client Components; `src/app/page.tsx` stays a Server
  Component that composes them.

## File / component map

| Spec name | File | Status |
|-----------|------|--------|
| `AnimationProvider` | `src/components/animation-provider.tsx` | done (v2 architecture) |
| plugin registration | `src/lib/gsap.ts` | done |
| `motionPreferences` | `src/lib/motion-preferences.ts` | planned — per-component reduced-motion helper (Phase 01) |
| `useArchiveMotion` | `src/components/animation/use-archive-motion.ts` | planned — create when the reveal pattern repeats (01–02) |
| `HeroSection` | `src/components/hero.tsx` | present — restructured in Phase 01 |
| `DisciplineGrid` | `src/components/disciplines.tsx` | present — Phase 02 |
| `TimeComparison` | `src/components/then-now.tsx` (client) | present — Phase 03 |
| `FeaturedArtefact` | `src/components/featured.tsx` | present — Phase 04 |
| `StoryCTA` | `src/components/cta.tsx` | present — Phase 05 |
| `PaperDivider` | `src/components/torn-divider.tsx` | planned — Phase 05 |
| page shell | `src/app/page.tsx` (server) | done |

The spec’s `.jsx` names map to TSX kebab-case files. `data-*` attributes are the contract
between markup and animation code.

---

## 1. The Archaeological Reveal (hero · page entrance)

Rather than revealing the entire collage with a simple rectangular wipe, uncover it through
three irregular paper layers: a grainy black archival sheet retracts first, an old photograph
emerges second, the central portrait settles last. **Use an SVG mask with an irregular edge for
the signature reveal — not a plain `inset()`.** (The choreography sample below uses `clipPath`
inset as its baseline for simplicity; upgrade the collage reveal to the irregular SVG mask.)

Special detail: tiny caption fragments appear at the edges like cataloguing notes, then fade
into the composition. Keep these restrained and accessible.

### Target DOM structure (restructures `hero.tsx` in Phase 01)

```jsx
<section className="archive-hero" data-hero>
  <div className="hero-collage" data-collage>
    <div className="hero-collage__back" />
    <div className="hero-collage__middle" />
    <div className="hero-collage__front" />
  </div>

  <div className="hero-copy">
    <p data-hero-kicker>A LIVING RECORD OF NIGERIAN CREATIVITY</p>

    <h1>
      <span className="line-mask"><span data-hero-line>OUR PAST IS</span></span>
      <span className="line-mask"><span data-hero-line>STILL MAKING</span></span>
      <span className="line-mask"><span data-hero-line className="hero-italic">the future.</span></span>
    </h1>

    <p data-hero-description>
      A digital museum celebrating Nigeria's creative history
      across photography, music, fashion and design.
    </p>

    <a href="#collections" className="archive-link">
      EXPLORE THE ARCHIVE
      <span className="archive-link__arrow" aria-hidden="true">→</span>
    </a>
  </div>
</section>
```

Image layers are positioned independently in CSS from the actual collage assets
(`public/images/hero-collage.png`, `hero-collage-2.png`); `overflow: hidden` on each image
wrapper; hero copy above them with a higher stacking order. The hero image already covers
100% width with the left→right dark scrim (`.hero-collage::after`, hidden ≤760px) — keep that
contract when restructuring.

### GSAP choreography (reference sketch — put the `root` ref on the hero section itself)

```js
useGSAP(() => {
  if (prefersReducedMotion()) return;

  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(q('[data-collage]'),
      { clipPath: 'inset(0 0 0 100%)', x: 36 },
      { clipPath: 'inset(0 0 0 0)', x: 0, duration: 1.15 })
    .fromTo(q('[data-hero-line]'),
      { yPercent: 110, rotate: 1.5 },
      { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.12 },
      '-=0.48')
    .fromTo(q('[data-hero-kicker]'),
      { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 },
      '-=0.35')
    .fromTo(q('[data-hero-description]'),
      { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 },
      '-=0.22')
    .fromTo(q('.archive-link)'),
      { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 },
      '-=0.25');

  gsap.to(q('[data-collage]'), {
    yPercent: 5,
    ease: 'none',
    scrollTrigger: {
      trigger: root.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}, { scope: root });
```

### Ink-spread italic headline

Reveal the burnt-orange fill through a clipped pseudo-element instead of animating
`background-position` across browsers:

```css
.line-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
}
.line-mask > span {
  display: inline-block;
  will-change: transform;
}
.hero-italic {
  position: relative;
  color: var(--accent);
  font-style: italic;
}
@media (prefers-reduced-motion: reduce) {
  .line-mask { overflow: visible; }
  .line-mask > span { transform: none !important; }
}
```

For the full ink-spread effect, duplicate the italic phrase in a decorative overlay, clip the
overlay with an SVG mask, and animate the mask’s `x`. Keep the original text as the accessible
heading — no duplicate screen-reader content.

---

## 2. The Aṣọ-Òkè Weave (disciplines · signature moment)

Four archival objects uncovered in sequence, connected by a thread — not four generic
marketing tiles. Visual direction: tactile photography, rich archival contrast, restrained
motion, strong typographic hierarchy.

### A. Staggered unveil with image depth — one timeline for all four cards

Four independent triggers can fire at slightly different times and make the row feel
inconsistent; use a single timeline.

```js
const cards = gsap.utils.toArray('[data-discipline-card]');

gsap.fromTo(cards,
  { y: 54, rotate: (i) => (i % 2 === 0 ? -1.2 : 1.2), autoAlpha: 0 },
  {
    y: 0, rotate: 0, autoAlpha: 1,
    duration: 0.85, stagger: 0.14, ease: 'power3.out',
    scrollTrigger: { trigger: '[data-disciplines]', start: 'top 76%', once: true },
  });

cards.forEach((card) => {
  const image = card.querySelector('[data-card-image]');
  gsap.fromTo(image, { scale: 1.22 },
    {
      scale: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 82%', once: true },
    });
});
```

Attributes: `data-disciplines` on the section, `data-discipline-card` per card,
`data-card-image` per image (wrapper clips overflow).

### B. Thread connecting all four cards

Fine SVG path drawn across the cards on entry; it must pass **behind** the photographs, not
over their main subjects.

```jsx
<svg className="archive-thread" viewBox="0 0 1200 100"
     preserveAspectRatio="none" aria-hidden="true">
  <path data-thread-path
    d="M0 68 C120 68 120 24 300 40 S480 86 600 48
       S810 18 900 44 S1080 76 1200 28"
    fill="none" stroke="currentColor" strokeWidth="1.5" />
</svg>
```

```js
const thread = root.current?.querySelector('[data-thread-path]');
if (thread) {
  const length = thread.getTotalLength();
  gsap.set(thread, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(thread, {
    strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut',
    scrollTrigger: { trigger: '[data-disciplines]', start: 'top 72%', once: true },
  });
}
```

`pointer-events: none`; position behind the cards. **Recalculate the SVG path for mobile
layouts** — don’t compress the desktop curve until it becomes a meaningless straight line.

### C. Tactile hover (hover-capable devices only)

```js
const enter = () => {
  gsap.to(image, { scale: 1.06, duration: 0.75, ease: 'power3.out', overwrite: 'auto' });
  if (overlay) gsap.to(overlay, { autoAlpha: 1, duration: 0.45, overwrite: 'auto' });
};
const leave = () => {
  gsap.to(image, { scale: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
  if (overlay) gsap.to(overlay, { autoAlpha: 0, duration: 0.4, overwrite: 'auto' });
};
card.addEventListener('mouseenter', enter);
card.addEventListener('mouseleave', leave);
// Wire through contextSafe() / remove listeners in the enclosing useGSAP cleanup.
```

Touch devices keep straightforward tap interactions. Carried-over v1 details: card numerals
revealed by a mask after the image opens; arrow circle draws on hover (`stroke-dashoffset`).

---

## 3. The Memory Slip (Then / Now · generational transition)

The divider behaves like a physical bookmark moving through time; the effect becomes a
miniature story rather than a standard slider.

Three layers:

- The monochrome photograph is the fixed base (left region).
- The colour photograph sits above it, revealed by a clipped region.
- The divider moves with the reveal boundary; its small central handle resembles an
  **archival registration mark**. A tiny **year label** changes as the divider moves.

### Automatic first-view sequence (interruptible)

Start at the end of the old photograph (100%), move to 42%, pause briefly, settle at 50%.
This is the cinematic reveal, not the complete interaction — after it, the user drags with
pointer, keyboard (already implemented: ArrowLeft/Right ±5) and touch.

```js
const position = { value: 50 };

const renderPosition = (value) => {
  // Adapted to this repo: --pos drives the THEN (monochrome) width; the CSS already
  // clips `.then` with inset(0 calc(100% - var(--pos)) 0 0) and positions the divider.
  slider.style.setProperty('--pos', `${value}%`);
  if (yearLabel) yearLabel.textContent = eraFor(value);
};

renderPosition(100); // start: old photograph fills the frame

gsap.timeline({ scrollTrigger: { trigger: slider, start: 'top 72%', once: true } })
  .to(position, { value: 42, duration: 1.35, ease: 'power2.inOut',
                  onUpdate: () => renderPosition(position.value) })
  .to({}, { duration: 0.3 })
  .to(position, { value: 50, duration: 0.75, ease: 'power3.out',
                  onUpdate: () => renderPosition(position.value) });
```

**Critical:** do not leave the automatic timeline running after the user starts interacting.
Kill/interrupt it on the first pointer or keyboard interaction, then transfer control to the
user’s chosen position — the divider must never fight their hand.

- The component already owns `--pos` React state for drag/keyboard — the timeline must drive
  that same single source (no independent DOM mutations).
- Reduced motion: no autoplay; manual slider stays fully functional.
- Carried-over v1 details: THEN/NOW side labels, headline word-stagger, magnetic drag feel.

---

## 4. The Sonic Archive (Featured artefact · object animation)

- The vinyl rotates at a slow, constant rate **only while the artefact is visible**.
- Sleeve and disc have separate entrance paths (physical sliding-out effect).
- The artefact title reveals **after** the object settles (per-character animation is
  reserved for this artefact only).
- Thumbnail selection updates the artefact as **one coordinated sequence**: artwork, title,
  year and discipline crossfade together with a short vertical text transition. The rail is
  an interactive catalogue, not decoration.
- On leaving the viewport rotation pauses and resumes on return.

```js
const vinyl = root.current.querySelector('[data-vinyl]');

const spin = gsap.to(vinyl, {
  rotation: '+=360', duration: 8, ease: 'none', repeat: -1, paused: true,
});

ScrollTrigger.create({
  trigger: '[data-featured-artefact]',
  start: 'top 80%',
  end: 'bottom 20%',
  onEnter: () => spin.play(),
  onEnterBack: () => spin.play(),
  onLeave: () => spin.pause(),
  onLeaveBack: () => spin.pause(),
});
```

Explicit `onEnter/onEnterBack/onLeave/onLeaveBack` callbacks replace
`toggleActions: "play none none pause"` for the vinyl — clearer intent, correct
pause/resume. Create the tween only when reduced motion is not requested; kill it on
dispose. If the page grows, prefer one shared visibility manager
(`IntersectionObserver`) over many redundant triggers.

**Ownership rule:** React owns *which* artefact is selected; GSAP owns *how* the old and new
content transitions. Never let both systems mutate the same title or image source.

Carried-over v1 details: meta text letter-spacing settles into place; thumbnail accent sweep
plays once.

---

## 5. The Oral History Thread (Story submission → footer transition)

Carry one thin burnt-orange line from the final artefact section into the sharing CTA. It
bends like a hand-drawn route across the page, briefly connecting a photograph, a handwritten
annotation and the “Share your story” button.

Special detail: the CTA’s torn paper uncovers the call to action **in two stages** — the
background photograph develops first; the text follows, as if the memory is being brought
into focus.

---

## 6. Torn-paper transitions between sections (the missing signature)

Instead of a straight divider between the cream and black sections, use an irregular SVG
silhouette at the boundary. Recommended: a **static, carefully art-directed SVG edge first**,
then animate its mask — more controllable than morphing unrelated paths. Use the real paper
edge as the mask, not a decorative zigzag.

```jsx
<div className="archive-transition" aria-hidden="true">
  <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path data-paper-edge fill="currentColor"
      d="M0 45 L95 36 L174 49 L268 28 L355 41
         L447 24 L535 39 L640 20 L745 38 L852 27
         L951 44 L1050 23 L1150 41 L1260 29
         L1350 44 L1440 32 L1440 100 L0 100 Z" />
  </svg>
</div>
```

```css
.archive-transition {
  position: relative;
  height: 44px;
  margin-top: -1px;
  overflow: hidden;
  pointer-events: none;
  color: #080907; /* background colour of the section this edge belongs to */
}
.archive-transition svg { display: block; width: 100%; height: 100%; }
```

Set `currentColor` to the background colour of the section the edge belongs to. Add a small
paper-grain overlay for conviction, and **vary the edge slightly between boundaries**.
Creative upgrade: use the same irregular silhouette as a mask for the *next* section’s
background image — the edge then becomes the instrument that reveals the next memory.

---

## 7. Additional polish

- **Archival typography.** Restrained staggered nav entrance; serif headings use line masks;
  small uppercase labels fade with a short letter-spacing adjustment. Per-character animation
  only on the featured artefact.
- **Curator’s cursor.** Desktop only: optional small “VIEW ARTEFACT” label over interactive
  photographs. Keep the real pointer accessible — never replace it globally; disable for
  touch and reduced-motion users.
- **Rhythmic motion without sound.** Reveal, settle, reveal, settle for the four cards; three
  tiny drum bars beside a section label animate during the initial entrance only. No audio.
- **A continuous visual thread.** One fine burnt-orange line repeated across the discipline
  section, comparison slider and footer, changing form (woven thread → timeline marker →
  handwritten route) without literally drawing the same decoration everywhere.

## Performance and accessibility rules

- Animate `transform` and `opacity` wherever possible. Reserve `clip-path` for the signature
  reveals and test them on mobile GPUs.
- `will-change` selectively, never on every image permanently.
- All primary text and images visible if JavaScript fails (progressive enhancement).
- Respect `prefers-reduced-motion` globally **and** per component: no continuous rotation, no
  autoplay, shortened transitions, manual slider preserved.
- Interactive cards and artefacts keyboard accessible, visible focus states, meaningful
  labels.
- Keep scrolling native where possible — Lenis makes scrolling smoother; it must not
  interfere with anchor links, focus movement or browser navigation.
- Test with production-sized images; `ScrollTrigger.refresh()` after important layout changes
  (already wired: `document.fonts.ready` + `window load` in the provider).

## Implementation order

1. **Hero excavation** — layered collage reveal, headline masks, restrained parallax. Set the
   visual identity of the motion; create `src/lib/motion-preferences.ts` here.
2. **Discipline weave** — staggered cards + connecting SVG thread; validate mobile and
   desktop layouts.
3. **Time dissolve** — image reveal, auto-sweep (100→42→50), interrupt-on-interaction,
   manual drag, keyboard control, reduced-motion behaviour.
4. **Sonic artefact** — vinyl rotation lifecycle (explicit visibility callbacks) and
   React-driven artefact switching.
5. **Paper transitions and CTA** — torn dividers, two-stage CTA develop, then navigation,
   hover details and microinteractions.

The biggest win comes from hero + discipline weave + Then/Now dissolve as a coherent system
first; vinyl and torn-paper transitions reinforce that character rather than compete with it.

## Visual direction references

May be expiring signed URLs — re-host if needed:

- [Scramble for Africa 2-3 (2023), David Alekhuogie](https://images.openai.com/static-rsc-4/ybq_Vx5ZSD7DfcFz3ftUC28zcxVJEEjVyqNdmjnbUjY9ICfUOJvcHZ0PeaebPGk4hUQbUsEUa0Cli58GuopN3K5VRk3VYWPA2t1Ujzo4A6SLdQYKQ5jstwdsTax_MpcjlVPA4ZmAqlq54H1QMVRoVB9aUXVX7ZT8JRa0BCW53II?purpose=inline) — overall editorial/collage direction
- [Aṣọ-Òkè vs. other Nigerian fabrics, Woven Market Africa](https://images.openai.com/static-rsc-4/VZX1onQVOTE8yn3WuB08wpnLy3dZ_eNhyOl3tOBMOYmA-N5xpC59FHVrEayO2ByTuUCi8BPBlwUfPtu81EqjRA9CXybxpY4uw1DdUxE2wdpMw9yphcrtgvpJ3aEYPlWAyCyOutGYhO8KgM-yUZjLszQdKCJ7xg8tkrEOE2wqUOQ?purpose=inline) — weave/thread motif
- [James Barnor, AGIP with Graphic Designer, 1974](https://images.openai.com/static-rsc-4/VDQPH4GjYsNsd1IDn5LGoDdQWJvrW-KY1HizmKpmZgnxA3pgKP9Qb_65quiiCIqSEf0w6K5amJj6NKEbsmqIBoDoE5QtxDHZtOGO14sFVhT6zxEfn_2gQk2NITS5XcjluaidHR26ImagmFvl1DVZ36xGVPOMvDR-a9rc8eYTUdo?purpose=inline) — archival photography
- [Dr. Orlando Owoh and His Young Kenneries Band](https://images.openai.com/static-rsc-4/9hSxrSD0Ja4SKL5vA8nX3u-zzSCkLWdKv_n4clXKlMQ5eX-Vq89ZbmswMCzRZkph-eaK5MUXB09bF8wt0EpIU7P-fnzysN8--lYiXK3rytDI8cqesTALK1RNptO6jOzahXpbVeRTrgvS9jfLyNVKPyQFTqk1Nifn2VqcioIbcQE?purpose=inline) — music artefact
- [Rare Portraits of the Nigerian Royal Court, Mid-1900s](https://images.openai.com/static-rsc-4/59-V17SzQ6AQGgZ_TvAlaqwmeE7aX7-_7IUT-cU1StZARxn8sG7UW9f4lM4XE5lRkOXfGe5STSNiat0RPWKLEiQZS8b1bRXgWBaBtYiyPGIAGgT-RRabkUuqce6jvQpDt9GIwE1FxvMF7O7r3TH3nxV67xKqKOE2Z8hvTn2Nd_8?purpose=inline) — portraiture depth
- [Trevor Stuurman, Art & Prints](https://images.openai.com/static-rsc-4/B2fA80hYsdOR2_SHOPVuEkrZX2Ap5V-I-fnHvPMskFI1iR0ik79rdpixb2KmEQpBlNqmXrPqIYj9cOKwTq-M-yBoeZ6Denw8j-20rJG-aVQxRDYaXHTiF4z_Bjbl7_oWJvqA7o7FCJpC4g4NVVCUsSc-oZJc-KUn6OSwTnAxHf4?purpose=inline), [Fela Kuti, Zombie (1976/77)](https://images.openai.com/static-rsc-4/qOeORM6K5iZV-FXRABKu4wIxnSVyfK8ubF4X9adqiSeiQvBp1xDhWBBOIkCJkUn8wz4Zh1CrMdJnnnMs4esWWDCKJRrFOxaUg9yefvMDGBp8ZA3igag5j5rye0ID_MvwrTInGNKFB95uVVo0Be2jg1mCSEAWXcRUHwgBzgvmKnM?purpose=inline), [David Armstrong, LUMA Arles](https://images.openai.com/static-rsc-4/THtOMCQjhz6La_8okVCGsjHp8PwGtVOwgMZxw-FKE10qVZdor_QFnpnC-HkRcAA7PfdjvavWxF290qb63ov7GyWt9_4GOeok976GV9lRks5p3NLeXm5yYEZ4lKwfCUYuIhbAlkmOtpYY-FBksBZsjL2296PsA2t4BSvT74KS3lk?purpose=inline) — discipline cards
- [Beige handmade paper with torn edge](https://images.openai.com/static-rsc-4/jyrXObhm81TvCOJJUVwyr-ozvqmfGGdMIimyDVCZOjZfZAvRqSa6vjx3oE8_kDZwtVRNhwEjY7pcqCY1MlfR8E08ttKcK6nWaKIuE63He8SdFuzeQrQ2myJlyHWnsRFVj7ocUzT-BIeEYNrvh-0jTMsjNpzzrZBvt1f9WhKS3s4tzMq7GOv3wfwAj_LX4Y5-?purpose=inline) — torn-paper edge

Local reference: `.ref/archive-landing.html` (git-ignored) and `public/images/`.

## Carried-over v1 details (still in force)

- Header: blur/border treatment on scroll; restrained nav stagger on entrance.
- Disciplines: numerals revealed by mask after image opens; arrow circle draw on hover;
  thread passes behind cards.
- Then/Now: THEN/NOW side labels; headline word-stagger; magnetic drag follow (~0.3 s).
- Featured: meta letter-spacing settle; thumbnail accent sweep once; per-character title
  reveal (only here).
- CTA: button hover trail; collage elements gentle yoyo float.

**Explicitly superseded by v2:** gradient `background-clip` ink sweep → clipped pseudo-element;
`toggleActions: "play none none pause"` for vinyl → explicit visibility callbacks; Then/Now
sweep target 40% → **42%** (then settle 50%); rectangular hero wipe → irregular SVG mask.

## Verification

After any animation work: `pnpm lint && pnpm build`. Manually confirm: no layout shift at
first paint, Strict Mode double-mount leaves exactly one Lenis instance, reduced-motion gives
a static readable page, keyboard paths work (slider arrows, focus ring), images are
production-sized, and clip-path reveals are tested on mobile GPUs.
