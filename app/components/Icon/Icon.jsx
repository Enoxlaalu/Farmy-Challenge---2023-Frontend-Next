import Image from "next/image";
import styles from "./styles.module.scss";

const Icon = ({ icon, alt, onClick }) => {
  return (
    <Image src={icon} alt={alt} className={styles.icon} onClick={onClick} />
  );
};

export default Icon;
