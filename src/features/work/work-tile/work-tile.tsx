import cn from "classnames";
import type { WorkExperience } from "../work-experience";
import styles from "./work-tile.module.scss";

type Props = {
  work: WorkExperience;
  href: string;
  onOpen(): void;
};

export default function WorkTile({ work, href, onOpen }: Props) {
  return (
    <a
      href={href}
      className={styles["work-tile"]}
      aria-label={`View ${work.title}`}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        onOpen();
      }}
    >
      <h3 className="clickable">{work.company} - {work.title}</h3>
      <h4>{work.position}, {work.date}</h4>
      <p>{work.technologies?.join(", ")}</p>
      <p className={cn(styles["work-tile__link"], "link")}>Read more</p>
    </a>
  );
}
