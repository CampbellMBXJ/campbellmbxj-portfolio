import { ChannelName } from "../types";
import { Page } from "./_app";
import styles from "./work.module.scss";
import WorkTile from "../components/work-tile/work-tile";
import VhsModal from "../components/vhs-modal/vhs-modal";
import { ReactElement, useState } from "react";

enum WorkTypes {
  FULL_TIME = "Full-time",
  INTERN = "Internship",
  INDEPENDENT = "Independent",
  PART_TIME = "Part-time",
}

interface WorkExperience {
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
            Migrated angular component library and css framework, aligning with
            the rest of the business.
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
    description: "Led development of an online residential property exchange. My responsibilities include architectural design decisions, project task board management, and communication with stakeholders. Certain complexities of the application, robust task scheduling, credit card payment, external API integration, and more, have required great technical aptitude.",
  },
  {
    company: "Macquarie Group",
    title: "Associate Software Engineer",
    date: "11/19 – 02/20",
    position: WorkTypes.INTERN,
    technologies: ["Java", "Spring boot", "Solace", "ActiveMQ", "Openshift"],
    description: "Developed and deployed multiple microservices as part of a trading transformation initiative. At the end of the internship, I was the team's leading knowledge source of message queue integration, Bamboo deployment pipelines, Spring cloud configs and more.",
  },
  {
    company: "MetaSwitch",
    title: "Software Engineer Intern",
    date: "11/18 – 02/19",
    position: WorkTypes.INTERN,
    technologies: ["Python", "Java", "Groovy", "InfluxDB", "Grafana", "Docker"],
    description: "Whilst at MetaSwitch, an international telecommunications software company, I developed software with the purpose of gathering, managing and visualizing telecommunication statistics. Using Grafana, all data could be accessed and displayed clearly and reliably.",
  },
  {
    company: "University of Canterbury",
    title: "Scrum Master and Tutor",
    date: "01/20 – 11/20",
    position: WorkTypes.PART_TIME,
    technologies: ["Java", "Spring boot", "Solace", "ActiveMQ", "Openshift"],
    description: "Act as a scrum master for development teams in a third-year project course. This required extensive software engineering process knowledge. I additionally tutor and grade the students.",
  },
];

const Work: Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState<ReactElement | string>();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const tileHandler = (body: ReactElement | string) => {
    setModalBody(body);
    openModal();
  };

  const workTiles = () => {
    return workExperience.map((we, i) => {
      return (
        <WorkTile key={i} {...we} handler={() => tileHandler(we.description)} />
      );
    });
  };

  return (
    <>
      <div className={styles.container}>{workTiles()}</div>

      {!!isModalOpen && (
        <VhsModal closeModal={closeModal}>
          {modalBody}
        </VhsModal>
      )}
    </>
  );
};

Work.getChannel = () => ChannelName["04 WORK"];

export default Work;
