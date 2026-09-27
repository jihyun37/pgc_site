import Image from "next/image";
import Link from "next/link";
import ContactCta from "@/components/ContactCta";
import GuidelineIcon from "@/components/GuidelineIcon";
import Hero from "@/components/Hero";
import SpaceScroller, { type SpacePanel } from "@/components/SpaceScroller";
import SpacesGallery, { type GalleryItem } from "@/components/SpacesGallery";
import { ArrowLink, Container, SectionLabel } from "@/components/ui";
import { guidelines, stayFlow } from "@/content/guide";
import { businessRoom, guestRoom, rooms } from "@/content/rooms";
import { directions, identity, intro, site } from "@/content/site";

const panels: SpacePanel[] = [
  {
    label: "The Campus",
    title: "Building 205",
    lead: "Nature and terrace living, in Daejang-dong.",
    body: "A high-end terrace residence within TH212 Pangyo, surrounded by forest and seasonal gardens — minutes from Pangyo's business district.",
    href: "/about",
    image: "/images/building-205-street.jpg",
    alt: "Building 205 exterior at Pangyo Global Campus",
  },
  {
    label: `Room ${businessRoom.number}`,
    title: businessRoom.name,
    lead: "Designed for meetings, work and networking.",
    body: businessRoom.description[0],
    meta: businessRoom.facts.map((f) => `${f.value} ${f.label}`).join(" · "),
    href: `/${businessRoom.slug}`,
    image: businessRoom.living.src,
    alt: businessRoom.living.alt,
  },
  {
    label: `Room ${guestRoom.number}`,
    title: guestRoom.name,
    lead: "Designed for stay, rest and privacy.",
    body: guestRoom.description[0],
    meta: guestRoom.facts.map((f) => `${f.value} ${f.label}`).join(" · "),
    href: `/${guestRoom.slug}`,
    image: guestRoom.living.src,
    alt: guestRoom.living.alt,
  },
];

const gallery: GalleryItem[] = rooms.flatMap((r) =>
  [{ name: "Living Lounge", src: r.living.src, alt: r.living.alt }, ...r.spaces].map((s) => ({
    category: `${r.number} ${r.name}`,
    name: s.name,
    src: s.src,
    alt: s.alt,
    href: `/${r.slug}`,
    position: "position" in s ? s.position : undefined,
  })),
);

const commonAmenities = businessRoom.amenities.filter((a) => guestRoom.amenities.includes(a));

export default function Home() {
  return (
    <>
      <Hero />

      {/* ABOUT — generous white space, text weighted to the right (reference intro) */}
      <section id="about" className="relative overflow-hidden bg-warm-white py-28 md:py-44">
        <svg
          className="pointer-events-none absolute -left-40 top-1/2 hidden size-[640px] -translate-y-1/2 text-line md:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
          aria-hidden
        >
          <circle cx="50" cy="50" r="49" />
          <circle cx="50" cy="50" r="36" />
        </svg>
        <Container className="relative grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-5 md:col-start-2">
            <SectionLabel>{intro.label}</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-[1] md:text-[64px]">
              {intro.headline[0]}
              <br />
              {intro.headline[1]}
            </h2>
          </div>
          <div className="reveal md:col-span-5 md:col-start-8 md:pt-16" style={{ "--delay": "150ms" } as React.CSSProperties}>
            <p className="text-[19px] font-medium leading-snug md:text-[21px]">{intro.lead}</p>
            {intro.body.map((b) => (
              <p key={b} className="mt-5 text-[15px] leading-[1.9] text-charcoal/70">
                {b}
              </p>
            ))}
            <div className="mt-12">
              <ArrowLink href="/about">View More</ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      {/* SPACE OVERVIEW — sticky split with dots */}
      <section aria-label="Our spaces">
        <Container className="py-20 md:py-28">
          <div className="reveal text-center">
            <SectionLabel>Our Spaces</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-[1.02] md:text-[68px]">
              Two Spaces.
              <br />
              One Business Experience.
            </h2>
          </div>
        </Container>
        <SpaceScroller panels={panels} />
      </section>

      {/* EXPERIENCE — WORK. STAY. CONNECT. */}
      <section className="bg-ivory py-28 md:py-40">
        <Container>
          <div className="reveal max-w-2xl">
            <SectionLabel>Space Beyond Stay</SectionLabel>
            <h2 className="mt-6 font-serif text-[48px] font-light leading-[0.95] md:text-[96px]">
              Work.
              <br />
              Stay.
              <br />
              Connect.
            </h2>
          </div>
          <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
            {identity.map((it, i) => (
              <article
                key={it.key}
                className={`reveal ${i === 1 ? "md:mt-24" : ""} ${i === 2 ? "md:mt-12" : ""}`}
                style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}
              >
                <div className="reveal-img relative aspect-[4/5] overflow-hidden bg-beige">
                  <Image src={it.image} alt={it.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="mt-6 flex items-baseline gap-4 border-t border-charcoal/20 pt-5">
                  <span className="font-serif text-[13px] text-warm-gray">0{i + 1}</span>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-[0.24em]">{it.key}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-charcoal/70">{it.line}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* GALLERY — reference "Project" slider */}
      <section className="overflow-hidden bg-warm-white py-28 md:py-40">
        <Container>
          <div className="reveal mb-14 text-center md:mb-20">
            <h2 className="font-serif text-[48px] font-light md:text-[72px]">Spaces</h2>
            <p className="mt-3 text-[15px] text-charcoal/70 md:text-[17px]">Every room, thoughtfully composed for work and rest.</p>
          </div>
          <SpacesGallery items={gallery} />
        </Container>
      </section>

      {/* AMENITIES — typography, no icon grid */}
      <section className="bg-beige/60 py-28 md:py-36">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <SectionLabel>Amenities</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-[0.98] md:text-[60px]">
              Everything
              <br />
              You Need.
            </h2>
          </div>
          <div className="reveal md:col-span-8" style={{ "--delay": "120ms" } as React.CSSProperties}>
            <p className="text-[11px] uppercase tracking-[0.28em] text-warm-gray">In both rooms</p>
            <ul className="mt-5 grid grid-cols-2 border-t border-charcoal/15 sm:grid-cols-3">
              {commonAmenities.map((a) => (
                <li key={a} className="border-b border-charcoal/15 py-4 text-[15px]">
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {rooms.map((r) => (
                <div key={r.slug}>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-warm-gray">
                    {r.number} {r.name} only
                  </p>
                  <p className="mt-4 font-serif text-[26px] leading-snug">
                    {r.amenities.filter((a) => !commonAmenities.includes(a)).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* VISITOR GUIDE */}
      <section className="bg-warm-white py-28 md:py-40">
        <Container>
          <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel>Visitor Guide</SectionLabel>
              <h2 className="mt-6 font-serif text-[44px] font-light leading-[0.98] md:text-[64px]">
                Your Stay,
                <br />
                Made Simple.
              </h2>
            </div>
            <ArrowLink href="/guide">Full Guide</ArrowLink>
          </div>

          <ol className="mt-16 grid border-l border-line md:mt-20 md:grid-cols-5 md:border-l-0 md:border-t">
            {stayFlow.map((s, i) => (
              <li
                key={s.no}
                className="reveal relative pb-10 pl-8 md:pb-0 md:pl-0 md:pr-8 md:pt-10"
                style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="absolute -left-[4.5px] top-1 size-2 rounded-full bg-charcoal md:-top-[4.5px] md:left-0" />
                <p className="font-serif text-[15px] text-warm-gray">{s.no}</p>
                <h3 className="mt-2 text-[15px] font-semibold uppercase tracking-[0.2em]">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-charcoal/70">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-24 border-t border-line pt-14">
            <div className="reveal flex items-baseline justify-between">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.24em]">Guest Guidelines</h3>
              <Link href="/guide#guidelines" className="text-[13px] text-warm-gray underline-offset-4 hover:underline">
                Read all
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-6">
              {guidelines.map((g, i) => (
                <li key={g.title} className="reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}>
                  <GuidelineIcon name={g.icon} className="size-8 text-charcoal/80" />
                  <p className="mt-4 text-[14px] font-medium">{g.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* LOCATION */}
      <section className="bg-ivory py-28 md:py-40">
        <Container className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="reveal md:col-span-5">
            <SectionLabel>Location</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-[0.98] md:text-[64px]">
              Pangyo
              <br />
              Global Campus
            </h2>
            <address className="mt-10 space-y-1 text-[15px] not-italic leading-relaxed">
              <p className="font-medium">{site.address.rooms}</p>
              <p className="text-charcoal/70">
                {site.address.street}
                <br />({site.address.lot}), {site.address.country}
              </p>
            </address>
            <dl className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
              {directions.map((d) => (
                <div key={d.from} className="flex items-baseline justify-between gap-4 py-4 text-[14px]">
                  <dt className="text-charcoal/80">{d.from}</dt>
                  <dd className="shrink-0 text-right text-warm-gray">
                    {d.distance} · {d.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[13px] leading-relaxed text-charcoal/65">
              Parking requires pre-registration. Please use the Building 204 side entrance.
            </p>
            <div className="mt-10">
              <ArrowLink href="/location">Directions & Parking</ArrowLink>
            </div>
          </div>
          <div className="reveal-img relative aspect-[4/3] self-start overflow-hidden md:col-span-7 md:aspect-auto md:h-full md:min-h-[560px]">
            <Image
              src="/images/campus-aerial.jpg"
              alt="Aerial view of the TH212 Pangyo campus and surrounding forest"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
