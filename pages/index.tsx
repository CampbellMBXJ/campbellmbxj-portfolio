import { ChannelName } from "../types";
import styles from "./index.module.scss";
import { Page } from "./_app";

const Home: Page = () => {
  return (
    <>
      <div>
        <h1>CAMPBELL MERCER</h1>
        <h3>SOFTWARE ENGINEER</h3>
      </div>
    </>
  );
};

Home.getChannel = () => ChannelName["00 HOME"];

export default Home;
