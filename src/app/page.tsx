import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Disciplines } from "@/components/disciplines";
import { ThenNow } from "@/components/then-now";
import { Featured } from "@/components/featured";
import { Cta } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Disciplines />
        <ThenNow />
        <Featured />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
