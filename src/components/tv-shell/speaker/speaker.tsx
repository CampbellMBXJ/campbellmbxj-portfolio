import { FC, Fragment } from "react";
import MetallicPanel from "../metallic-panel/metallic-panel";
import styles from "./speaker.module.scss";

const NUMBER_OF_GRILLS = 12;

const Speaker: FC = () => {
  const grills = [...Array(NUMBER_OF_GRILLS)].map((_, i) => (
    <Fragment key={i}>
      <div className={styles["speaker__grill-spacer"]}></div>
      <div className={styles["speaker__grill"]}></div>
    </Fragment>
  ));

  return (
    <MetallicPanel>
      <div className={styles["speaker"]}>
        {grills}
        <div className={styles["speaker__grill-spacer"]}></div>
      </div>
    </MetallicPanel>
  );
};

export default Speaker;
