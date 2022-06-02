import { FC, Fragment } from "react";
import styles from "./speaker.module.scss";

const NUMBER_OF_GRILLS = 12;

const Speaker: FC = () => {
  const grills = [...Array(NUMBER_OF_GRILLS)].map((_, i) => (
    <Fragment key={i}>
      <div className={styles["speaker__grill-spacer"]}></div>
      <div className={styles["speaker__grill"]}></div>
    </Fragment>
  ))

  return (
    <div className={styles["speaker"]}>
      {grills}
      <div className={styles["speaker__grill-spacer"]}></div>
    </div>
  );
};

export default Speaker;
