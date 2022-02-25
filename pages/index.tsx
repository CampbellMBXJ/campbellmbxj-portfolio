import { ChannelName } from "../types";
import styles from "./index.module.scss";
import { Page } from "./_app";

const Home: Page = () => {
  return (
    <>
      <div>
        <h2>CAMPBELL MERCER</h2>
        <h5>SOFTWARE ENGINEER</h5>
      </div>
    </>
  );
};

Home.getChannel = () => ChannelName["00 HOME"];

export default Home;
