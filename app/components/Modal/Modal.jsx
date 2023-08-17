import styles from "./styles.module.scss";

const Modal = ({
  open,

  body,
  onClose,
  className,
}) => {
  const renderModal = () => {
    return (
      <div data-name="modal" className={styles.modal}>
        <div data-name="modalBody" className={styles.body}>
          {body}
        </div>
      </div>
    );
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`${styles.backdrop} ${className} ${open && styles.opened}`}
      onClick={closeModal}
    >
      {open ? renderModal() : null}
    </div>
  );
};

export default Modal;
