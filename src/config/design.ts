/** Shared navigation link type. */
export interface NavLink {
  label: string;
  href: string;
}

/** Trust bar metadata item. */
export interface TrustItem {
  label: string;
  value: string;
}

/** Site-wide navigation links. */
export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Thinking", href: "/thinking" },
  { label: "Story", href: "/story" },
  { label: "Connect", href: "/connect" },
];

/** Trust bar metadata items. */
export const TRUST_ITEMS: TrustItem[] = [
  { label: "Location", value: "Chiang Mai, Thailand" },
  { label: "Role", value: "Computer Science Student" },
  { label: "Stack", value: "Laravel · Next.js · TypeScript · PostgreSQL" },
  { label: "Status", value: "Available for Internship & Freelance" },
];