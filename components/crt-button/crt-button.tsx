import { FC } from "react";
import styles from "./crt-button.module.scss";

type CrtButtonProps = {
  onClick: () => void;
};

const CrtButton: FC<CrtButtonProps> = (props) => {
  return (
    <div className={styles["crt-button"]}>
      <input
        className={styles["crt-button__input"]}
        type="button"
        onClick={props.onClick}
      ></input>
    </div>
  );
};

export default CrtButton;
