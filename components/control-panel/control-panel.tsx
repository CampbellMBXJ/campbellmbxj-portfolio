import cn from "classnames";
import { Howl } from "howler";
import { useRouter } from "next/router";
import { FC } from "react";
import { ChannelRoute } from "../../types";
import RangeSlider from "../crt-range-slider/crt-range-slider";
import Speaker from "../speaker/speaker";
import styles from "./control-panel.module.scss";

type ControlPanelProps = {
  channel: number;
};

const staticFX = new Howl({
  src: ["/audio/crt_static.wav"],
  volume: 0.5,
});

const totalChannels = Object.keys(ChannelRoute).length / 2;

const ControlPanel: FC<ControlPanelProps> = ({ channel }) => {
  const router = useRouter();

  // Change the current channel by given value
  const changeChannel = (value: string) => {
    const newChannel = Number(value) - 1;
    router.push(ChannelRoute[newChannel]);
    staticFX.play();
  };

  return (
    <div className={styles["control-panel"]}>
      <div className={styles["control-panel__selector"]}>
        <div className={cn(styles["control-panel__label"])}>
          <span className={cn(styles["control-panel__label-text"], "engraved-text")}>
            CHANNEL
          </span>
        </div>
        <RangeSlider
          step={1}
          min={1}
          max={4}
          value={channel + 1}
          onChange={(e) => changeChannel(e.target.value)}
        />
      </div>
      <div className={styles["control-panel__btn-container"]}></div>
      <div className={styles["control-panel__speaker"]}>
        <Speaker />
      </div>

      {/* Screws (Position absolute - don't effect layout) */}
      <div
        className={cn(
          styles["control-panel__screw"],
          styles["control-panel__screw--top-left"]
        )}
      ></div>
      <div
        className={cn(
          styles["control-panel__screw"],
          styles["control-panel__screw--top-right"]
        )}
      ></div>
      <div
        className={cn(
          styles["control-panel__screw"],
          styles["control-panel__screw--bottom-left"]
        )}
      ></div>
      <div
        className={cn(
          styles["control-panel__screw"],
          styles["control-panel__screw--bottom-right"]
        )}
      ></div>
    </div>
  );
};

export default ControlPanel;
