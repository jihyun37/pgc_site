import Link from "next/link";
import { nav, site } from "@/content/site";

export default function Footer() {
  const words = Array.from({ length: 4 });
  return (
    <footer className="bg-warm-white text-charcoal">
      {/* Oversized marquee — the footer as the last visual section */}
      <div className="overflow-hidden border-t border-line py-10 md:py-16" aria-hidden>
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {words.map((_, i) => (
                <span key={i} className="px-8 font-serif text-[64px] leading-none tracking-tight md:px-14 md:text-[150px]">
                  PANGYO GLOBAL CAMPUS <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-10 md:px-10">
        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-[1.2fr_1fr_1.4fr] md:gap-16">
          <div>
            <p className="font-serif text-[28px] leading-[1.05]">
              Pangyo
              <br />
              Global Campus
            </p>
            <p className="mt-4 text-[13px] text-warm-gray">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[12px] uppercase tracking-[0.16em]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-warm-gray">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="space-y-1 text-[13px] not-italic leading-relaxed text-charcoal/75">
            <p className="font-medium text-charcoal">Pangyo Global Campus (TH212)</p>
            <p>{site.address.rooms}</p>
            <p>
              {site.address.street} ({site.address.lot})
            </p>
            <p className="pt-2">Operated by {site.operator}</p>
          </address>
        </div>

        <div className="mt-12 flex flex-col gap-3 text-[11px] uppercase tracking-[0.18em] text-warm-gray md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Pangyo Global Campus. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-charcoal">
            Privacy Notice
          </Link>
        </div>
      </div>
    </footer>
  );
}
