import styles from "./index.module.scss";

const Modal: React.FC<Modal> = ({ show, onClose, children }) => {
  const modalClassName = show
    ? `${styles.modalOverlay} ${styles.show}`
    : styles.modalOverlay;
  const contentClassName = show
    ? `${styles.modalContent} ${styles.show}`
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
