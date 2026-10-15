"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ChevronsLeftRightIcon } from "@hugeicons/core-free-icons";

const compareSizes = "(max-width: 760px) 100vw, 64vw";

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function ThenNow() {
  const [pos, setPos] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setFromPointer = (clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPos((p) => clamp(p - 5));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPos((p) => clamp(p + 5));
    }
  };

  return (
    <section className="thennow" id="thennow">
      <div className="wrap tn-grid">
        <div className="tn-copy">
          <p className="kicker">Then / Now</p>
          <h2>
            Same Roots.
            <br />
            New Expressions.
          </h2>
          <p>
            Discover how Nigeria’s creative spirit continues to evolve across
            generations.
          </p>
          <a className="pill sm" href="#">
            Explore the comparisons
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.6} />
          </a>
        </div>
        <div
          className="compare"
          ref={boxRef}
          style={{ "--pos": `${pos}%` } as CSSProperties}
          onPointerDown={(event) => {
            draggingRef.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            setFromPointer(event.clientX);
          }}
          onPointerMove={(event) => {
            if (draggingRef.current) setFromPointer(event.clientX);
          }}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
          onPointerCancel={() => {
            draggingRef.current = false;
          }}
        >
          <div className="now">
            <Image
              src="/images/now-photo.jpg"
              alt="Vibrant colour street scene of contemporary Nigeria"
              fill
              sizes={compareSizes}
            />
          </div>
          <div className="then">
            <Image
              src="/images/then-photo.jpg"
              alt="Black-and-white street scene from Nigeria’s past"
              fill
              sizes={compareSizes}
            />
          </div>
          <div className="divider" />
          <div
            className="handle"
            role="slider"
            tabIndex={0}
            aria-label="Compare then and now"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={handleKeyDown}
          >
            <HugeiconsIcon icon={ChevronsLeftRightIcon} size={20} strokeWidth={1.6} />
          </div>
        </div>
      </div>
    </section>
  );
}
