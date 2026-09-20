import cn from "classnames";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import styles from "./crt-modal.module.scss";

type CrtModalProps = PropsWithChildren<{
  labelledBy: string;
  title: string;
  onClose(): void;
}>;

export default function CrtModal({
  children,
  labelledBy,
  title,
  onClose,
}: CrtModalProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (timer.current !== null) return;
    setClosing(true);
    timer.current = setTimeout(onClose, 240);
  }, [onClose]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement;
    // Keep the modal in the TV's transformed coordinate system while making
    // everything outside it inert, including the persistent TV controls.
    const siblings: { element: HTMLElement; inert: boolean }[] = [];
    let branch: HTMLElement = element;
    while (branch.parentElement && branch !== document.body) {
      for (const sibling of branch.parentElement.children) {
        if (sibling instanceof HTMLElement && sibling !== branch) {
          siblings.push({ element: sibling, inert: sibling.inert });
          sibling.inert = true;
        }
      }
      branch = branch.parentElement;
    }
    element.focus({ preventScroll: true });

    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
      for (const sibling of siblings) sibling.element.inert = sibling.inert;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const element = dialog.current;
      if (!element) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        requestClose();
      }
      if (event.key === "Tab") {
        const focusable = Array.from(
          element.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(
          (node) =>
            node.tabIndex >= 0 &&
            !node.matches(":disabled") &&
            node.getClientRects().length > 0 &&
            getComputedStyle(node).visibility !== "hidden",
        );
        event.preventDefault();
        if (focusable.length === 0) {
          element.focus({ preventScroll: true });
        } else {
          // Explicitly advance through controls so WebKit's platform keyboard
          // preferences cannot skip buttons or let focus leave the dialog.
          const current = focusable.indexOf(
            document.activeElement as HTMLElement,
          );
          const next =
            current < 0
              ? event.shiftKey
                ? focusable.length - 1
                : 0
              : (current + (event.shiftKey ? -1 : 1) + focusable.length) %
                focusable.length;
          focusable[next].focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [requestClose]);

  return (
    <div className={styles["crt-modal"]} onClick={requestClose}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          styles["crt-modal__modal"],
          closing && styles["crt-modal__modal--close"],
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles["crt-modal__header"]}>
          <div className={styles["crt-modal__title"]}>
            <span className={styles["crt-modal__signal"]}>CMB / ON SCREEN</span>
            <h3 id={labelledBy}>{title}</h3>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            className={styles["close-btn"]}
            onClick={requestClose}
          >
            <span
              aria-hidden="true"
              className={cn(styles["close-btn__cross"], "not-selectable")}
            >
              X
            </span>
          </button>
        </header>
        <div className={styles["crt-modal__body"]}>{children}</div>
        <footer className={styles["crt-modal__footer"]}>
          <span className={styles["crt-modal__desktop-hint"]}>
            PRESS [ESC] TO CLOSE
          </span>
          <button
            type="button"
            className={styles["crt-modal__touch-close"]}
            onClick={requestClose}
          >
            BACK TO CHANNEL
          </button>
          <span
            aria-hidden="true"
            className={styles["crt-modal__colour-bars"]}
          />
        </footer>
      </div>
    </div>
  );
}
