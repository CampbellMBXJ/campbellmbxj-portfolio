import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useRouter } from "next/router";
import { FC, MouseEvent } from "react";
import { ChannelName, ChannelRoute } from "../../types";
import { fadeOutAnimation } from "./layout.animation";
import { Howl } from 'howler';
import styles from "./layout.module.scss";

type LayoutProps = {
  channel: number;
};

const staticFX = new Howl({
  src: ['/audio/crt_static.wav'],
  volume: 0.5
});

const totalChannels = Object.keys(ChannelRoute).length / 2;

const Layout: FC<LayoutProps> = ({ channel, children }) => {
  const router = useRouter();

  // Change the current channel by given value
  const changeChannel = (value: number, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const newChannel = (channel + totalChannels + value) % totalChannels;
    router.push(ChannelRoute[newChannel]);
    staticFX.play();
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence exitBeforeEnter>
        <div className={styles.container}>
          <header className={styles.header}>
            <span>CHANNEL: {ChannelName[channel]}</span>
            <div className={styles.arrows}>
              {/* Unicode arrows */}
              <div onClick={(e) => changeChannel(1, e)}>▲</div>
              <div onClick={(e) => changeChannel(-1, e)}>▼</div>
            </div>
            <div></div>
          </header>
          <main className={styles["main-content"]}>{children}</main>
          <footer className={styles.footer}>
            <span>RESUME</span>
            <span>GITHUB</span>
            <span>LINKED IN</span>
          </footer>
        </div>

        <m.div
          key={router.route.concat(fadeOutAnimation.name)}
          className={styles.animated}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeOutAnimation.variants}
          transition={fadeOutAnimation.transition}
        ></m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default Layout;
