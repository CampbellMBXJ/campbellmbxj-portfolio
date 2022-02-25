import { useRouter } from 'next/router';
import { FC, MouseEvent } from "react";
import { ChannelName, ChannelRoute } from "../types";
import styles from "./layout.module.scss";

type LayoutProps = {
  channel: number;
};

const totalChannels = Object.keys(ChannelRoute).length / 2;

const Layout: FC<LayoutProps> = ({ channel, children }) => {
  const router = useRouter();

  // Change the current channel by given value
  const changeChannel = (value: number, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const newChannel = (channel + totalChannels + value) % totalChannels;
    router.push(ChannelRoute[newChannel]);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.arrows}>
          {/* Unicode arrows */}
          <div onClick={(e) => changeChannel(1, e)}>▲</div>
          <div onClick={(e) => changeChannel(-1, e)}>▼</div>
        </div>
        <span>CHANNEL: {ChannelName[channel]}</span>
      </header>
      <main className={styles["main-content"]}>{children}</main>
      <footer className={styles.footer}>
        <span>RESUME</span>
        <span>GITHUB</span>
        <span>LINKED IN</span>
      </footer>
    </div>
  );
};

export default Layout;
