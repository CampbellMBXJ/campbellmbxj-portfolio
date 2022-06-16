import { ReactElement, useState } from "react";
import ProjectTile from "../components/project-tile/project-tile";
import VhsModal from "../components/vhs-modal/vhs-modal";
import { ChannelName } from "../types";
import { Page } from "./_app";
import cn from "classnames";
import styles from "./projects.module.scss";

interface Project {
  linkLocation?: string;
  linkText?: string;
  title: string;
  tagline?: string;
  technologies?: string[];
  description: ReactElement | string;
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
  },
  {
    title: "LogiCraft",
    tagline: "Logic gate schematic web app - UC Hackathon winner",
    technologies: ["Python", "Javascript", "Flask", "Vue.js"],
    description:
      "LogiCraft is a logic gate schematic design web application that converts the schema into a Minecraft (world-building game) world file. The goal is to help a younger audience learn about computer science in a more familiar context. Built in under 24 hours as a team of four.",
    linkLocation: "https://github.com/logic-craft/LogiCraft",
    linkText: "View on GitHub",
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
  const [modalBody, setModalBody] = useState<ReactElement | string>();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const tileHandler = (project: Project) => {
    const body = (
      <>
        {project.description}
        {!!project.linkLocation && !!project.linkText && (
          <a href={project.linkLocation} target={"_blank"} rel="noreferrer">
            <span
              className={cn(styles["projects__link"], "link", "link--dark", "not-selectable")}
            >
              {project.linkText}
            </span>
          </a>
        )}
      </>
    );
    setModalBody(body);
    openModal();
  };

  const projectTiles = () => {
    return projects.map((project, i) => {
      return (
        <ProjectTile
          key={i}
          {...project}
          handler={() => tileHandler(project)}
        />
      );
    });
  };

  return (
    <>
      <div className={styles.projects}>{projectTiles()}</div>

      {!!isModalOpen && (
        <VhsModal closeModal={closeModal}>{modalBody}</VhsModal>
      )}
    </>
  );
};

Projects.getChannel = () => ChannelName["03 PROJECTS"];

export default Projects;
