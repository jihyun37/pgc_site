"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

// Pages without a dark full-bleed hero keep the header solid from the top.
const LIGHT_PAGES = ["/contact", "/privacy"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu is open only for the path it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = (scrolled || LIGHT_PAGES.includes(pathname)) && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-line/70 bg-warm-white/85 text-charcoal backdrop-blur-md" : "text-white"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[84px] md:px-10">
        <Link href="/" className={`relative z-10 flex items-center gap-3 ${open ? "text-charcoal" : ""}`} aria-label="Pangyo Global Campus home">
          <span
            className={`grid size-9 place-items-center border font-serif text-[11px] leading-[1.05] ${
              solid || open ? "border-charcoal/60" : "border-white/70"
            }`}
          >
            <span className="text-center">
              PG
              <br />C
            </span>
          </span>
          <span className="text-[13px] font-semibold tracking-[0.22em]">
            PANGYO GLOBAL CAMPUS
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-9">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={`block py-8 text-[12.5px] font-medium uppercase tracking-[0.16em] transition-opacity hover:opacity-60 ${
                      active ? "underline decoration-1 underline-offset-8" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="min-w-[220px] bg-warm-white py-4 text-charcoal shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="block px-6 py-2.5 text-[13px] text-charcoal/75 transition-colors hover:bg-ivory hover:text-charcoal"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuPath(open ? null : pathname)}
          className={`relative z-10 -mr-2 flex size-11 flex-col items-center justify-center gap-[6px] lg:hidden ${
            open ? "text-charcoal" : ""
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-ivory text-charcoal transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-between px-6 pb-10 pt-28" aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.label} className={open ? "fade-up" : ""} style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
                <Link href={item.href} className="block py-2 font-serif text-[40px] leading-tight">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-1 text-[13px] text-warm-gray">
            <p>Building 205, Units 403 & 404</p>
            <p>Pangyo Global Campus (TH212)</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
