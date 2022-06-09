import React, { FC } from "react";
import styles from "./crt-label.module.scss";
import cn from "classnames";

type Props = {
  isText?: boolean;
};

const CrtLabel: FC<Props> = (props) => {
  return (
    <div
      className={cn(
        styles["crt-label"],
        styles["crt-label--spaced"],
      )}
    >
      <span
        className={cn(styles["crt-label__span"], props.isText !== false && styles["crt-label__span--text"], "engraved-text")}
      >
        {props.children}
      </span>
    </div>
  );
};

export default CrtLabel;
