"use client";

import Link from "next/link";
import { useState } from "react";
import { inquiryTypes, privacyConsent } from "@/content/contact";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-3 text-[16px] outline-none transition-colors placeholder:text-charcoal/35 focus:border-charcoal";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
      setStatus("error");
      setMessage("Online inquiries are not available yet. Please try again later.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-charcoal/20 pt-10" role="status">
        <p className="font-serif text-[36px] font-light">Thank you.</p>
        <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">
          Your inquiry has been received. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Name *</span>
          <input name="name" required maxLength={80} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Company</span>
          <input name="company" maxLength={120} autoComplete="organization" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Email *</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Phone</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
        </label>
      </div>

      <fieldset>
        <legend className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Inquiry type *</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {inquiryTypes.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="type" value={t} required defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-block rounded-full border border-charcoal/25 px-4 py-2.5 text-[13px] transition-colors peer-checked:border-charcoal peer-checked:bg-charcoal peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Preferred dates</span>
          <input name="dates" maxLength={80} placeholder="e.g. 12 – 15 Oct" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Number of guests</span>
          <input name="guests" inputMode="numeric" maxLength={10} className={field} />
        </label>
      </div>

      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Message *</span>
        <textarea name="message" required rows={5} maxLength={3000} className={`${field} resize-y`} />
      </label>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="border border-line bg-ivory p-5 text-[13px] leading-relaxed text-charcoal/75">
        <p className="font-medium text-charcoal">Consent to collection and use of personal information</p>
        <ul className="mt-2 space-y-1">
          <li>Items: {privacyConsent.items}</li>
          <li>Purpose: {privacyConsent.purpose}</li>
          <li>Retention: {privacyConsent.retention}</li>
        </ul>
        <p className="mt-2">
          You may decline, but we will be unable to respond to your inquiry.{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Notice
          </Link>
        </p>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-charcoal">
          <input type="checkbox" name="consent" value="yes" required className="size-4 accent-charcoal" />I agree
        </label>
      </div>

      {status === "error" && (
        <p className="text-[14px] text-red-700" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-4 bg-charcoal px-8 py-4 text-[13px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-navy disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
