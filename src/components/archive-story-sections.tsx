"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import {
  useArchiveSectionMotion,
  useJourneySectionMotion,
} from "@/hooks/useArchiveSectionMotion";

export function ArchiveStorySections() {
  const motionRoot = useArchiveSectionMotion();

  return (
    <section className="photo" id="photography" data-photo-archive ref={motionRoot}>
      <div className="wrap">
        <div className="photo-head" data-photo-heading>
          <div>
            <p className="kicker">The photography archive</p>
            <h2>
              The Photography
              <br />
              Archive
            </h2>
          </div>
          <p className="lede" data-photo-description>
            The Photography Archive brings these moments together, tracing
            Nigeria’s story through the eyes of those who witnessed it. From old
            Lagos streets and family portraits to cultural celebrations,
            changing cityscapes, and generations finding their place in the
            world.
          </p>
        </div>

        <article className="ex-hero" data-featured-exhibition>
          <div className="ex-hero-img" data-exhibition-image>
            <Image
              src="/images/exhibition-lagos-through-time.jpg"
              alt="Lagos streets through time"
              fill
              sizes="100vw"
              preload
            />
          </div>
          <div className="ex-copy" data-exhibition-copy>
            <div className="ex-top">
              <p className="kicker">Featured exhibition</p>
              <span className="count">
                01<span>/ 05</span>
              </span>
            </div>
            <h3 data-exhibition-title>
              Lagos,
              <br />
              Through Time
            </h3>
            <p>The streets, the people, the changing city.</p>
            <a className="enter" href="#">
              <span className="circ-btn">
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={20}
                  strokeWidth={1.6}
                />
              </span>
              Enter exhibition
            </a>
          </div>
        </article>

        <div className="ex-grid" data-exhibition-grid>
          <article className="ex-card" data-exhibition-card>
            <div className="ex-card-img">
              <span className="badge">02</span>
              <Image
                src="/images/exhibition-faces-of-a-nation.jpg"
                alt="Faces of a Nation"
                fill
                sizes="25vw"
              />
            </div>
            <div className="ex-body">
              <p className="kicker">Exhibition</p>
              <h4>Faces of a Nation</h4>
              <p>Portraits, identity and everyday life.</p>
              <a className="enter" href="#">
                <span className="circ-btn">
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={1.6}
                  />
                </span>
                Enter
              </a>
            </div>
          </article>

          <article className="ex-card" data-exhibition-card>
            <div className="ex-card-img">
              <span className="badge">03</span>
              <Image
                src="/images/exhibition-a-nation-in-motion.jpg"
                alt="A Nation in Motion"
                fill
                sizes="25vw"
              />
            </div>
            <div className="ex-body">
              <p className="kicker">Exhibition</p>
              <h4>A Nation in Motion</h4>
              <p>Moments that became collective memory.</p>
              <a className="enter" href="#">
                <span className="circ-btn">
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={1.6}
                  />
                </span>
                Enter
              </a>
            </div>
          </article>

          <article className="ex-card" data-exhibition-card>
            <div className="ex-card-img">
              <span className="badge">04</span>
              <Image
                src="/images/exhibition-the-way-we-wore.jpg"
                alt="The Way We Wore"
                fill
                sizes="25vw"
              />
            </div>
            <div className="ex-body">
              <p className="kicker">Exhibition</p>
              <h4>The Way We Wore</h4>
              <p>Style, textiles and self-expression.</p>
              <a className="enter" href="#">
                <span className="circ-btn">
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={1.6}
                  />
                </span>
                Enter
              </a>
            </div>
          </article>

          <article className="ex-card" data-exhibition-card>
            <div className="ex-card-img">
              <span className="badge">05</span>
              <Image
                src="/images/exhibition-after-dark.jpg"
                alt="After Dark"
                fill
                sizes="25vw"
              />
            </div>
            <div className="ex-body">
              <p className="kicker">Exhibition</p>
              <h4>After Dark</h4>
              <p>Nightlife, music and cultural energy.</p>
              <a className="enter" href="#">
                <span className="circ-btn">
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={1.6}
                  />
                </span>
                Enter
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  const motionRoot = useJourneySectionMotion();

  return (
    <section className="journey" data-story-bridge ref={motionRoot}>
      <div className="journey-bg" data-story-collage>
        <Image
          src="/images/journey-collage.png"
          alt="Woven collage representing the journey continues"
          fill
          sizes="30vw"
        />
      </div>
      <div className="wrap journey-grid">
        <div className="journey-copy" data-story-copy>
          <p className="kicker">The journey continues</p>
          <h2>
            More stories.
            <br />
            Same roots.
          </h2>
          <p className="sub">
            Explore the other creative disciplines that shape Nigeria’s cultural
            identity.
          </p>
        </div>
        <ul className="jlist">
          <li>
            <a href="#" data-story-link>
              <span>Music</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={1.6}
              />
            </a>
          </li>
          <li>
            <a href="#" data-story-link>
              <span>Fashion</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={1.6}
              />
            </a>
          </li>
          <li>
            <a href="#" data-story-link>
              <span>Design</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={1.6}
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
