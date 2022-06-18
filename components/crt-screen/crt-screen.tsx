import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Howl } from "howler";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { ControlsCtx } from "../../contexts/controls";
import Footer from "../footer/footer";
import cn from "classnames";
import Header from "../header/header";
import { fadeOutAnimation } from "./crt-screen.animation";
import styles from "./crt-screen.module.scss";

type CrtScreenProps = {
  channel: number;
};

const staticFX = new Howl({
  src: ["/audio/crt_static.wav"],
  volume: 0.03,
});

const CrtScreen: FC<CrtScreenProps> = ({ children, channel }) => {
  const router = useRouter();
  const { isMuted, isPowered } = useContext(ControlsCtx);

  const playTransistionSound = () => {
    if (!isMuted && isPowered) {
      staticFX.play();
    }
  };

  return (
    <div className={styles["screen"]}>
      <div
        className={cn(
          styles["screen__animated"],
          !isPowered && styles["screen__animated--off"]
        )}
      >
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter>
            <div className={styles["screen__container"]}>
              <Header isMuted={isMuted} channel={channel} />
              <main className={styles["screen__body"]}>{children}</main>
              <Footer />
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
    </div>
  );
};

export default CrtScreen;
