"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./ui";

export type GalleryItem = {
  category: string;
  name: string;
  src: string;
  alt: string;
  href: string;
  position?: string;
};

// Horizontal image gallery (reference "Project" slider). Scroll-snap track + arrows + page dots.
export default function SpacesGallery({ items }: { items: GalleryItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = () => {
    const el = track.current;
    if (!el) return;
    const total = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
    setPages(total);
    const max = el.scrollWidth - el.clientWidth;
    setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (total - 1)));
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const move = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={measure}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 md:-mx-10 md:scroll-px-10 md:gap-6 md:px-10"
      >
        {items.map((it, i) => (
          <Link
            key={`${it.src}-${i}`}
            href={it.href}
            className="group w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-48px)/3)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-beige">
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 78vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                style={{ objectPosition: it.position ?? "50% 50%" }}
              />
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-warm-gray">{it.category}</p>
            <p className="mt-2 text-[18px] font-medium">{it.name}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-2" aria-hidden>
          {Array.from({ length: pages }).map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-500 ${i === page ? "w-10 bg-charcoal" : "w-5 bg-line"}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous"
            className="grid size-11 place-items-center rounded-full border border-charcoal/30 transition-colors hover:bg-charcoal hover:text-white"
          >
            <ArrowIcon className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next"
            className="grid size-11 place-items-center rounded-full border border-charcoal/30 transition-colors hover:bg-charcoal hover:text-white"
          >
            <ArrowIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
