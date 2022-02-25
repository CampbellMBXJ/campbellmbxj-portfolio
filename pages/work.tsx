import { ChannelName } from "../types";
import { Page } from "./_app";

const Work: Page = () => {
  return <h1>WORK</h1>;
};

Work.getChannel = () => ChannelName["03 WORK"];

export default Work;
