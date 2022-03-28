import { ChannelName } from "../types";
import { Page } from "./_app";
import styles from "./work.module.scss";
import WorkTile from "../components/work-tile/work-tile";
import VhsModal from '../components/vhs-modal/vhs-modal';
import { useState } from 'react';

const Work: Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState<string>();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const tileHandler = (body: string) => {
    setModalBody(body);
    openModal();
  }

  return (
    <>
      <div className={styles.container}>
        <WorkTile
          handler={() => tileHandler("SOME WORK I HAVE DONE")}
          company="Macquarie Group"
          title="Associate Software Engineer"
          position="Permanent"
          date={"2/21 - Current"}
          technologies={["Java", "Spring boot", "Typescript", "Angular", "AWS"]}
        />
        <WorkTile
          company="Macquarie Group"
          title="Associate Software Engineer"
          position="Internship"
          date={"11/19 - 02/20"}
          technologies={[
            "Java",
            "Spring Boot",
            "Solace",
            "ActiveMQ",
            "Reactor",
            "Openshift",
          ]}
        />
        <WorkTile
          company="Epex Ltd"
          title="Development Team Lead and Director"
          position="Independent"
          date={"01/19 - 08/21"}
          technologies={["Typescript", "Express", "React", "PostgreSQL"]}
        />
        <WorkTile
          company="MetaSwitch"
          title="Software Engineer"
          position="Internship"
          date={"11/18 – 02/19"}
          technologies={[
            "Java",
            "Groovy",
            "Python",
            "InfluxDB",
            "Grafana",
            "Docker",
          ]}
        />
        <WorkTile
          company="University of Canterbury"
          title="Scrum Master and Tutor"
          position="Part-time"
          date={"01/20 - 09/20"}
          technologies={["Java", "Play", "Javascript", "Vue"]}
        />
      </div>
      {isModalOpen && <VhsModal closeModal={closeModal}>
        <p>{modalBody}</p>
        </VhsModal>}
    </>
  );
};

Work.getChannel = () => ChannelName["04 WORK"];

export default Work;
