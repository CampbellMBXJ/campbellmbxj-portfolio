import { FC, useEffect, useState } from "react";
import cn from "classnames";
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
  };

  return (
    <div className={styles["vhs-modal"]} onClick={() => animateClose()}>
      <div
        className={cn(
          styles["vhs-modal__modal"],
          closeing && styles["vhs-modal__modal--close"]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles["vhs-modal__header"]}>
          <span>1024 x 768 \ 30hz</span>
          <div className={styles["close-btn"]} onClick={() => animateClose()}>
            <span className={styles["close-btn__cross"]}>+</span>
          </div>
        </header>
        <div className={styles["vhs-modal__body"]}>{children}</div>
        <footer className={styles["vhs-modal__footer"]}>
          PRESS [ESC] TO CLOSE
        </footer>
      </div>
    </div>
  );
};

export default VhsModal;
