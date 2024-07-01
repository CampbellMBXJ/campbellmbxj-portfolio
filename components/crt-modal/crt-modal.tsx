import cn from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import styles from "./crt-modal.module.scss";

type VhsModalProps = {
  closeModal(): void;
};

const CrtModal: FC<VhsModalProps> = ({ children, closeModal }) => {
  const [closeing, setCloseing] = useState(false);

  // Delays closeing modal until after the animation has completed
  const animateClose = useCallback(() => {
    if (!closeing) {
      setCloseing(true);
      setTimeout(closeModal, 1000);
    }
  }, [closeModal, closeing]);

  useEffect(() => {
    const close = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        animateClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [animateClose]);

  return (
    <div className={styles["crt-modal"]} onClick={() => animateClose()}>
      <div
        className={cn(
          styles["crt-modal__modal"],
          closeing && styles["crt-modal__modal--close"]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles["crt-modal__header"]}>
          <span>1024 x 768 \ 30hz</span>
          <div className={styles["close-btn"]} onClick={() => animateClose()}>
            <span className={cn(styles["close-btn__cross"], "not-selectable")}>
              +
            </span>
          </div>
        </header>
        <div className={styles["crt-modal__body"]}>{children}</div>
        <footer className={styles["crt-modal__footer"]}>
          PRESS [ESC] TO CLOSE
        </footer>
      </div>
    </div>
  );
};

export default CrtModal;
