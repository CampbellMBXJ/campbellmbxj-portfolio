import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Howl } from "howler";
import { useRouter } from "next/router";
import { FC, MouseEvent, useContext } from "react";
import { ControlsCtx } from "../../contexts/controls";
import { ChannelName, ChannelRoute } from "../../types";
import { fadeOutAnimation } from "./crt-screen.animation";
import styles from "./crt-screen.module.scss";

type CrtScreenProps = {
  channel: number;
};

const staticFX = new Howl({
  src: ["/audio/crt_static.wav"],
  volume: 0.5,
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
                  className={styles["arrows__item"]}
                  onClick={(e) => changeChannel(1, e)}
                >
                  ▲
                </div>
                <div
                  className={styles["arrows__item"]}
                  onClick={(e) => changeChannel(-1, e)}
                >
                  ▼
                </div>
              </div>
            </header>
            <main className={styles["screen__body"]}>{children}</main>
            <footer className={styles["screen__footer"]}>
              <span className="not-selectable clickable">RESUME</span>
              <span className="not-selectable clickable">GITHUB</span>
              <span className="not-selectable clickable">LINKED IN</span>
            </footer>
          </div>

          <m.div
            key={router.route.concat(fadeOutAnimation.name)}
            className={styles["screen__rainbow"]}
            animate={fadeOutAnimation.animate}
            transition={fadeOutAnimation.transition}
          ></m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default CrtScreen;
