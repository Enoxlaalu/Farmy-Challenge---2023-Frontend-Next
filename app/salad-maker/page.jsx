import { getBusinessLogic, getIngredients, getSalads } from "@/app/api/api.js";
import AddNewProduct from "@/app/salad-maker/AddNewProduct/AddNewProduct";
import styles from "./styles.module.scss";
import SuppliersSection from "@/app/salad-maker/SuppliersSection/SuppliersSection";
import SaladsTable from "@/app/salad-maker/SaladsTable/SaladsTable";

const SaladMaker = async (props) => {
  const salads = await getSalads();
  const ingredients = await getIngredients();
  const { saladTypes } = await getBusinessLogic();

  return (
    <div className={styles.page}>
      <AddNewProduct ingredients={ingredients} saladTypes={saladTypes} />
      <SaladsTable rows={salads} ingredients={ingredients} />
      <SuppliersSection salads={salads} ingredients={ingredients} />
    </div>
  );
};

export default SaladMaker;
