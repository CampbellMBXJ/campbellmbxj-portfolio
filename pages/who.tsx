import cn from "classnames";
import Link from "next/link";
import { ChannelName } from "../types";
import styles from "./who.module.scss";
import { Page } from "./_app";

const Who: Page = () => {
  return (
    <>
      <div className={styles["who"]}>
        <h3>About Me</h3>
        <p>
          I'm Campbell, a Software Engineer, passionate about all things web. I
          have experience architecting and building highly scalable services on
          cloud infastructure, and seamless customer first user interfaces
          (Unlike this app...).
        </p>
        <p>
          I have led teams and projects successfully due to my deep
          understanding of technology, software proccess, and product thinking.
          In addition, I have worked direclty with clients and other
          stakeholders in a proffesional and effiecent manner.
        </p>
        <p>
          Check out some of my{" "}
          <Link passHref href="/projects">
            <span className={cn("link", "not-selectable")}>Projects</span>
          </Link>{" "}
          and{" "}
          <Link href="/work" passHref>
            <span className={cn("link", "not-selectable")}>
              Work experience
            </span>
          </Link>
          .
        </p>

        {/* Tecnologies */}
        <h3>Technologies</h3>
        <ul className={styles["who__list"]}>
          <li className={styles["who__item"]}>
            Languages: Typescript, Java, Python, HTML5, CSS3
          </li>
          <li className={styles["who__item"]}>
            Infastructure: AWS, Firebase, Openshift, Terraform, Cloudformation,
            Vercel
          </li>
          <li className={styles["who__item"]}>
            Backend: Spring Boot, Play, Flask, Express, Nest, tRPC, Socket.io,
            PSQL, MySQL, Oracle
          </li>
          <li className={styles["who__item"]}>
            Frontend: React (Next, Remix), Angular, Vue.js
          </li>
        </ul>
        <p>
          Feel free to contact me via{" "}
          <a
            href="mailto:campbell.d.m.b@gmail.com"
            className={cn("link", "not-selectable")}
          >
            Email
          </a>{" "}
          or{" "}
          <a
            href="www.linkedin.com/in/campbell-mercer-butcher"
            target="_blank"
            rel="noreferrer"
            className={cn("link", "not-selectable")}
          >
            Linked In
          </a>{" "}
          for a chat.
        </p>
      </div>
      <video autoPlay muted loop className={styles["video"]}>
        <source src="/images/headshot.webm" type="video/webm" />
      </video>
    </>
  );
};

Who.getChannel = () => ChannelName["02 WHO"];

export default Who;
