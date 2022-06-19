import { ChannelName } from "../types";
import { Page } from "./_app";
import styles from "./work.module.scss";
import WorkTile from "../components/work-tile/work-tile";
import VhsModal from "../components/vhs-modal/vhs-modal";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import WorkModal from "../components/wok-modal/work-modal";

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

const workExperience: WorkExperience[] = [
  {
    company: "Macquarie Group",
    title: "Senior Associate Software Engineer",
    date: "2/21 - Current",
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
            Migrated angular component library and css framework, to align with
            the wider business.
          </li>
          <li>Partook in AWS cloud migration with CloudFormation IaC.</li>
          <li> Met with clients, discussing issues and new features.</li>
          <li>Performed releases and provided production support.</li>
          <li>Mentored and onboarded new team members.</li>
        </ul>
      </div>
    ),
  },
  {
    company: "Epex Ltd",
    title: "Development Team Lead and Director",
    date: "01/19 – 02/21",
    position: WorkTypes.INDEPENDENT,
    technologies: ["Typescript", "Express", "React", "PostgreSQL", "Redis"],
    description:
      "Led development of an online residential property exchange. My responsibilities include architectural design decisions, project task board management, and communication with stakeholders. Certain complexities of the application, robust task scheduling, credit card payment, external API integration, and more, have required great technical aptitude.",
  },
  {
    company: "Macquarie Group",
    title: "Associate Software Engineer",
    date: "11/19 – 02/20",
    position: WorkTypes.INTERN,
    technologies: ["Java", "Spring boot", "Solace", "ActiveMQ", "Openshift"],
    description:
      "Developed and deployed multiple microservices as part of a trading transformation initiative. At the end of the internship, I was the team's leading knowledge source of message queue integration, Bamboo deployment pipelines, Spring cloud configs and more.",
  },
  {
    company: "MetaSwitch",
    title: "Software Engineer Intern",
    date: "11/18 – 02/19",
    position: WorkTypes.INTERN,
    technologies: ["Python", "Java", "Groovy", "InfluxDB", "Grafana", "Docker"],
    description:
      "Whilst at MetaSwitch, an international telecommunications software company, I developed software with the purpose of gathering, managing and visualizing telecommunication statistics. Using Grafana, all data could be accessed and displayed clearly and reliably.",
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

export default Work;
