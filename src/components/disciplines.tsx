import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

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

export function Disciplines() {
  return (
    <section className="disc" id="archive">
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
          {disciplines.map((discipline) => (
            <article
              key={discipline.num}
              className="card"
              style={{ backgroundColor: discipline.tint }}
            >
              <Image
                src={`/images/${discipline.image}`}
                alt={`${discipline.title} collection`}
                fill
                sizes={cardSizes}
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
