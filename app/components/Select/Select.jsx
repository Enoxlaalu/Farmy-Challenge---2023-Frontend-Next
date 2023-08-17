import { memo, useCallback } from "react";
import Dropdown from "@/app/components/Dropdown/Dropdown";
import styles from "./styles.module.scss";

const Select = ({ options, onChange, Item }) => {
  const Items = useCallback(
    memo(() => {
      return (
        <>
          {options.map((option) => {
            const onClick = () => onChange(option);

            return (
              <li
                key={option?.id || option}
                className={styles.item}
                onClick={onClick}
              >
                {option?.name || option}
              </li>
            );
          })}
        </>
      );
    }),
    [],
  );

  return <Dropdown Item={Item} Items={Items} />;
};

export default Select;
