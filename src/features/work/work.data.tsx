import { WorkTypes, type WorkExperience } from "./work-experience";

export const workExperience: WorkExperience[] = [
  {
    company: "Ailo",
    slug: "senior-software-engineer-(tech-lead)",
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
    slug: "senior-associate-software-engineer",
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
    slug: "development-team-lead-and-director",
    title: "Development Team Lead and Director",
    date: "01/19 – 02/21",
    position: WorkTypes.INDEPENDENT,
    technologies: ["Typescript", "Express", "React", "PostgreSQL", "Redis"],
    description:
      "Led development of an online residential property exchange, overseeing architectural design, project delivery, and stakeholder communication. Demonstrated strong technical proficiency in resolving complex challenges, including robust task scheduling, secure credit card payments, and seamless integration of external APIs.",
  },
  {
    company: "Macquarie Group",
    slug: "associate-software-engineer",
    title: "Associate Software Engineer",
    date: "11/19 – 02/20",
    position: WorkTypes.INTERN,
    technologies: ["Java", "Spring boot", "Solace", "ActiveMQ", "Openshift"],
    description:
      "Developed and deployed microservices and gateways crucial to a trading transformation initiative during my internship. Became the team's primary expert in key Spring technologies and message queue integration by the end of the program.",
  },
  {
    company: "MetaSwitch",
    slug: "software-engineer-intern",
    title: "Software Engineer Intern",
    date: "11/18 – 02/19",
    position: WorkTypes.INTERN,
    technologies: ["Python", "Java", "Groovy", "InfluxDB", "Grafana", "Docker"],
    description:
      "At MetaSwitch, an international telecommunications software company, I developed software to ingest, manage, and visualize telecommunications statistics. Leveraging Grafana, I ensured that all data was accessible and presented clearly and reliably.",
  },
  {
    company: "University of Canterbury",
    slug: "scrum-master-and-tutor",
    title: "Scrum Master and Tutor",
    date: "01/20 – 11/20",
    position: WorkTypes.PART_TIME,
    technologies: ["Java", "Spring boot", "Solace", "ActiveMQ", "Openshift"],
    description:
      "Acted as a scrum master for development teams in a third-year project course. This required extensive software engineering process knowledge. I additionally tutored and graded the students.",
  },
];
