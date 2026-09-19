import { useId, type FC } from "react";
import type { WorkExperience } from "../work-experience";
import CrtModal from "@/components/ui/crt-modal/crt-modal";
import styles from "./work-modal.module.scss";

type WorkModalProps = {
  work: WorkExperience;
  onClose: () => void;
};

const WorkModal: FC<WorkModalProps> = ({ work, onClose }) => {
  const titleId = useId();
  return (
    <CrtModal onClose={onClose} labelledBy={titleId} title={work.title}>
      <h4 className={styles["work-modal__sub-heading"]}>
        {work.company} - {work.date}
      </h4>
      <div className={styles["work-modal__description"]}>
        {work.description}
      </div>
    </CrtModal>
  );
};

export default WorkModal;
