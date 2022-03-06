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
    <section className={`${styles.container} ${props.handler ? 'clickable' : null}`} onClick={props.handler}>
      {/* {props.logo ? <div></div> : null} */}
      <h3>{`${props.company} - ${props.title}`}</h3>
      <h4 className="secondary-text">{`${props.position}, ${props.date}`}</h4>
      <p className="secondary-text">{props.technologies?.join(", ")}</p>
    </section>
  );
};

export default WorkTile;
