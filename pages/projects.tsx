import { ChannelName } from "../types";
import { Page } from "./_app";

const Projects: Page = () => {
  return <h1>PROJECTS</h1>;
};

Projects.getChannel = () => ChannelName["02 PROJECTS"];

export default Projects;
