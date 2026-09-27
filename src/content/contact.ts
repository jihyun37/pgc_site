// Contact form content. The form sends through /api/contact; see README for the required env vars.
// TODO(operator): confirm the retention period before launch.

export const inquiryTypes = [
  "Business Stay",
  "Business Room (403)",
  "Guest Room (404)",
  "Parking Registration",
  "Other",
];

export const privacyConsent = {
  items: "Name, company, email, phone number, inquiry details",
  purpose: "To respond to your inquiry and arrange your visit",
  retention: "Deleted once the inquiry has been handled",
};
