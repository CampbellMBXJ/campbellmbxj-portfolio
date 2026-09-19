import Link from "next/link";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <div className={styles.hero}>
      <h1>CAMPBELL MERCER</h1>
      <h3>SOFTWARE ENGINEER</h3>
      <nav className={styles.hero__actions} aria-label="Explore portfolio">
        <Link href="/who" className="link not-selectable">
          ABOUT ME
        </Link>
        <Link href="/projects" className="link not-selectable">
          VIEW PROJECTS <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </div>
  );
}
