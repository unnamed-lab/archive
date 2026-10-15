import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnimationProvider } from "@/components/animation-provider";
import { CuratorCursor } from "@/components/curator-cursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ARCHIVE — A living record of Nigerian creativity",
  description:
    "A digital museum celebrating Nigeria’s creative history across photography, music, fashion and design.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AnimationProvider>{children}</AnimationProvider>
        <CuratorCursor />
      </body>
    </html>
  );
}
