import cn from "classnames";
import { FC } from "react";
import ControlPanel from "../control-panel/control-panel";
import CrtScreen from '../crt-screen/crt-screen';
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

      <ControlPanel channel={channel}/>
    </div>
  );
};

export default Layout;
