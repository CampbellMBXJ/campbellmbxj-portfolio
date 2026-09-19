import type { ReactNode } from "react";

export enum WorkTypes {
  FULL_TIME = "Full-time",
  INTERN = "Internship",
  INDEPENDENT = "Independent",
  PART_TIME = "Part-time",
}

export interface WorkExperience {
  slug: string;
  company: string;
  title: string;
  date: string;
  position: WorkTypes;
  technologies?: string[];
  description: ReactNode;
}
