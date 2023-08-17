import styles from "./styles.module.scss";
import Counter from "@/app/components/Counter/Counter";
import Trash from "/public/svg/trash.svg";
import Icon from "@/app/components/Icon/Icon";

const ProductsListItem = ({ row, updateRow, deleteRow }) => {
  const { name, weightPerServing, costPerServing, servings = 1 } = row;

  const onChange = (val) => updateRow({ ...row, servings: val });
  const onIconClick = () => deleteRow(row);

  return (
    <li className={styles.item}>
      <h4>{name}</h4>
      <span>Servings:</span>
      <Counter value={servings} onChange={onChange} />
      <span>{weightPerServing * servings}g</span>
      <span>{(costPerServing * servings).toFixed(1)}€</span>
      <Icon icon={Trash} alt="trash icon" onClick={onIconClick} />
    </li>
  );
};

export default ProductsListItem;
