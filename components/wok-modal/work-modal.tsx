import { FC } from "react";
import { WorkExperience } from "../../pages/work";
import VhsModal from "../vhs-modal/vhs-modal";
import styles from './work-modal.module.scss';

type WorkModalProps = {
  work: WorkExperience;
  closeModal: () => void;
};

const WorkModal: FC<WorkModalProps> = ({work, closeModal}) => {
  return (
    <VhsModal closeModal={closeModal}>
      <h3>{work.title}</h3>
      <h4 className={styles["work-modal__sub-heading"]}>{work.company} - {work.date}</h4>
      {work.description}
      </VhsModal>
  );
};

export default WorkModal;
