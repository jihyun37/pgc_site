import type { Metadata } from "next";
import Image from "next/image";
import ContactCta from "@/components/ContactCta";
import PageHero from "@/components/PageHero";
import { ArrowLink, Container, SectionLabel } from "@/components/ui";
import { advantages, identity, intro, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: intro.body[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About PGC"
        title={
          <>
            Designed for
            <br />
            Business & Stay
          </>
        }
        subtitle={site.tagline}
        image="/images/building-205-dusk.jpg"
        alt="Building 205 at Pangyo Global Campus at golden hour"
        position="50% 45%"
      />

      {/* Introduction */}
      <section className="bg-warm-white py-24 md:py-36">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <SectionLabel>Introduction</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-[1] md:text-[60px]">
              {intro.headline[0]}
              <br />
              {intro.headline[1]}
            </h2>
          </div>
          <div className="reveal md:col-span-6 md:col-start-7" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {intro.body.map((b) => (
              <p key={b} className="mb-5 text-[16px] leading-[1.9] text-charcoal/75">
                {b}
              </p>
            ))}
            <p className="mt-8 font-serif text-[24px] italic">{intro.lead}</p>
          </div>
        </Container>

        <Container className="mt-20 grid gap-6 md:mt-28 md:grid-cols-12 md:gap-8">
          <figure className="md:col-span-8">
            <div className="reveal-img relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/building-205-street.jpg"
                alt="Building 205 exterior and gated entrance"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
          <div className="grid gap-6 md:col-span-4 md:gap-8">
            <div className="reveal-img relative aspect-[3/2] overflow-hidden md:aspect-auto">
              <Image src="/images/campus-garden.jpg" alt="Campus garden terrace with reflecting pool" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="reveal-img relative aspect-[3/2] overflow-hidden md:aspect-auto" style={{ "--delay": "150ms" } as React.CSSProperties}>
              <Image src="/images/campus-walkway.jpg" alt="Tree-lined walkway beside Building 205" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* Identity */}
      <section id="identity" className="scroll-mt-20 bg-ivory py-24 md:py-36">
        <Container>
          <div className="reveal">
            <SectionLabel>Space Beyond Stay</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-none md:text-[72px]">PGC Space Identity</h2>
          </div>
          <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
            {identity.map((it, i) => (
              <article key={it.key} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
                <div className={`reveal-img relative aspect-[4/3] overflow-hidden md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                  <Image src={it.image} alt={it.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className={`reveal md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                  <p className="font-serif text-[15px] text-warm-gray">0{i + 1}</p>
                  <h3 className="mt-2 font-serif text-[56px] font-light leading-none md:text-[88px]">{it.key}</h3>
                  <p className="mt-6 text-[18px] font-medium">{it.line}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">{it.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Location advantage */}
      <section id="advantage" className="scroll-mt-20 bg-warm-white py-24 md:py-36">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <SectionLabel>Well-Connected Location</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-none md:text-[60px]">
              PGC Location
              <br />
              Advantage
            </h2>
            <div className="reveal-img relative mt-12 aspect-[821/689] overflow-hidden border border-line">
              <Image src="/images/location-map.jpg" alt="Map showing TH212 Pangyo near Pangyo and Bundang" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                className="reveal border-t border-charcoal/15 py-8 first:border-t-0 first:pt-0 md:py-10"
                style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <dt className="flex items-baseline gap-4">
                  <span className="font-serif text-[14px] text-warm-gray">0{i + 1}</span>
                  <span className="font-serif text-[34px] font-light">{a.title}</span>
                </dt>
                <dd className="mt-3 pl-9 text-[15px] leading-[1.85] text-charcoal/70">{a.body}</dd>
              </div>
            ))}
            <div className="reveal pl-9 pt-4">
              <ArrowLink href="/location">Directions & Parking</ArrowLink>
            </div>
          </dl>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
