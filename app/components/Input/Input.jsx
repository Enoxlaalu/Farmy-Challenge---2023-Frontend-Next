import styles from "./styles.module.scss";
import { memo } from "react";

const Input = memo(({ id, value, onChange, className, endIcon }) => {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <div className={`${styles.input} ${className}`}>
      <input id={id} type="text" value={value} onChange={handleChange} />
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </div>
  );
});

export default Input;
