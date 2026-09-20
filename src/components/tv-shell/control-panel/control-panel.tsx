import Image from "next/image";
import { FC } from "react";
import { useTvControls } from "../controls-context";
import { channels } from "../channels";
import CrtButton from "@/components/ui/crt-button/crt-button";
import CrtLabel from "@/components/ui/crt-label/crt-label";
import RangeSlider from "@/components/ui/crt-range-slider/crt-range-slider";
import MetallicPanel from "../metallic-panel/metallic-panel";
import styles from "./control-panel.module.scss";

type ControlPanelProps = {
  channelIndex: number;
  onSelectChannel(index: number): void;
};

const ControlPanel: FC<ControlPanelProps> = ({
  channelIndex,
  onSelectChannel,
}) => {
  const { isMuted, isPowered, toggleIsMuted, toggleIsPowered } =
    useTvControls();

  return (
    <MetallicPanel>
      <div className={styles["control-panel__btn-container"]}>
        <CrtButton
          onClick={toggleIsPowered}
          label="POWER"
          pressed={isPowered}
        ></CrtButton>
        <CrtButton
          onClick={toggleIsMuted}
          label="MUTE"
          pressed={isMuted}
          indicatorTone="amber"
        ></CrtButton>
      </div>
      <div className={styles["control-panel__selector"]}>
        <CrtLabel>Channel</CrtLabel>
        <RangeSlider
          step={1}
          min={1}
          max={channels.length}
          value={Math.max(0, channelIndex) + 1}
          label="Channel"
          valueText={channels[channelIndex]?.label ?? "Unknown channel"}
          onChange={(e) => onSelectChannel(Number(e.target.value) - 1)}
        />
      </div>
      <div className={styles["control-panel__branding-row"]}>
        <div className={styles["control-panel__brand"]}>
          <CrtLabel isText={false}>
            <div className={styles["control-panel__image"]}>
              <Image
                src={"/images/cmb-logo.svg"}
                alt={"Retro television logo"}
                fill
                sizes="100px"
              />
            </div>
          </CrtLabel>
        </div>
      </div>
    </MetallicPanel>
  );
};

export default ControlPanel;
