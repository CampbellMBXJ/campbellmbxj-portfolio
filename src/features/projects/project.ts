import type { ReactNode } from "react";

export interface Project {
  slug: string;
  linkLocation?: string;
  linkText?: string;
  title: string;
  tagline?: string;
  technologies?: string[];
  description: ReactNode;
  images?: string[];
}
