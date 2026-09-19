export const channels = [
  { id: "home", label: "01 HOME", href: "/" },
  { id: "who", label: "02 WHO", href: "/who" },
  { id: "projects", label: "03 PROJECTS", href: "/projects" },
  { id: "work", label: "04 WORK", href: "/work" },
] as const;

export type Channel = (typeof channels)[number];
