import React, { FC } from "react";
import styles from "./crt-switch.module.scss";
import cn from "classnames";

type Props = {
  leftText: string;
  rightText: string;
  onToggle: (value: boolean) => void;
};

const CrtSwitch: FC<Props> = (props) => {
  return (
      <label
        className={cn(styles["switch"], styles["switch--small"])}
      >
        <input type="checkbox" onChange={(event) => props.onToggle(event.target.checked)}/>
        <span className={cn(styles["switch__left"], "engraved-text")}>{props.leftText}</span>
        <span className={cn(styles["switch__right"], "engraved-text")}>{props.rightText}</span>
      </label>
  );
};

export default CrtSwitch;
