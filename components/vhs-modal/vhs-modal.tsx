import { FC, useEffect, useState } from "react";
import styles from "./vhs-modal.module.scss";

type VhsModalProps = {
  closeModal(): void;
};

const VhsModal: FC<VhsModalProps> = ({ children, closeModal }) => {
  const [closeing, setCloseing] = useState(false);

  useEffect(() => {
    const close = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        animateClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  // Delays closeing modal until after the animation has completed
  const animateClose = () => {
    if (!closeing) {
      setCloseing(true);
      setTimeout(closeModal, 1000);
    }
  }

  return (
    <div className={styles.container} onClick={() => animateClose()}>
      <div className={`${styles.modal} ${closeing ? styles['modal--close'] : null}`} onClick={(e) => e.stopPropagation()}>
        <header>
          <span>1024 x 768 \ 30hz</span>
          <div className={styles.close} onClick={() => animateClose()}>
            <span>+</span>
          </div>
        </header>
        <div className={styles["main-content"]}>{children}</div>
        <footer>PRESS [ESC] TO CLOSE</footer>
      </div>
    </div>
  );
};

export default VhsModal;
