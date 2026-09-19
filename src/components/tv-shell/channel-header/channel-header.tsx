import { useState, type FC } from "react";
import cn from "classnames";
import styles from "./channel-header.module.scss";
import type { Channel } from "../channels";
import ChannelGuide from "../channel-guide/channel-guide";

type HeaderProps = {
  channel?: Channel;
  onNext(): void;
  onPrevious(): void;
  isMuted: boolean;
};

const ChannelHeader: FC<HeaderProps> = ({
  channel,
  isMuted,
  onNext,
  onPrevious,
}) => {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header__left"]}>
          {isMuted && (
            <svg
              role="img"
              aria-label="Muted"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="white"
            >
              <path d="M18 23l-9.305-5.998.835-.651 7.47 4.815v-10.65l1-.781v13.265zm0-15.794l5.384-4.206.616.788-23.384 18.264-.616-.788 5.46-4.264h-2.46v-10h5.691l9.309-6v6.206zm-11.26 8.794l1.26-.984v-7.016h-4v8h2.74zm10.26-8.013v-5.153l-8 5.157v6.244l8-6.248z" />
            </svg>
          )}
        </div>
        <div className={styles["header__right"]}>
          <button
            type="button"
            className={styles.header__channel}
            aria-label="Open channel guide"
            aria-haspopup="dialog"
            aria-expanded={guideOpen}
            onClick={(event) => {
              event.currentTarget.focus({ preventScroll: true });
              setGuideOpen(true);
            }}
          >
            <span className="not-selectable">
              CHANNEL: {channel?.label ?? "UNKNOWN"}
            </span>
            <small>
              GUIDE <span aria-hidden="true">▤</span>
            </small>
          </button>
          <div className={styles["arrows"]}>
            {/* Unicode arrows */}
            <button
              type="button"
              className={cn(
                styles["arrows__item"],
                "clickable",
                "non-selectable",
              )}
              aria-label="Next channel"
              onClick={onNext}
            >
              ▲
            </button>
            <button
              type="button"
              className={cn(
                styles["arrows__item"],
                "clickable",
                "non-selectable",
              )}
              aria-label="Previous channel"
              onClick={onPrevious}
            >
              ▼
            </button>
          </div>
        </div>
      </header>
      {guideOpen && (
        <ChannelGuide current={channel} onClose={() => setGuideOpen(false)} />
      )}
    </>
  );
};

export default ChannelHeader;
