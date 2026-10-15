import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ARCHIVE — A living record of Nigerian creativity";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const collageData = await readFile(
  join(process.cwd(), "public/images/cta-collage.png"),
);
const collageSrc = `data:image/png;base64,${collageData.toString("base64")}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#10110f",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 16,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(240,229,211,0.68)",
            }}
          >
            A living record of Nigerian creativity
          </span>
          <span
            style={{
              display: "block",
              fontSize: 92,
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "#f0e5d3",
            }}
          >
            ARCHIVE<span style={{ color: "#e6502e" }}>.</span>
          </span>
          <span
            style={{
              display: "block",
              fontSize: 20,
              color: "rgba(240,229,211,0.84)",
            }}
          >
            Same people. New stories.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            width: 520,
            height: 520,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={collageSrc}
            width={520}
            height={520}
            style={{
              objectFit: "contain",
            }}
            alt=""
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
