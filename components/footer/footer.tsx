import React from "react";
import cn from "classnames";
import styles from "./footer.module.scss";
import Link from "next/link";

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <footer className={styles["footer"]}>
      <Link passHref href="/documents/campbell-mb-resume.pdf">
        <span
          className={cn(
            styles["footer__item"],
            "not-selectable clickable link"
          )}
        >
          RESUME
        </span>
      </Link>
      <a
        href="https://github.com/CampbellMBXJ"
        target="_blank"
        rel="noreferrer"
        className={styles["footer__item"]}
      >
        <span className={cn("not-selectable", "clickable", "link")}>
          GITHUB
        </span>
      </a>
      <a
        href="https://linkedin.com/in/campbell-mercer-butcher"
        target="_blank"
        rel="noreferrer"
        className={styles["footer__item"]}
      >
        <span className={cn("not-selectable", "clickable", "link")}>
          LINKED IN
        </span>
      </a>
    </footer>
  );
};

export default Footer;
