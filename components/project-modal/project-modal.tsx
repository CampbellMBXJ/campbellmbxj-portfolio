import React, { FC } from "react";
import { Project } from "../../pages/projects";
import CrtCarousel from "../crt-carousel/crt-carousel";
import VhsModal from "../vhs-modal/vhs-modal";
import cn from "classnames";
import styles from "./project-modal.module.scss";

type ProjectModalProps = {
  closeModal: () => void;
  project: Project;
};

const ProjectModal: FC<ProjectModalProps> = ({ closeModal, project }) => {
  return (
    <VhsModal closeModal={closeModal}>
      <h3 className={styles["project-modal__heading"]}>{project.title}</h3>
      {!!project.images && <CrtCarousel images={project.images} />}
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
    </VhsModal>
  );
};

export default ProjectModal;
