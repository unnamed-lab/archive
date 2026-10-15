export interface Artefact {
  num: string;
  discipline: string;
  thumb: string;
  tint: string;
  image: string;
  title: string;
  titleEm: string;
  meta: readonly [string, string, string];
  body: string;
}

export const artefacts: readonly Artefact[] = [
  {
    num: "01",
    discipline: "Music",
    thumb: "thumb-music.jpg",
    tint: "#6a3a24",
    image: "fela-album-cover.jpg",
    title: "Fela Kuti",
    titleEm: "This Is Africa",
    meta: ["1972", "Album Cover Design", "by Ola Olaniyi"],
    body: "This iconic album cover is a powerful expression of Fela Kuti’s political consciousness and African identity. The bold typography, collage style and vibrant colours became a defining visual language for Nigerian music and graphic design.",
  },
  {
    num: "02",
    discipline: "Photography",
    thumb: "thumb-photography.jpg",
    tint: "#2a2a2a",
    image: "thumb-photography.jpg",
    title: "Photography",
    titleEm: "Entry Pending",
    meta: ["Year TBC", "Photographic Series", "Credit TBC"],
    body: "Placeholder entry for this discipline. Replace with the collection’s real title, year, maker and artwork.",
  },
  {
    num: "03",
    discipline: "Fashion",
    thumb: "thumb-fashion.png",
    tint: "#7a2a2a",
    image: "thumb-fashion.png",
    title: "Fashion",
    titleEm: "Entry Pending",
    meta: ["Year TBC", "Textile Design", "Credit TBC"],
    body: "Placeholder entry for this discipline. Replace with the collection’s real title, year, maker and artwork.",
  },
  {
    num: "04",
    discipline: "Design",
    thumb: "thumb-design.png",
    tint: "#1f3f8a",
    image: "thumb-design.png",
    title: "Design",
    titleEm: "Entry Pending",
    meta: ["Year TBC", "Graphic Design", "Credit TBC"],
    body: "Placeholder entry for this discipline. Replace with the collection’s real title, year, maker and artwork.",
  },
];
