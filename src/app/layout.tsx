import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnimationProvider } from "@/components/animation-provider";
import { ArchiveLoader } from "@/components/archive-loader";
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
  metadataBase: new URL("https://archive.vercel.app"),
  title: {
    default: "ARCHIVE — A living record of Nigerian creativity",
    template: "%s | ARCHIVE",
  },
  description:
    "A digital museum celebrating Nigeria’s creative history across photography, music, fashion and design.",
  keywords: [
    "Nigeria",
    "Nigerian creativity",
    "archive",
    "photography",
    "music",
    "fashion",
    "design",
    "cultural heritage",
  ],
  authors: [{ name: "ARCHIVE" }],
  creator: "ARCHIVE",
  publisher: "ARCHIVE",
  openGraph: {
    type: "website",
    title: "ARCHIVE — A living record of Nigerian creativity",
    description:
      "A digital museum celebrating Nigeria’s creative history across photography, music, fashion and design.",
    url: "https://archive.vercel.app",
    siteName: "ARCHIVE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ARCHIVE — A living record of Nigerian creativity",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ArchiveLoader />
        <AnimationProvider>{children}</AnimationProvider>
        <CuratorCursor />
      </body>
    </html>
  );
}
