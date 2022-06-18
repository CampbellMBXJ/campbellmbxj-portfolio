import { FC, MouseEvent } from "react";
import cn from "classnames";
import styles from "./header.module.scss";
import { ChannelName, ChannelRoute } from "../../types";
import { useRouter } from "next/router";

type HeaderProps = {
  channel: number;
  isMuted: boolean;
};

const totalChannels = Object.keys(ChannelRoute).length / 2;

const Header: FC<HeaderProps> = ({ channel, isMuted }) => {
  const router = useRouter();

  // Change the current channel by given value
  const changeChannel = (value: number, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const newChannel = (channel + totalChannels + value) % totalChannels;
    router.push(ChannelRoute[newChannel]);
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["header__left"]}>
        {isMuted && (
          <svg
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
        <span className="not-selectable">CHANNEL: {ChannelName[channel]}</span>
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
      </div>
    </header>
  );
};

export default Header;
