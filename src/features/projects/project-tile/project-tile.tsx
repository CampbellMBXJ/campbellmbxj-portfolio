import cn from "classnames";
import Image from "next/image";
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
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        onOpen();
      }}
    >
      <div className={styles["project-tile__preview"]} aria-hidden="true">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt=""
            fill
            sizes="(max-width: 1050px) 85vw, 40vw"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div className={styles["project-tile__test-card"]}>
            <span>{project.slug === "sm-compiler" ? ">_ SM" : "{ DATA }"}</span>
            <small>
              {project.slug === "sm-compiler"
                ? "LANGUAGE / COMPILER"
                : "GRAFANA / PLUGIN"}
            </small>
          </div>
        )}
      </div>
      <h3 className="clickable">{project.title}</h3>
      {project.tagline && (
        <p className={styles["project-tile__tagline"]}>{project.tagline}</p>
      )}
      <p className={styles["project-tile__technologies"]}>
        {project.technologies?.join(" · ")}
      </p>
      <p className={cn(styles["project-tile__link"], "link")}>View project</p>
    </a>
  );
}
