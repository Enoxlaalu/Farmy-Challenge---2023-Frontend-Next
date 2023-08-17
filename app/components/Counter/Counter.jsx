import styles from "./styles.module.scss";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button";

const Counter = ({ value = 1, onChange }) => {
  const decrement = () => onChange(value - 1);
  const increment = () => onChange(value + 1);
  const onInputChange = (val) => onChange(val);

  return (
    <div className={styles.counter}>
      <Input value={value} className={styles.input} onChange={onInputChange} />
      <Button
        text="-"
        type="simple"
        onClick={decrement}
        disabled={value === 1}
      />
      <Button text="+" type="simple" onClick={increment} />
    </div>
  );
};

export default Counter;
