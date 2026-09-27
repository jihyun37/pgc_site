import Image from "next/image";
import Link from "next/link";
import ContactCta from "./ContactCta";
import PageHero from "./PageHero";
import { ArrowIcon, ArrowLink, Container, SectionLabel } from "./ui";
import type { Room } from "@/content/rooms";

export default function RoomPage({ room, other }: { room: Room; other: Room }) {
  const warm = room.slug === "guest-room";
  const [first, second, ...rest] = room.spaces;

  return (
    <>
      <PageHero
        tall
        label={`Room ${room.number}`}
        title={room.name}
        subtitle={room.tagline}
        image={room.hero.src}
        alt={room.hero.alt}
        position={room.hero.position}
      />

      {/* Intro + key facts */}
      <section className={`${warm ? "bg-ivory" : "bg-warm-white"} py-24 md:py-36`}>
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <SectionLabel>PGC {room.number}</SectionLabel>
            <ul className="mt-8 space-y-1">
              {room.purpose.map((p) => (
                <li key={p} className="font-serif text-[30px] font-light leading-tight md:text-[40px]">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal md:col-span-6 md:col-start-7" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {room.description.map((d) => (
              <p key={d} className="mb-5 text-[16px] leading-[1.9] text-charcoal/75">
                {d}
              </p>
            ))}
            <dl className="mt-10 grid grid-cols-3 border-y border-charcoal/15">
              {room.facts.map((f) => (
                <div key={f.label} className="py-6 text-center">
                  <dd className="font-serif text-[44px] font-light leading-none md:text-[56px]">{f.value}</dd>
                  <dt className="mt-2 text-[11px] uppercase tracking-[0.24em] text-warm-gray">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Large image + experience text */}
      <section className={warm ? "bg-ivory" : "bg-warm-white"}>
        <div className="reveal-img relative aspect-[4/3] w-full md:aspect-[21/9]">
          <Image src={room.living.src} alt={room.living.alt} fill sizes="100vw" className="object-cover" />
        </div>
        <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="reveal md:col-span-4">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">
              {room.name}
            </h2>
          </div>
          <p className="reveal text-[16px] leading-[1.9] text-charcoal/75 md:col-span-6 md:col-start-7 md:pt-4">
            {room.experience}
          </p>
        </Container>
      </section>

      {/* Keywords */}
      <section className="bg-charcoal py-20 text-white md:py-28">
        <Container className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/15">
          {room.keywords.map((k, i) => (
            <div
              key={k.title}
              className="reveal md:px-10 md:first:pl-0"
              style={{ "--delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <p className="font-serif text-[13px] text-white/50">0{i + 1}</p>
              <h3 className="mt-3 text-[15px] font-semibold uppercase tracking-[0.26em]">{k.title}</h3>
              <p className="mt-3 text-[15px] text-white/70">{k.body}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Editorial gallery: asymmetric pair, then remaining spaces */}
      <section className={`${warm ? "bg-ivory" : "bg-warm-white"} py-24 md:py-36`}>
        <Container>
          <div className="reveal mb-14 md:mb-20">
            <SectionLabel>Spaces</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">Inside {room.number}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            {first && (
              <figure className="md:col-span-7">
                <div className="reveal-img relative aspect-[4/3] overflow-hidden bg-beige">
                  <Image src={first.src} alt={first.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" style={{ objectPosition: first.position }} />
                </div>
                <figcaption className="mt-4 text-[13px] uppercase tracking-[0.2em] text-warm-gray">{first.name}</figcaption>
              </figure>
            )}
            {second && (
              <figure className="md:col-span-4 md:col-start-9 md:mt-40">
                <div className="reveal-img relative aspect-[4/5] overflow-hidden bg-beige">
                  <Image src={second.src} alt={second.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" style={{ objectPosition: second.position }} />
                </div>
                <figcaption className="mt-4 text-[13px] uppercase tracking-[0.2em] text-warm-gray">{second.name}</figcaption>
              </figure>
            )}
          </div>

          {rest.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:mt-16 md:gap-8">
              {rest.map((s, i) => (
                <figure key={`${s.src}-${i}`} className={i % 2 === 1 ? "sm:mt-24" : ""}>
                  <div className="reveal-img relative aspect-[3/2] overflow-hidden bg-beige">
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: s.position }} />
                  </div>
                  <figcaption className="mt-4 text-[13px] uppercase tracking-[0.2em] text-warm-gray">{s.name}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Amenities */}
      <section className="bg-beige/60 py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <SectionLabel>In-Room Amenities</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[52px]">
              Everything
              <br />
              You Need.
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-charcoal/70">
              Wi-Fi is available. Connection details are shared privately with confirmed guests.
            </p>
          </div>
          <ul className="reveal grid grid-cols-2 self-start border-t border-charcoal/15 md:col-span-8 md:grid-cols-3">
            {room.amenities.map((a) => {
              const signature = room.signature.includes(a);
              return (
                <li key={a} className="flex items-center gap-2 border-b border-charcoal/15 py-4 text-[15px]">
                  {a}
                  {signature && <span className="size-1.5 rounded-full bg-accent" aria-label="signature amenity" />}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Guide link */}
      <section className="bg-warm-white py-20">
        <Container className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <p className="max-w-xl text-[16px] leading-relaxed text-charcoal/75">
            Parking pre-registration, check-in and guest guidelines for your stay at Room {room.number}.
          </p>
          <ArrowLink href="/guide">Visitor Guide</ArrowLink>
        </Container>
      </section>

      {/* Other room */}
      <Link href={`/${other.slug}`} className="group relative block h-[56svh] min-h-[380px] overflow-hidden bg-charcoal text-white">
        <Image
          src={other.hero.src}
          alt={other.hero.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-70 transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          style={{ objectPosition: other.hero.position }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
          <p className="text-[11px] uppercase tracking-[0.34em] text-white/75">Next Space · Room {other.number}</p>
          <p className="mt-4 flex items-center gap-6 font-serif text-[48px] font-light leading-none md:text-[88px]">
            {other.name}
            <ArrowIcon className="size-8 transition-transform duration-500 group-hover:translate-x-2 md:size-12" />
          </p>
        </div>
      </Link>

      <ContactCta />
    </>
  );
}
