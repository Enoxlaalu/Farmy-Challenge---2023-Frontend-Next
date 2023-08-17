import styles from "./styles.module.scss";

const Button = ({ className, text, onClick, disabled, type = "primary" }) => {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
