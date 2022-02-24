import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["main-content"]}>
        <div>
          <h2 className="glitch-text">CAMPBELL MERCER</h2>
          <h5 className='glitch-text'>SOFTWARE ENGINEER</h5>
        </div>
        <div></div>
      </div>
      <div className={styles.footer}>
        <span className="glitch-text">RESUME</span>
        <span className="glitch-text">GITHUB</span>
        <span className="glitch-text">LINKED IN</span>
      </div>
    </div>

    // <footer className={styles.footer}>
    //   <a
    //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Powered by{' '}
    //     <span className={styles.logo}>
    //       <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    //     </span>
    //   </a>
    // </footer>
  );
};

export default Home;
