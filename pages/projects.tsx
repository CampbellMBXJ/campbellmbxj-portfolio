import { ReactElement, useCallback, useEffect, useState } from "react";
import ProjectTile from "../components/project-tile/project-tile";
import VhsModal from "../components/vhs-modal/vhs-modal";
import { ChannelName } from "../types";
import { Page } from "./_app";
import cn from "classnames";
import styles from "./projects.module.scss";
import CrtCarousel from "../components/crt-carousel/crt-carousel";
import { useRouter } from "next/router";
import ProjectModal from '../components/project-modal/project-modal';

export interface Project {
  linkLocation?: string;
  linkText?: string;
  title: string;
  tagline?: string;
  technologies?: string[];
  description: ReactElement | string;
  images?: string[];
}

const projects: Project[] = [
  {
    title: "My Moola",
    tagline: "Australias first third-party banking application",
    technologies: [
      "Typescript",
      "React native",
      "Nest",
      "Next",
      "Socket io",
      "Prisma",
      "Firebase",
      "AWS",
      "Terraform",
    ],
    description:
      "My Moola is Australia’s first third-party banking application. Unifying the crowded financial landscape. My Moola required the creation of a banking API to read and write transactions on behalf of its users, a React native mobile application, and a React web app.",
    images: [
      "/images/projects/my-moola/accounts.png",
      "/images/projects/my-moola/account-transactions.png",
      "/images/projects/my-moola/insights.png",
      "/images/projects/my-moola/select-a-bank.png",
      "/images/projects/my-moola/new-bank-login.png",
      "/images/projects/my-moola/transaction-confirmation.png",
    ],
  },
  {
    title: "LogiCraft",
    tagline: "Logic gate schematic web app - UC Hackathon winner",
    technologies: ["Python", "Javascript", "Flask", "Vue.js"],
    description:
      "LogiCraft is a logic gate schematic design web application that converts the schema into a Minecraft (world-building game) world file. The goal is to help a younger audience learn about computer science in a more familiar context. Built in under 24 hours as a team of four.",
    linkLocation: "https://github.com/logic-craft/LogiCraft",
    linkText: "View on GitHub",
    images: [
      "/images/projects/logicraft/uc_hackathon.jpg",
      "/images/projects/logicraft/schematicraft.png",
      "/images/projects/logicraft/schematicraft_2.png",
    ],
  },
  {
    title: "TravelEA",
    tagline: "A travel based social media web application",
    technologies: ["Java", "Scala", "JavaScript", "Play", "Twirl", "MySql"],
    description:
      "A travel based planning/social media web application built as part of a team of eight. We were tasked with emulating a scrum environment while completing this project.",
    images: [
      "/images/projects/travelea/landing.png",
      "/images/projects/travelea/home.png",
      "/images/projects/travelea/people.png",
      "/images/projects/travelea/trips.png",
      "/images/projects/travelea/trip.png",
    ],
  },
  {
    title: "Sm Compiler",
    tagline: "Basic compiler written in Python",
    technologies: ["Python", "JVM Bytecode"],
    description:
      "'Sm' is a language designed to be compact, all reserved words are two characters. I built a scanner, parser and code generator which together output Java Assembly code to be run on a JVM.",
    linkLocation: "https://github.com/CampbellMBXJ/Sm-Compiler",
    linkText: "View on GitHub",
  },
  {
    title: "Enriched Text Grafana Plugin",
    tagline: "Template query data in an enriched text panel",
    technologies: ["Javascript"],
    description:
      "A plugin for Grafana (open-source data visualisation tool) to template query data into an Html enriched text panel.",
    linkLocation:
      "https://github.com/CampbellMBXJ/grafana-enriched-text-plugin",
    linkText: "View on GitHub",
  },
];

const Projects: Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>();
  const router = useRouter();

  const openModal = (project: Project) => {
    // Push pound anchor to URL, so that modals can be opened on page load
    router.push(`#${project.title.replaceAll(" ", "-").toLowerCase()}`);
  };
  const closeModal = () => {
    // Remove pound anchor from URL;
    router.push("");
  };

  // Monitors anchors in path to open/close the modal
  useEffect(() => {
    const splitPath = router.asPath.split("#");
    if (splitPath.length <= 1) {
      setIsModalOpen(false);
    }

    const anchor = splitPath.pop();
    const project = projects.find(
      (project) => project.title.replaceAll(" ", "-").toLowerCase() == anchor
    );

    // If the project is found, open the modal
    if (project) {
      setCurrentProject(project);
      setIsModalOpen(true);
    }
  }, [router.asPath]);

  const projectTiles = () => {
    return projects.map((project, i) => {
      return (
        <ProjectTile key={i} {...project} handler={() => openModal(project)} />
      );
    });
  };

  return (
    <>
      <div className={styles.projects}>{projectTiles()}</div>

      {isModalOpen && <ProjectModal closeModal={closeModal} project={currentProject!} />}
    </>
  );
};

Projects.getChannel = () => ChannelName["03 PROJECTS"];

export default Projects;
