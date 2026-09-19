import { useId, type FC } from "react";
import type { Project } from "../project";
import ProjectGallery from "../project-gallery/project-gallery";
import CrtModal from "@/components/ui/crt-modal/crt-modal";
import cn from "classnames";
import styles from "./project-modal.module.scss";

type ProjectModalProps = {
  onClose: () => void;
  project: Project;
};

const ProjectModal: FC<ProjectModalProps> = ({ onClose, project }) => {
  const titleId = useId();
  return (
    <CrtModal onClose={onClose} labelledBy={titleId}>
      <h3 id={titleId} className={styles["project-modal__heading"]}>{project.title}</h3>
      {!!project.images && <ProjectGallery images={project.images} title={project.title} />}
      {!!project.linkLocation && !!project.linkText && (
        <a href={project.linkLocation} target={"_blank"} rel="noreferrer">
          <span
            className={cn(
              styles["project-modal__link"],
              "link",
              "link--dark",
              "not-selectable"
            )}
          >
            {project.linkText}
          </span>
        </a>
      )}
      <div className={cn(styles["project-modal__description"])}>{project.description}</div>
    </CrtModal>
  );
};

export default ProjectModal;
