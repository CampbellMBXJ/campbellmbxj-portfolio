import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Howl } from "howler";
import { useRouter } from "next/router";
import { FC, MouseEvent, useContext } from "react";
import { ControlsCtx } from "../../contexts/controls";
import { ChannelName, ChannelRoute } from "../../types";
import { fadeOutAnimation } from "./crt-screen.animation";
import cn from "classnames";
import styles from "./crt-screen.module.scss";

type CrtScreenProps = {
  channel: number;
};

const staticFX = new Howl({
  src: ["/audio/crt_static.wav"],
  volume: 0.03,
});

const totalChannels = Object.keys(ChannelRoute).length / 2;

const CrtScreen: FC<CrtScreenProps> = ({ children, channel }) => {
  const router = useRouter();
  const { isMuted } = useContext(ControlsCtx);

  // Change the current channel by given value
  const changeChannel = (value: number, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const newChannel = (channel + totalChannels + value) % totalChannels;
    router.push(ChannelRoute[newChannel]);
  };

  const playTransistionSound = () => {
    if (!isMuted) {
      staticFX.play();
    }
  };

  return (
    <div className={styles["screen"]}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter>
          <div className={styles["screen__container"]}>
            <header className={styles["screen__header"]}>
              <span className="not-selectable">
                CHANNEL: {ChannelName[channel]}
              </span>
              <div className={styles["arrows"]}>
                {/* Unicode arrows */}
                <div
                  className={cn(
                    styles["arrows__item"],
                    "clickable",
                    "non-selectable"
                  )}
                  onClick={(e) => changeChannel(1, e)}
                >
                  ▲
                </div>
                <div
                  className={cn(
                    styles["arrows__item"],
                    "clickable",
                    "non-selectable"
                  )}
                  onClick={(e) => changeChannel(-1, e)}
                >
                  ▼
                </div>
              </div>
            </header>
            <main className={styles["screen__body"]}>{children}</main>
            <footer className={styles["screen__footer"]}>
              <span className="not-selectable clickable link">RESUME</span>
              <a
                href="https://github.com/CampbellMBXJ"
                target="_blank"
                rel="noreferrer"
              >
                <span className="not-selectable clickable link">GITHUB</span>
              </a>
              <a
                href="www.linkedin.com/in/campbell-mercer-butcher"
                target="_blank"
                rel="noreferrer"
              >
                <span className="not-selectable clickable link">LINKED IN</span>
              </a>
            </footer>
          </div>

          <m.div
            key={router.route.concat(fadeOutAnimation.name)}
            className={styles["screen__rainbow"]}
            animate={fadeOutAnimation.animate}
            transition={fadeOutAnimation.transition}
            onAnimationStart={playTransistionSound}
          ></m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default CrtScreen;
