import { FC } from "react";
import { WorkExperience } from "../../pages/work";
import CrtModal from "../crt-modal/crt-modal";
import styles from './work-modal.module.scss';

type WorkModalProps = {
  work: WorkExperience;
  closeModal: () => void;
};

const WorkModal: FC<WorkModalProps> = ({work, closeModal}) => {
  return (
    <CrtModal closeModal={closeModal}>
      <h3>{work.title}</h3>
      <h4 className={styles["work-modal__sub-heading"]}>{work.company} - {work.date}</h4>
      {work.description}
      </CrtModal>
  );
};

export default WorkModal;
