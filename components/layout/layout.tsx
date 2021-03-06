import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import ControlPanel from "../control-panel/control-panel";
import CrtLabel from "../crt-label/crt-label";
import CrtScreen from "../crt-screen/crt-screen";
import Speaker from "../speaker/speaker";
import styles from "./layout.module.scss";

type LayoutProps = {
  channel: number;
};

const Layout: FC<LayoutProps> = ({ channel, children }) => {
  return (
    <div className={cn(styles["layout"], styles["layout--wood"])}>
      <div
        className={cn(
          styles["layout__screen-frame"],
          styles["layout__screen-frame--metalic"]
        )}
      >
        <CrtScreen channel={channel}>{children}</CrtScreen>
      </div>
      <div className={styles["layout__secondary"]}>
        <div className={styles["layout__control-panel"]}>
          <ControlPanel channel={channel} />
        </div>

        <div className={styles["layout__speaker"]}>
          <Speaker />
        </div>
      </div>
    </div>
  );
};

export default Layout;
