"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLink, SectionLabel } from "./ui";

export type SpacePanel = {
  label: string;
  title: string;
  lead: string;
  body: string;
  meta?: string;
  href: string;
  image: string;
  alt: string;
  position?: string;
};

// Desktop: sticky split (image left, blurred panel right) that steps through panels on scroll,
// with dot navigation on the right edge. Mobile: panels stack as full-width blocks.
export default function SpaceScroller({ panels }: { panels: SpacePanel[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = panels.length;

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / range, 0), 0.9999);
      setActive(Math.floor(p * n));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (range / n) * i + 2, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${n * 100}vh` }}>
        <div className="sticky top-0 grid h-screen grid-cols-2 overflow-hidden bg-charcoal">
          <div className="relative">
            {panels.map((p, i) => (
              <Image
                key={p.image}
                src={p.image}
                alt={p.alt}
                fill
                sizes="50vw"
                className={`object-cover transition-all duration-[1200ms] ease-out ${
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
                style={{ objectPosition: p.position ?? "50% 50%" }}
              />
            ))}
          </div>

          <div className="relative overflow-hidden text-white">
            {panels.map((p, i) => (
              <Image
                key={p.image}
                src={p.image}
                alt=""
                fill
                sizes="50vw"
                aria-hidden
                className={`scale-125 object-cover blur-2xl transition-opacity duration-[1200ms] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-charcoal/55" />

            {panels.map((p, i) => (
              <div
                key={p.title}
                className={`absolute inset-0 flex flex-col justify-center px-[12%] transition-all duration-700 ${
                  i === active ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"
                }`}
                aria-hidden={i !== active}
              >
                <SectionLabel light>{p.label}</SectionLabel>
                <h3 className="mt-6 font-serif text-[76px] font-light leading-[0.95]">{p.title}</h3>
                <p className="mt-8 text-[20px] font-medium">{p.lead}</p>
                <p className="mt-4 max-w-md text-[15px] leading-[1.8] text-white/75">{p.body}</p>
                {p.meta && (
                  <p className="mt-6 text-[12px] uppercase tracking-[0.24em] text-white/60">{p.meta}</p>
                )}
                <div className="mt-12">
                  <ArrowLink href={p.href} light>
                    View More
                  </ArrowLink>
                </div>
              </div>
            ))}

            <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-4">
              {panels.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${p.title}`}
                  className="grid size-4 place-items-center"
                >
                  <span
                    className={`block rounded-full bg-white transition-all duration-500 ${
                      i === active ? "size-2 opacity-100" : "size-1.5 opacity-40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="lg:hidden">
        {panels.map((p) => (
          <article key={p.title} className="relative bg-charcoal text-white">
            <div className="reveal-img relative aspect-[4/5] sm:aspect-[16/10]">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: p.position ?? "50% 50%" }}
              />
            </div>
            <div className="px-6 pb-16 pt-10 sm:px-10">
              <SectionLabel light>{p.label}</SectionLabel>
              <h3 className="mt-4 font-serif text-[48px] font-light leading-none">{p.title}</h3>
              <p className="mt-5 text-[17px] font-medium">{p.lead}</p>
              <p className="mt-3 text-[14px] leading-[1.8] text-white/75">{p.body}</p>
              {p.meta && <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-white/60">{p.meta}</p>}
              <div className="mt-8">
                <ArrowLink href={p.href} light>
                  View More
                </ArrowLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
