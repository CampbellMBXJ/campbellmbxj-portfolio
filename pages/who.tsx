import cn from "classnames";
import Link from "next/link";
import { ChannelName } from "../types";
import styles from "./who.module.scss";
import { Page } from "./_app";

const Who: Page = () => {
  return (
    <>
      <div className={styles["who"]}>
        <video autoPlay muted loop className={styles["video"]}>
          <source src="/images/headshot.webm" type="video/webm" />
        </video>
        <h3>About Me</h3>
        <p>
          I&apos;m Campbell, a Software Engineer, passionate about all things
          web. I have experience architecting and building highly scalable
          services on cloud infrastructure, and seamless customer-first user
          interfaces (Unlike this app...).
        </p>
        <p>
          I have led teams and projects successfully due to my deep
          understanding of technology, software processes, and product thinking.
          In addition, I have worked directly with clients and other
          stakeholders professionally and efficiently.
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

        {/* Tecnologies */}
        <h3 className={styles["who__heading"]}>Technologies:</h3>
        <ul className={styles["who__list"]}>
          <li className={styles["who__item"]}>
            Languages: Typescript, Java, Python
          </li>
          <li className={styles["who__item"]}>
            Infrastructure: AWS, Firebase, Openshift, Terraform, Cloudformation,
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
      </div>
    </>
  );
};

Who.getChannel = () => ChannelName["02 WHO"];

export default Who;
