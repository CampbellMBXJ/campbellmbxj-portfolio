import cn from "classnames";
import { FC, PropsWithChildren } from "react";
import styles from "./metallic-panel.module.scss";

const MetallicPanel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles["metallic-panel"]}>
      {children}

      {/* Screws (Position absolute - don't effect layout) */}
      <div
        aria-hidden="true"
        className={cn(
          styles["metallic-panel__screw"],
          styles["metallic-panel__screw--top-left"],
        )}
      ></div>
      <div
        aria-hidden="true"
        className={cn(
          styles["metallic-panel__screw"],
          styles["metallic-panel__screw--top-right"],
        )}
      ></div>
      <div
        aria-hidden="true"
        className={cn(
          styles["metallic-panel__screw"],
          styles["metallic-panel__screw--bottom-left"],
        )}
      ></div>
      <div
        aria-hidden="true"
        className={cn(
          styles["metallic-panel__screw"],
          styles["metallic-panel__screw--bottom-right"],
        )}
      ></div>
    </div>
  );
};

export default MetallicPanel;
