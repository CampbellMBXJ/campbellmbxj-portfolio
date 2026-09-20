import type { CSSProperties } from "react";
import MetallicPanel from "../metallic-panel/metallic-panel";
import styles from "./speaker.module.scss";

const NUMBER_OF_SLOTS = 12;

export default function Speaker() {
  return (
    <MetallicPanel>
      <div className={styles.speaker} aria-hidden="true">
        {Array.from({ length: NUMBER_OF_SLOTS }, (_, index) => (
          <div
            key={index}
            className={styles.speaker__slot}
            style={{ "--slot-index": index } as CSSProperties}
          >
            <div className={styles.speaker__cloth} />
          </div>
        ))}
      </div>
    </MetallicPanel>
  );
}
