import { FC } from "react";
import styles from "./speaker.module.scss";

const NUMBER_OF_GRILLS = 12;

const Speaker: FC = () => {
  return (
    <div className={styles["speaker"]}>
      {[...Array(NUMBER_OF_GRILLS)].map((i) => (
        <>
          <div key={i + '-spacer'}className={styles["speaker__grill-spacer"]}></div>
          <div key={i + '-grill'} className={styles["speaker__grill"]}></div>
        </>
      ))}
      <div className={styles["speaker__grill-spacer"]}></div>
    </div>
  );
};

export default Speaker;
