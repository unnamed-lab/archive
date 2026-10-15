import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-copy">
          <p className="kicker">A living record of Nigerian creativity</p>
          <h1>
            Our past is still making <em>the future.</em>
          </h1>
          <p>
            A digital museum celebrating Nigeria’s creative history across
            photography, music, fashion and design.
          </p>
          <a className="arrow-btn" href="#archive">
            Explore the archive{" "}
            <span className="circ">
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.6} />
            </span>
          </a>
        </div>
      </div>
      <div className="hero-collage">
        <Image
          src="/images/hero-collage.png"
          alt="Moody mixed-media collage with torn-paper edges"
          fill
          sizes="100vw"
          preload
        />
      </div>
    </section>
  );
}
