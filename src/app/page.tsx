import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Disciplines } from "@/components/disciplines";
import { ThenNow } from "@/components/then-now";
import {
  ArchiveStorySections,
  JourneySection,
} from "@/components/archive-story-sections";
import { Featured } from "@/components/featured";
import { Cta } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";
import { TornDivider } from "@/components/torn-divider";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TornDivider variant="a" above="#0d0c0b" below="var(--paper)" />
        <Disciplines />
        <TornDivider
          variant="b"
          above="var(--paper)"
          below="var(--black)"
          reveal="up"
        />
        <ThenNow />
        <TornDivider variant="c" above="var(--black)" below="var(--paper)" />
        <ArchiveStorySections />
        <TornDivider
          variant="a"
          above="var(--paper)"
          below="var(--black)"
          reveal="up"
        />
        <JourneySection />
        <TornDivider
          variant="c"
          above="var(--black)"
          below="var(--paper)"
          reveal="up"
        />
        <Featured />
        <TornDivider
          variant="b"
          above="var(--paper)"
          below="var(--black)"
          reveal="up"
        />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
