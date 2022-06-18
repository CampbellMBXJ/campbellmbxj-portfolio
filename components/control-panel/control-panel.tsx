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
import CrtSwitch from "../crt-switch/crt-switch";
import MetalicPanel from "../metalic-panel/metalic-panel";
import Speaker from "../speaker/speaker";
import styles from "./control-panel.module.scss";

type ControlPanelProps = {
  channel: number;
};

const ControlPanel: FC<ControlPanelProps> = ({ channel }) => {
  const router = useRouter();
  const { toggleIsMuted, toggleIsPowered } = useContext(ControlsCtx);

  // Change the current channel by given value
  const changeChannel = (value: string) => {
    const newChannel = Number(value) - 1;
    router.push(ChannelRoute[newChannel]);
  };

  // const accessibilityHandler = (value: boolean) => {};

  return (
    <MetalicPanel>
      <div className={styles["control-panel__btn-container"]}>
        <CrtButton onClick={toggleIsPowered} label="POWER"></CrtButton>
        <CrtButton onClick={toggleIsMuted} label="MUTE"></CrtButton>
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
      <div className={styles["control-panel__branding-row"]}>
        {/* Disabled accessability switch */}
        {/* <div className={styles["control-panel__switch"]}>
          <CrtLabel>ACCESSIBILITY</CrtLabel>
          <CrtSwitch
            leftText="On"
            rightText="Off"
            onToggle={accessibilityHandler}
          />
        </div> */}
        <div className={styles["control-panel__brand"]}>
          <CrtLabel isText={false}>
            <div className={styles["control-panel__image"]}>
              <Image
                src={"/images/cmb-logo.svg"}
                alt={"Retro television logo"}
                layout="fill"
              />
            </div>
          </CrtLabel>
        </div>
      </div>
    </MetalicPanel>
  );
};

export default ControlPanel;
