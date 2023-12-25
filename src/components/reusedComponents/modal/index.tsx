import styles from "./index.module.scss";
import cl from "classnames";

const Modal: React.FC<Modal> = ({ show, onClose, children }) => {
  const modalClassName = show
    ? cl(styles.modalOverlay, styles.show)
    : styles.modalOverlay;
  const contentClassName = show
    ? cl(styles.modalContent, styles.show)
    : styles.modalContent;

  return (
    <div className={modalClassName} onClick={onClose}>
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          onClick={onClose}
          aria-label="close"
          className={styles.closeButton}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;

type Modal = {
  show?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};
