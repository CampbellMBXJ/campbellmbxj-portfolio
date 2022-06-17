import Link from 'next/link';
import { ChannelName } from "../types";
import styles from "./index.module.scss";
import cn from 'classnames';
import { Page } from "./_app";

const Home: Page = () => {
  return (
      <div className={styles.hero}>
        <h1>CAMPBELL MERCER</h1>
        <h3>SOFTWARE ENGINEER</h3>
        <Link passHref href="/who"><h4 className={cn(styles["hero__link"], "link", "not-selectable")}>ABOUT ME</h4></Link>
      </div>
  );
};

Home.getChannel = () => ChannelName["01 HOME"];

export default Home;
