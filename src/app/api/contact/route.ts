// Contact form endpoint. Sends the inquiry by email through Resend (https://resend.com).
// Required env vars: RESEND_API_KEY, CONTACT_TO_EMAIL. Optional: CONTACT_FROM_EMAIL.
// Until they are set the endpoint answers 503 so the form never pretends to have sent anything.

type Payload = Record<string, unknown>;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const data = {
    name: str(body.name, 80),
    company: str(body.company, 120),
    email: str(body.email, 120),
    phone: str(body.phone, 40),
    type: str(body.type, 60),
    dates: str(body.dates, 80),
    guests: str(body.guests, 10),
    message: str(body.message, 3000),
  };

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ message: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }
  if (body.consent !== "yes") {
    return Response.json({ message: "Please agree to the collection of personal information." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json(
      { message: "Online inquiries are not available yet. Please try again later." },
      { status: 503 },
    );
  }

  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#8a8378">${k}</td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "PGC Website <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: `[PGC Inquiry] ${data.type || "General"} — ${data.name}`,
      html: `<table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    return Response.json({ message: "We could not send your inquiry. Please try again later." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
