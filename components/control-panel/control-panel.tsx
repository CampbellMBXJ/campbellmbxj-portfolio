import cn from "classnames";
import { Howl } from "howler";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { ControlsCtx } from "../../contexts/controls";
import { ChannelRoute } from "../../types";
import CrtButton from "../crt-button/crt-button";
import CrtLabel from "../crt-label/crt-label";
import RangeSlider from "../crt-range-slider/crt-range-slider";
import MetalicPanel from "../metalic-panel/metalic-panel";
import Speaker from "../speaker/speaker";
import styles from "./control-panel.module.scss";

type ControlPanelProps = {
  channel: number;
};

const staticFX = new Howl({
  src: ["/audio/crt_static.wav"],
  volume: 0.5,
});

const ControlPanel: FC<ControlPanelProps> = ({ channel }) => {
  const router = useRouter();
  const { isMuted, toggleIsMuted } = useContext(ControlsCtx);
  const [windowAR, setWindowAR] = useState<number>(0);

  // Set window aspect ratio on resize
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Change the current channel by given value
  const changeChannel = (value: string) => {
    const newChannel = Number(value) - 1;
    router.push(ChannelRoute[newChannel]);
    if (!isMuted) {
      staticFX.play();
    }
  };

  const resize = () => {
    setWindowAR(document.body.offsetWidth / document.body.offsetHeight);
  };

  // style={{ height: `${Math.min(100 + (windowAR - 2.5) * 20, 100)}%` }}

  return (
    <MetalicPanel>
      <div className={styles["control-panel__btn-container"]}>
        <CrtButton onClick={toggleIsMuted} label="ON/OFF"></CrtButton>
        <CrtButton onClick={toggleIsMuted} label="MUTED"></CrtButton>
        <CrtButton onClick={toggleIsMuted} label="EXIT TV"></CrtButton>
      </div>

      <div className={styles["control-panel__selector"]}>
        <CrtLabel>Channel</CrtLabel>
        <RangeSlider
          step={1}
          min={1}
          max={4}
          value={channel + 1}
          onChange={(e) => changeChannel(e.target.value)}
        />
      </div>
    </MetalicPanel>
  );
};

export default ControlPanel;