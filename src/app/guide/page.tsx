import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import GuidelineIcon from "@/components/GuidelineIcon";
import PageHero from "@/components/PageHero";
import { ArrowLink, Container, SectionLabel } from "@/components/ui";
import { checkout, faq, guidelines, reservation, stayFlow } from "@/content/guide";
import { parking } from "@/content/site";

export const metadata: Metadata = {
  title: "Visitor Guide",
  description: "Reservation information, parking registration, check-in, guest guidelines and FAQ for Pangyo Global Campus.",
};

export default function GuidePage() {
  return (
    <>
      <PageHero
        label="Visitor Guide"
        title={
          <>
            Your Stay,
            <br />
            Made Simple.
          </>
        }
        subtitle="Please check before your stay."
        image="/images/building-205-entrance.jpg"
        alt="Entrance of Building 205"
        position="50% 40%"
      />

      {/* Reservation information */}
      <section id="reservation" className="scroll-mt-20 bg-warm-white py-24 md:py-32">
        <Container>
          <div className="reveal">
            <SectionLabel>PGC Reservation</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">Information</h2>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {reservation.map((r, i) => (
              <div key={r.title} className="reveal md:px-10 md:first:pl-0" style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}>
                <p className="font-serif text-[14px] text-warm-gray">0{i + 1}</p>
                <h3 className="mt-2 text-[15px] font-semibold uppercase tracking-[0.22em]">{r.title}</h3>
                <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-charcoal/75">
                  {r.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stay flow */}
      <section id="stay" className="scroll-mt-20 bg-ivory py-24 md:py-32">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <SectionLabel>Your Stay</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">
              From Arrival
              <br />
              to Check-out
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-charcoal/70">
              Building access details and Wi-Fi information are shared privately with confirmed guests before arrival.
            </p>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {stayFlow.map((s, i) => (
              <li
                key={s.no}
                className="reveal grid grid-cols-[56px_1fr] gap-4 border-t border-charcoal/15 py-8 md:grid-cols-[96px_1fr]"
                style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <span className="font-serif text-[32px] font-light leading-none text-warm-gray md:text-[44px]">{s.no}</span>
                <div>
                  <h3 className="text-[15px] font-semibold uppercase tracking-[0.22em]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.85] text-charcoal/75">{s.body}</p>
                  {s.title === "Parking" && (
                    <ul className="mt-4 space-y-1.5 text-[14px] text-charcoal/70">
                      {parking.required.map((p) => (
                        <li key={p}>— {p}</li>
                      ))}
                    </ul>
                  )}
                  {s.title === "Check-out" && (
                    <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-charcoal/70">
                      {checkout.map((c) => (
                        <li key={c}>— {c}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Guidelines */}
      <section id="guidelines" className="scroll-mt-20 bg-charcoal py-24 text-white md:py-32">
        <Container>
          <div className="reveal">
            <SectionLabel light>Guest Guidelines</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">
              For a Premium Stay,
              <br />
              Together.
            </h2>
          </div>
          <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {guidelines.map((g, i) => (
              <li key={g.title} className="reveal" style={{ "--delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
                <GuidelineIcon name={g.icon} className="size-9 text-white/85" />
                <h3 className="mt-5 text-[17px] font-medium">{g.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-white/65">{g.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-warm-white py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">
              Frequently
              <br />
              Asked
            </h2>
          </div>
          <div className="reveal md:col-span-8">
            {faq.map((f) => (
              <details key={f.q} className="group border-t border-charcoal/15 last:border-b">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-medium md:text-[18px]">
                  {f.q}
                  <span className="faq-icon relative size-4 shrink-0 transition-transform duration-300" aria-hidden>
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-charcoal" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-charcoal" />
                  </span>
                </summary>
                <div className="pb-8 pr-10 text-[15px] leading-[1.85] text-charcoal/75">
                  {f.a.map((a) => (
                    <p key={a}>{a}</p>
                  ))}
                  {f.list && (
                    <ul className="mt-4 space-y-1.5">
                      {f.list.map((l) => (
                        <li key={l}>— {l}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            ))}
            <div className="mt-12">
              <ArrowLink href="/contact">Ask a Question</ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
