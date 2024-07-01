import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import WorkModal from "../components/wok-modal/work-modal";
import WorkTile from "../components/work-tile/work-tile";
import { ChannelName } from "../types";
import { Page } from "./_app";
import styles from "./work.module.scss";

export enum WorkTypes {
  FULL_TIME = "Full-time",
  INTERN = "Internship",
  INDEPENDENT = "Independent",
  PART_TIME = "Part-time",
}

export interface WorkExperience {
  company: string;
  title: string;
  date: string;
  position: WorkTypes;
  technologies?: string[];
  description: ReactElement | string;
}

const Work: Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWork, setCurrentWork] = useState<WorkExperience>();
  const router = useRouter();

  const openModal = (work: WorkExperience) => {
    // Push pound anchor to URL, so that modals can be opened on page load
    router.push(`#${work.title.replaceAll(" ", "-").toLowerCase()}`);
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
    const work = workExperience.find(
      (work) => work.title.replaceAll(" ", "-").toLowerCase() == anchor
    );

    // If the work is found, open the modal
    if (work) {
      setCurrentWork(work);
      setIsModalOpen(true);
    }
  }, [router.asPath]);

  const workTiles = () => {
    return workExperience.map((we, i) => {
      return <WorkTile key={i} {...we} handler={() => openModal(we)} />;
    });
  };

  return (
    <>
      <div className={styles.container}>{workTiles()}</div>

      {!!isModalOpen && (
        <WorkModal work={currentWork!} closeModal={closeModal} />
      )}
    </>
  );
};

Work.getChannel = () => ChannelName["04 WORK"];

const workExperience: WorkExperience[] = [
  {
    company: "Ailo",
    title: "Senior software engineer (Tech lead)",
    date: "08/22 – current",
    position: WorkTypes.FULL_TIME,
    technologies: ["Typescript", "React Native", "NestJS", "GraphQL", "AWS"],
    description: (
      <div>
        Tech lead of inspections and work flows at Ailo, a Scaling property
        management software platform.
        <ul>
          <li>
            Lead development of new products and features across web and mobile.
          </li>
          <li>
            Conduct architectural and technical discovery of new features.
          </li>
          <li>
            Guide engineers to support their career development and goal
            achievement.
          </li>
          <li>
            Optimise team software processes to maximize both quality and
            productivity outcomes.
          </li>
          <li>
            Engage with users and gather analytics to inform product
            improvements and feature enhancements.
          </li>
        </ul>
      </div>
    ),
  },
  {
    company: "Macquarie Group",
    title: "Senior Associate Software Engineer",
    date: "02/21 – 07/22",
    position: WorkTypes.FULL_TIME,
    technologies: ["Java", "Spring boot", "Typescript", "Angular", "AWS"],
    description: (
      <div>
        Delivered end-to-end features and solutions for Digital Portfolio
        Manager, a portal for financial advisers to generate trading advice
        documents.
        <ul>
          <li>
            Updated major versions of technology across Java microservices
            including reactive rewrite.
          </li>
          <li>
            Migrated angular component library and CSS framework, to align with
            the wider business.
          </li>
          <li>
            Partook in AWS cloud migration with CloudFormation IaC, increasing
            reliability.
          </li>
          <li>
            Met with clients, resolving issues and exploring new features.
          </li>
          <li>Performed releases and provided production support.</li>
          <li>Mentored and onboarded new team members.</li>
        </ul>
      </div>
    ),
  },
  {
    company: "Epex",
    title: "Development Team Lead and Director",
    date: "01/19 – 02/21",
    position: WorkTypes.INDEPENDENT,
    technologies: ["Typescript", "Express", "React", "PostgreSQL", "Redis"],
    description:
      "Led development of an online residential property exchange, overseeing architectural design, project delivery, and stakeholder communication. Demonstrated strong technical proficiency in resolving complex challenges, including robust task scheduling, secure credit card payments, and seamless integration of external APIs.",
  },
  {
    company: "Macquarie Group",
    title: "Associate Software Engineer",
    date: "11/19 – 02/20",
    position: WorkTypes.INTERN,
    technologies: ["Java", "Spring boot", "Solace", "ActiveMQ", "Openshift"],
    description:
      "Developed and deployed microservices and gateways crucial to a trading transformation initiative during my internship. Became the team's primary expert in key Spring technologies and message queue integration by the end of the program.",
  },
  {
    company: "MetaSwitch",
    title: "Software Engineer Intern",
    date: "11/18 – 02/19",
    position: WorkTypes.INTERN,
    technologies: ["Python", "Java", "Groovy", "InfluxDB", "Grafana", "Docker"],
    description:
      "At MetaSwitch, an international telecommunications software company, I developed software to ingest, manage, and visualize telecommunications statistics. Leveraging Grafana, I ensured that all data was accessible and presented clearly and reliably.",
  },
  {
    company: "University of Canterbury",
    title: "Scrum Master and Tutor",
    date: "01/20 – 11/20",
    position: WorkTypes.PART_TIME,
    technologies: ["Java", "Spring boot", "Solace", "ActiveMQ", "Openshift"],
    description:
      "Acted as a scrum master for development teams in a third-year project course. This required extensive software engineering process knowledge. I additionally tutored and graded the students.",
  },
];

export default Work;
