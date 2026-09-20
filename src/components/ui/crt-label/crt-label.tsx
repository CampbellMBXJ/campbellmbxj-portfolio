import type { FC, PropsWithChildren } from "react";
import styles from "./crt-label.module.scss";
import cn from "classnames";

type Props = {
  isText?: boolean;
};

const CrtLabel: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <div
      className={cn(
        styles["crt-label"],
        styles["crt-label--spaced"],
        props.isText === false && styles["crt-label--badge"],
      )}
    >
      <div
        className={cn(
          styles["crt-label__span"],
          props.isText !== false && styles["crt-label__span--text"],
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export default CrtLabel;
