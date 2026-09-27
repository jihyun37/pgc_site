// Source of truth: "PGC Overview_EN.pdf" (RONDA KOREA) + Notion guest guides (403 / 404).
// PRIVATE — never add here: door/access codes, Wi-Fi credentials, personal phone/WeChat/email.

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Introduction", href: "/about" },
      { label: "Space Identity", href: "/about#identity" },
      { label: "Location Advantage", href: "/about#advantage" },
    ],
  },
  { label: "Business Room", href: "/business-room" },
  { label: "Guest Room", href: "/guest-room" },
  {
    label: "Guide",
    href: "/guide",
    children: [
      { label: "Reservation Information", href: "/guide#reservation" },
      { label: "Your Stay", href: "/guide#stay" },
      { label: "Guest Guidelines", href: "/guide#guidelines" },
      { label: "FAQ", href: "/guide#faq" },
    ],
  },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
];

export const site = {
  name: "Pangyo Global Campus",
  short: "PGC",
  tagline: "Premium Business Stay for Work & Rest",
  operator: "RONDA KOREA",
  complex: "TH212 Pangyo",
  address: {
    rooms: "Building 205, Units 403 & 404",
    street: "25, Pangyodaejang-ro 2-gil, Bundang-gu, Seongnam-si",
    lot: "Daejang-dong 596",
    country: "Republic of Korea",
  },
  // Business inquiry line printed in the official brochure (not a personal number).
  inquiryPhone: "031-613-2320",
  mapQuery: "판교TH212",
};

export const intro = {
  label: "About PGC",
  headline: ["A New Standard", "for Business Stay"],
  lead: "A place where business and comfort connect naturally.",
  body: [
    "Located in Daejang-dong, Pangyo, Pangyo Global Campus is a high-end terrace residence where nature and seasonal terrace living come together.",
    "Designed for employees, global partners, and visitors, it offers a premium business residence experience that seamlessly connects work, relaxation, and meaningful interactions in a refined and comfortable environment.",
  ],
};

export const identity = [
  {
    key: "WORK",
    line: "A productive environment for focus and efficiency.",
    detail: "A space that enables seamless work and enhances performance.",
    image: "/images/identity-work.jpg",
    alt: "Colleagues reviewing documents together",
  },
  {
    key: "STAY",
    line: "Premium living designed for comfort and privacy.",
    detail: "A space designed for comfortable rest and privacy.",
    image: "/images/identity-stay.jpg",
    alt: "A quiet table with a laptop and coffee",
  },
  {
    key: "CONNECT",
    line: "Seamless networking for meaningful connections.",
    detail: "A space that brings employees and global partners together.",
    image: "/images/identity-connect.jpg",
    alt: "Partners meeting in a bright lounge",
  },
];

export const directions = [
  { from: "Head Office", distance: "21 km", time: "30 min by car" },
  { from: "Gimpo International Airport", distance: "50 km", time: "90 min by car" },
  { from: "Incheon International Airport", distance: "75 km", time: "90 min by car" },
];

export const advantages = [
  {
    title: "Traffic",
    body: "Ultra-fast connectivity via Seopangyo Tunnel, GTX-A Seongnam Station, Seopangyo Station, Shinbundang Line, Bundang Line, and Seopangyo IC.",
  },
  {
    title: "Infra",
    body: "Hyundai Department Store in Pangyo New Town, Seoul National University Hospital, Homeplus, and commercial & neighborhood facilities within Pangyo Daejang District.",
  },
  {
    title: "Tourist Spot",
    body: "Lotte Premium Outlet Uiwang 20 km (20 min), Lotte World 22 km (35 min), Seoul Grand Park 17 km (25 min), Gangnam COEX 25 km (35 min), Myeongdong 27 km (50 min).",
  },
  {
    title: "Eco",
    body: "A nature-inspired setting with easy access to Gogiri Valley, Cheonggyesan, Gwanggyosan, and Barasan Recreational Forest. Enjoy everyday comfort surrounded by nature.",
  },
];

export const parking = {
  title: "Parking Registration",
  note: "Parking is available only after pre-registration is completed.",
  entrance: "For easier access, please use the Building 204 side entrance, then proceed to Building 205.",
  required: [
    "Number of visitors & duration of stay",
    "Vehicle license plate number & registration status",
    "Applicant's name & contact information",
  ],
};
