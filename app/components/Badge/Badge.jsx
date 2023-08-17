import styles from "./styles.module.scss";
import { useState } from "react";

const sizes = ["small", "medium", "large"];

const Badge = ({ text, color = "orange", onClick }) => {
  const [currentSize, setCurrentSize] = useState(0);
  const handleClick = () => {
    const nextSize = currentSize === sizes.length - 1 ? 0 : currentSize + 1;
    onClick(sizes[nextSize]);
    setCurrentSize(nextSize);
  };

  return (
    <div className={`${styles.badge} ${styles[color]}`} onClick={handleClick}>
      {sizes[currentSize]}
    </div>
  );
};

export default Badge;
