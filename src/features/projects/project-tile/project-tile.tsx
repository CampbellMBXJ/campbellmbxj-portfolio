import cn from "classnames";
import type { Project } from "../project";
import styles from "./project-tile.module.scss";

type Props = {
  project: Project;
  href: string;
  onOpen(): void;
};

export default function ProjectTile({ project, href, onOpen }: Props) {
  return (
    <a
      href={href}
      className={styles["project-tile"]}
      aria-label={`View ${project.title}`}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        onOpen();
      }}
    >
      <h3 className="clickable">{project.title}</h3>
      {project.tagline && <h4>{project.tagline}</h4>}
      <p>{project.technologies?.join(", ")}</p>
      <p className={cn(styles["project-tile__link"], "link")}>View project</p>
    </a>
  );
}
