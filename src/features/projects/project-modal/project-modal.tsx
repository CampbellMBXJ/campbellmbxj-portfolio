import { useId } from "react";
import type { Project } from "../project";
import ProjectGallery from "../project-gallery/project-gallery";
import CrtModal from "@/components/ui/crt-modal/crt-modal";
import cn from "classnames";
import styles from "./project-modal.module.scss";

type Props = { project: Project; onClose(): void };

export default function ProjectModal({ project, onClose }: Props) {
  const titleId = useId();
  return (
    <CrtModal onClose={onClose} labelledBy={titleId} title={project.title}>
      <div
        className={cn(
          styles.details,
          project.imageLayout === "portrait" && styles["details--portrait"],
        )}
      >
        {!!project.images?.length && (
          <ProjectGallery images={project.images} title={project.title} />
        )}
        <div className={styles.details__copy}>
          {project.tagline && <h4>{project.tagline}</h4>}
          <div className={styles.details__description}>
            {project.description}
          </div>
          {project.technologies && (
            <p className={styles.details__technologies}>
              {project.technologies.join(" · ")}
            </p>
          )}
          {project.linkLocation && project.linkText && (
            <a
              href={project.linkLocation}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {project.linkText} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </CrtModal>
  );
}
