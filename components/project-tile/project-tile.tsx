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
      className={cn(styles["project-tile"])}
      onClick={props.handler}
    >
      <h3 className='clickable'>{`${props.title}`}</h3>
      {!!props.tagline && <h4>{props.tagline}</h4>}
      <p>{props.technologies?.join(", ")}</p>
      <p className={cn(styles["project-tile__link"], "link")}>View project</p>
    </section>
  );
};

export default ProjectTile;
