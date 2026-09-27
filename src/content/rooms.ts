// Room facts: guests / beds / bathrooms / amenities come from the Notion room sheets (403_.jpg, 404_.jpg).
// Room copy, keywords and space names come from "PGC Overview_EN.pdf".

export type Room = {
  slug: "business-room" | "guest-room";
  number: "403" | "404";
  name: string;
  tagline: string;
  purpose: string[];
  description: string[];
  experience: string;
  keywords: { title: string; body: string }[];
  facts: { label: string; value: string }[];
  amenities: string[];
  signature: string[];
  hero: { src: string; alt: string; position?: string };
  living: { src: string; alt: string };
  spaces: { name: string; src: string; alt: string; position?: string }[];
};

export const businessRoom: Room = {
  slug: "business-room",
  number: "403",
  name: "Business Room",
  tagline: "A space designed for productive conversations.",
  purpose: ["Business Meetings", "Private Gatherings", "Networking", "Work"],
  description: [
    "Designed as a premium space for business meetings, private gatherings, and meaningful connections, it seamlessly brings together work, relaxation, and communication.",
    "With a calm and refined atmosphere, it creates meaningful experiences and memorable moments. Every stay becomes a valuable experience.",
  ],
  experience:
    "Thoughtfully designed to accommodate a variety of purposes and experiences, the space creates an environment where work, connection, relaxation, and focus come together naturally.",
  keywords: [
    { title: "Connect", body: "A space for connection and new experiences" },
    { title: "Privacy", body: "A balanced space for comfort and privacy" },
    { title: "Experience", body: "A distinctive space where work and life connect" },
  ],
  facts: [
    { label: "Guests", value: "5" },
    { label: "Beds", value: "5" },
    { label: "Bathroom", value: "1" },
  ],
  amenities: [
    "TV",
    "Projector",
    "Audio Equipment",
    "Wine Cooler",
    "Clothing Care System",
    "Washing Machine",
    "Climate Control",
    "Robot Vacuum Cleaner",
    "Dishwasher",
    "Induction Cooktop",
    "Multi Cooker",
    "Air Purifier",
    "Hair Dryer",
  ],
  signature: ["Projector", "Audio Equipment", "Wine Cooler"],
  hero: { src: "/images/403-hero.jpg", alt: "Room 403 living lounge with chandelier and open kitchen", position: "50% 55%" },
  living: { src: "/images/403-living.jpg", alt: "Room 403 lounge sofa facing the terrace windows" },
  spaces: [
    { name: "Dining Lounge", src: "/images/403-dining-lounge.jpg", alt: "Room 403 kitchen island dining lounge" },
    { name: "Pamplona", src: "/images/403-pamplona.jpg", alt: "Pamplona bedroom in Room 403" },
    { name: "Attic", src: "/images/403-attic-study.jpg", alt: "Room 403 attic with low desks" },
    { name: "Attic", src: "/images/403-attic-rest.jpg", alt: "Room 403 attic rest area with two beds" },
  ],
};

export const guestRoom: Room = {
  slug: "guest-room",
  number: "404",
  name: "Guest Room",
  tagline: "Comfort for your stay. Privacy for your rest.",
  purpose: ["Comfort", "Privacy", "Rest", "Business Stay"],
  description: [
    "Designed as a guest space where work and relaxation blend seamlessly, it offers a comfortable and practical environment for every stay.",
    "Created for both short- and long-term visits, the space provides quiet moments of rest and time to recharge before the next schedule. Enjoy a balanced stay experience designed for both comfort and ease.",
  ],
  experience:
    "Each space is thoughtfully designed for diverse purposes and experiences. Discover the distinctive value and refined atmosphere of the Guest Room, where work, relaxation, and focus come together naturally.",
  keywords: [
    { title: "Welcome", body: "A space designed with thoughtful care" },
    { title: "Living", body: "A space for diverse stays and purposes" },
    { title: "Signature", body: "A space for diverse stays and purposes" },
  ],
  facts: [
    { label: "Guests (Max)", value: "10" },
    { label: "Beds", value: "9" },
    { label: "Bathrooms", value: "2" },
  ],
  amenities: [
    "TV",
    "Massage Chair",
    "Clothing Care System",
    "Washing Machine",
    "Dryer",
    "Climate Control",
    "Robot Vacuum Cleaner",
    "Dishwasher",
    "Induction Cooktop",
    "Microwave",
    "Multi Cooker",
    "Air Purifier",
    "Hair Dryer",
  ],
  signature: ["Massage Chair", "Dryer", "Microwave"],
  hero: { src: "/images/404-hero.jpg", alt: "Room 404 living room with leather sofas and wood slat wall", position: "50% 60%" },
  living: { src: "/images/404-living.jpg", alt: "Room 404 living room with two sofa sets" },
  spaces: [
    { name: "Dining Lounge", src: "/images/404-dining-lounge.jpg", alt: "Room 404 dining table and kitchen island" },
    { name: "Santiago", src: "/images/404-santiago.jpg", alt: "Santiago bedroom in Room 404", position: "50% 60%" },
    { name: "Burgos / León", src: "/images/404-burgos-leon.jpg", alt: "Burgos / León bedroom in Room 404" },
    { name: "Attic", src: "/images/404-attic.jpg", alt: "Room 404 attic with desks and beds" },
  ],
};

export const rooms = [businessRoom, guestRoom];
