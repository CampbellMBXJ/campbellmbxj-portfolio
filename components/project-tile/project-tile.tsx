import cn from "classnames";
import { FC } from "react";
import styles from "./project-tile.module.scss";

type ProjectTileProps = {
  handler?: () => any;
  title: string;
  tagline?: string;
  technologies?: string[];
};

const ProjectTile: FC<ProjectTileProps> = (props) => {
  return (
    <section
      className={cn(styles["project-tile"], props.handler ? "clickable" : null)}
      onClick={props.handler}
    >
      <h3>{`${props.title}`}</h3>
      {!!props.tagline && <h4 className={cn("secondary-text")}>{props.tagline}</h4>}
      <p className={cn("secondary-text")}>{props.technologies?.join(", ")}</p>
      <p className={cn(styles["project-tile__link"], "link")}>View more</p>
    </section>
  );
};

export default ProjectTile;
