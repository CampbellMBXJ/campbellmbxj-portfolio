import React from "react";
import cn from "classnames";
import styles from "./footer.module.scss";

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <footer className={styles["footer"]}>
      <span className="not-selectable clickable link">RESUME</span>
      <a
        href="https://github.com/CampbellMBXJ"
        target="_blank"
        rel="noreferrer"
      >
        <span className="not-selectable clickable link">GITHUB</span>
      </a>
      <a
        href="https://linkedin.com/in/campbell-mercer-butcher"
        target="_blank"
        rel="noreferrer"
      >
        <span className="not-selectable clickable link">LINKED IN</span>
      </a>
    </footer>
  );
};

export default Footer;
