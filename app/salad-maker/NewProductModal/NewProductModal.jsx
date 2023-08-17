"use client";

import Modal from "@/app/components/Modal/Modal";
import Input from "@/app/components/Input/Input";
import ProductsList from "@/app/salad-maker/ProductsList/ProductsList";
import Button from "@/app/components/Button/Button";
import styles from "./styles.module.scss";
import Select from "@/app/components/Select/Select";
import { useMemo, useState } from "react";
import { saveNewSalad } from "@/app/api/api";
import { useRouter } from "next/navigation";
import Badge from "@/app/components/Badge/Badge";

const NewProductModal = ({ open, close, ingredients, saladTypes }) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [size, setSize] = useState("small");

  const { targetCost, targetWeight } = saladTypes[size];

  const addIngredient = (el) => setRows((rows) => [...rows, el]);

  const totalCost = useMemo(() => {
    return rows
      .reduce((acc, val) => {
        return acc + val.costPerServing * (val.servings ?? 1);
      }, 0)
      .toFixed(1);
  }, [rows]);

  const totalWeight = useMemo(() => {
    return rows.reduce(
      (acc, val) => acc + val.weightPerServing * (val.servings ?? 1),
      0,
    );
  }, [rows]);

  const updateRow = (row) => {
    const newRows = [...rows].map((r) => {
      if (r.id === row.id) {
        return row;
      }

      return r;
    });

    setRows(newRows);
  };

  const deleteRow = (row) => {
    const newRows = [...rows].filter((r) => r.id !== row.id);

    setRows(newRows);
  };

  const changeName = (name) => setName(name);
  const changeSize = (size) => setSize(size);

  const AddItem = () => <button className={styles.button}>+</button>;

  const saveSalad = async () => {
    const ingredients = [];
    let hoursFresh;

    rows.forEach((r) => {
      ingredients.push({
        id: r.id,
        numOfServings: r.servings,
      });
      if (!hoursFresh || r.hoursFresh < hoursFresh) {
        hoursFresh = r.hoursFresh;
      }
    });

    const data = {
      id: Date.now(),
      name,
      size,
      ingredients,
      hoursFresh,
      cost: totalCost,
      weight: totalWeight,
    };

    setRows([]);

    await saveNewSalad(data);

    router.refresh();

    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      body={
        <>
          <Input
            id="nameInput"
            value={name}
            className={styles.input}
            onChange={changeName}
            endIcon={<Badge text={size} onClick={changeSize} />}
          />
          <span className={styles.text}>
            Target cost/weight: {targetCost} €/ {targetWeight}g
          </span>
          <div className={styles.textWrapper}>
            <span className={styles.text}>Total cost: {totalCost}€</span>
            <span className={styles.text}>Total weight: {totalWeight}g</span>
          </div>
          <ProductsList
            rows={rows}
            updateRow={updateRow}
            deleteRow={deleteRow}
          />
          <Select
            options={ingredients}
            onChange={addIngredient}
            Item={AddItem}
          />
          <div className={styles.buttons}>
            <Button text="Cancel" type="secondary" onClick={close} />
            <Button text="Save" onClick={saveSalad} />
          </div>
        </>
      }
    />
  );
};

export default NewProductModal;
