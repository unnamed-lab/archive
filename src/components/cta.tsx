import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function Cta() {
  return (
    <section className="cta">
      <div className="cta-bg">
        <Image
          src="/images/cta-background.jpg"
          alt=""
          fill
          sizes="58vw"
        />
      </div>
      <div className="cta-collage">
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
