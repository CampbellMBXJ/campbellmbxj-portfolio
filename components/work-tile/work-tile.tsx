import cn from "classnames";
import { FC } from "react";
import styles from "./work-tile.module.scss";

type WorkTileProps = {
  handler?: () => any;
  company: string;
  title: string;
  date: string;
  position: string;
  technologies?: string[];
};

const WorkTile: FC<WorkTileProps> = (props) => {
  return (
    <section
      className={cn(styles["work-tile"], props.handler ? "clickable" : null)}
      onClick={props.handler}
    >
      {/* {props.logo ? <div></div> : null} */}
      <h3>{`${props.company} - ${props.title}`}</h3>
      <h4
        className={cn("secondary-text")}
      >{`${props.position}, ${props.date}`}</h4>
      <p className={cn("secondary-text")}>{props.technologies?.join(", ")}</p>
      <p className={cn(styles["work-tile__link"], "link")}>Read more</p>
    </section>
  );
};

export default WorkTile;
