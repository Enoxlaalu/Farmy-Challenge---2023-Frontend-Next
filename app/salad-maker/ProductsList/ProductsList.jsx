"use client";

import ProductsListItem from "@/app/salad-maker/ProductsListItem/ProductsListItem";
import styles from "./styles.module.scss";
import { useState } from "react";

const ProductsList = ({ rows, updateRow, deleteRow }) => {
  return (
    <ul className={styles.list}>
      {rows.map((r) => (
        <ProductsListItem
          key={r.id}
          row={r}
          updateRow={updateRow}
          deleteRow={deleteRow}
        />
      ))}
    </ul>
  );
};

export default ProductsList;