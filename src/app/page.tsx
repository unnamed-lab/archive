import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Disciplines } from "@/components/disciplines";
import { ThenNow } from "@/components/then-now";
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
        <TornDivider variant="b" above="var(--paper)" below="var(--black)" />
        <ThenNow />
        <TornDivider variant="c" above="var(--black)" below="var(--paper)" />
        <Featured />
        <TornDivider variant="a" above="var(--paper)" below="var(--black)" />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
