"use client";

import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-preferences";

const navLinks = [
  { href: "#archive", label: "Collections" },
  { href: "#featured", label: "About" },
  { href: "#thennow", label: "Explore" },
];

export function SiteHeader() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        gsap.utils.selector(root)("[data-nav-item]"),
        { autoAlpha: 0, y: -8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.1,
        },
      );
    },
    { scope: root },
  );

  return (
    <header className="site-header" ref={root}>
      <div className="wrap">
        <a className="logo" href="#" aria-label="ARCHIVE home" data-nav-item>
          ARCHIVE<i>.</i>
        </a>
        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-nav-item>
              {link.label}
            </a>
          ))}
        </nav>
        <button className="search" type="button" aria-label="Search" data-nav-item>
          <HugeiconsIcon icon={Search01Icon} size={24} strokeWidth={1.6} />
        </button>
      </div>
    </header>
  );
}
