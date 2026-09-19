import cn from "classnames";
import type { PropsWithChildren } from "react";
import ControlPanel from "./control-panel/control-panel";
import TvScreen from "./screen/screen";
import Speaker from "./speaker/speaker";
import { ControlsProvider } from "./controls-context";
import { useChannelNavigation } from "./use-channel-navigation";
import styles from "./tv-shell.module.scss";

function TvFrame({ children }: PropsWithChildren) {
  const navigation = useChannelNavigation();
  return (
    <div className={cn(styles.layout, styles["layout--wood"])}>
      <div className={cn(styles["layout__screen-frame"], styles["layout__screen-frame--metalic"])}>
        <TvScreen
          channel={navigation.channel}
          transitionKey={navigation.transitionKey}
          onNext={() => navigation.stepChannel(1)}
          onPrevious={() => navigation.stepChannel(-1)}
        >
          {children}
        </TvScreen>
      </div>
      <div className={styles["layout__secondary"]}>
        <div className={styles["layout__control-panel"]}>
          <ControlPanel channelIndex={navigation.index} onSelectChannel={navigation.selectChannel} />
        </div>
        <div className={styles["layout__speaker"]}><Speaker /></div>
      </div>
    </div>
  );
}

export default function TvShell({ children }: PropsWithChildren) {
  return <ControlsProvider><TvFrame>{children}</TvFrame></ControlsProvider>;
}
