"use client";

import Button from "@/app/components/Button/Button";
import NewProductModal from "@/app/salad-maker/NewProductModal/NewProductModal";
import { useState } from "react";
import styles from "./styles.module.scss";

const AddNewProduct = ({ ingredients, saladTypes }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  return (
    <>
      <Button
        className={styles.addNewSaladButton}
        text="Add new salad"
        onClick={openModal}
      />
      <NewProductModal
        open={modalOpened}
        close={closeModal}
        ingredients={ingredients}
        saladTypes={saladTypes}
      />
    </>
  );
};

export default AddNewProduct;
