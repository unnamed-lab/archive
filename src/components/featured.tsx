import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

const thumbs = [
  { num: "01", label: "Music", image: "thumb-music.jpg" },
  { num: "02", label: "Photography", image: "thumb-photography.jpg" },
  { num: "03", label: "Fashion", image: "thumb-fashion.jpg" },
  { num: "04", label: "Design", image: "thumb-design.jpg" },
];

export function Featured() {
  return (
    <section className="feat" id="featured">
      <div className="wrap feat-grid">
        <div className="sleeve-wrap">
          <div className="vinyl" aria-hidden="true" />
          <div className="sleeve">
            <Image
              src="/images/fela-album-cover.jpg"
              alt="Album cover artwork for Fela Kuti’s This Is Africa"
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1000px) 46vw, 31vw"
            />
          </div>
        </div>
        <div>
          <p className="kicker">Featured artefact</p>
          <h2>
            Fela Kuti <em>This Is Africa</em>
          </h2>
          <div className="meta">
            <span>1972</span>
            <span>Album Cover Design</span>
            <span>by Ola Olaniyi</span>
          </div>
          <p className="body">
            This iconic album cover is a powerful expression of Fela Kuti’s
            political consciousness and African identity. The bold typography,
            collage style and vibrant colours became a defining visual language
            for Nigerian music and graphic design.
          </p>
          <a className="pill dark" href="#">
            View details
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.6} />
          </a>
        </div>
        <ul className="thumbs">
          {thumbs.map((thumb) => (
            <li key={thumb.num}>
              <Image
                src={`/images/${thumb.image}`}
                alt=""
                width={76}
                height={76}
              />
              <span>
                {thumb.num}
                <br />
                {thumb.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
