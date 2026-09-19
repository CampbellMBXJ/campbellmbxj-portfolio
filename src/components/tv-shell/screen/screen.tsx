import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useEffect, useRef, type FC, type PropsWithChildren } from "react";
import { useTvControls } from "../controls-context";
import { useTvAudio } from "../use-tv-audio";
import type { Channel } from "../channels";
import Footer from "../footer/footer";
import cn from "classnames";
import ChannelHeader from "../channel-header/channel-header";
import { fadeOutAnimation } from "./screen.animation";
import styles from "./screen.module.scss";

type TvScreenProps = {
  channel?: Channel;
  transitionKey: string;
  onNext(): void;
  onPrevious(): void;
};

const TvScreen: FC<PropsWithChildren<TvScreenProps>> = ({
  children,
  channel,
  transitionKey,
  onNext,
  onPrevious,
}) => {
  const { isMuted, isPowered } = useTvControls();
  const playTransitionSound = useTvAudio(isMuted, isPowered);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Channels share this scroll container. Start a newly selected channel at
    // the top without moving the page when only a detail hash changes.
    content.current?.scrollTo({ top: 0 });
  }, [transitionKey]);

  return (
    <div className={styles["screen"]}>
      <div
        className={cn(
          styles["screen__animated"],
          !isPowered && styles["screen__animated--off"],
        )}
      >
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="sync">
            <div
              ref={content}
              key="content"
              className={styles["screen__container"]}
            >
              <ChannelHeader
                isMuted={isMuted}
                channel={channel}
                onNext={onNext}
                onPrevious={onPrevious}
              />
              <main className={styles["screen__body"]}>{children}</main>
              <Footer />
            </div>

            <m.div
              key={transitionKey}
              className={styles["screen__rainbow"]}
              animate={fadeOutAnimation.animate}
              transition={fadeOutAnimation.transition}
              onAnimationStart={playTransitionSound}
            ></m.div>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </div>
  );
};

export default TvScreen;
