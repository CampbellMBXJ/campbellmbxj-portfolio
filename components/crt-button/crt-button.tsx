import { FC } from "react";
import CrtLabel from "../crt-label/crt-label";
import styles from "./crt-button.module.scss";

type CrtButtonProps = {
  label?: string;
  onClick: () => void;
};

const CrtButton: FC<CrtButtonProps> = (props) => {
  return (
    <div className={styles["crt-button"]}>
      {props.label && <CrtLabel>{props.label}</CrtLabel>}
      <div className={styles["crt-button__button"]}>
        <input
          className={styles["crt-button__input"]}
          type="button"
          onClick={props.onClick}
        ></input>
      </div>
    </div>
  );
};

export default CrtButton;
