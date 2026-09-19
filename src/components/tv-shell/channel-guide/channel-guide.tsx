import { useId } from "react";
import Link from "next/link";
import CrtModal from "@/components/ui/crt-modal/crt-modal";
import { channels, type Channel } from "../channels";
import styles from "./channel-guide.module.scss";

type Props = { current?: Channel; onClose(): void };
const descriptions = {
  home: "Welcome to the portfolio",
  who: "About the engineer",
  projects: "Selected projects & experiments",
  work: "Experience & career history",
};

export default function ChannelGuide({ current, onClose }: Props) {
  const titleId = useId();
  return (
    <CrtModal title="Channel guide" labelledBy={titleId} onClose={onClose}>
      <nav aria-label="Channels" className={styles.guide}>
        {channels.map((channel) => (
          <Link
            key={channel.id}
            href={channel.href}
            aria-current={current?.id === channel.id ? "page" : undefined}
            onClick={onClose}
            className={styles.guide__channel}
          >
            <span className={styles.guide__number}>
              {channel.label.slice(0, 2)}
            </span>
            <span className={styles.guide__copy}>
              <strong>
                {channel.id === "who" ? "ABOUT" : channel.id.toUpperCase()}
              </strong>
              <small>{descriptions[channel.id]}</small>
            </span>
            <span className={styles.guide__status}>
              {current?.id === channel.id ? "ON AIR" : "↗"}
            </span>
          </Link>
        ))}
      </nav>
    </CrtModal>
  );
}
