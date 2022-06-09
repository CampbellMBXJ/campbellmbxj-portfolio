import cn from "classnames";
import { FC } from "react";
import styles from "./metalic-panel.module.scss";

const MetalicPanel: FC = ({ children }) => {
  return (
    <div className={styles["metalic-panel"]}>
      {children}
      
      {/* Screws (Position absolute - don't effect layout) */}
      <div
        className={cn(
          styles["metalic-panel__screw"],
          styles["metalic-panel__screw--top-left"]
        )}
      ></div>
      <div
        className={cn(
          styles["metalic-panel__screw"],
          styles["metalic-panel__screw--top-right"]
        )}
      ></div>
      <div
        className={cn(
          styles["metalic-panel__screw"],
          styles["metalic-panel__screw--bottom-left"]
        )}
      ></div>
      <div
        className={cn(
          styles["metalic-panel__screw"],
          styles["metalic-panel__screw--bottom-right"]
        )}
      ></div>
    </div>
  );
};

export default MetalicPanel;
