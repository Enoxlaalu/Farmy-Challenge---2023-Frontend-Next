"use client";

import { getSuppliers } from "@/app/api/api";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button/Button";

const SuppliersSection = ({ salads, ingredients }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [suppliers, setSuppliers] = useState(null);

  useEffect(() => {
    if (show) {
      if (!suppliers) {
        const fetchSuppliers = async () => {
          const suppliers = await getSuppliers();
          setSuppliers(suppliers);
          setData(getData(suppliers));
        };

        fetchSuppliers();
      } else {
        setData(getData(suppliers));
      }
    }
  }, [show, salads.length]);

  const getData = (suppliers) => {
    const ingredientsToOrder = {};
    const suppliersToOrderFrom = {};

    salads.forEach((s) => {
      s.ingredients.forEach((i) => {
        if (!ingredientsToOrder[i.id]) {
          ingredientsToOrder[i.id] = {
            count: 1,
          };
        } else ingredientsToOrder[i.id].count++;
      });
    });

    ingredients.forEach((i) => {
      const currentIngredient = ingredientsToOrder[i.id];
      const currentSupplier = suppliersToOrderFrom[i.supplierId];

      if (currentIngredient && !currentIngredient.name) {
        currentIngredient.name = i.name;
        currentIngredient.hoursFresh = i.hoursFresh;

        if (!currentSupplier) {
          const newSupplier = suppliers.find((s) => s.id === i.supplierId);
          suppliersToOrderFrom[i.supplierId] = {
            // id: newSupplier.id,
            name: newSupplier.name,
            ingredients: [currentIngredient],
            // urgent: urgent && [currentIngredient],
          };
          // currentIngredient.supplierId = newSupplier.id;
        } else {
          currentSupplier.ingredients.push(currentIngredient);
          // if (urgent) {
          //   currentSupplier.urgent.push(currentIngredient);
          // }
          // currentIngredient.supplierId = currentSupplier.id;
        }
      }
    });

    console.log(suppliersToOrderFrom);

    return Object.entries(suppliersToOrderFrom).map(
      ([key, { name, ingredients }]) => {
        return (
          <li key={key}>
            {name} -{" "}
            {ingredients.map((i, index) => {
              const urgent = i.hoursFresh <= 24;

              return (
                <span className={urgent && styles.urgent}>
                  {i.name} {i.count}
                  {ingredients.length - 1 !== index ? ", " : ""}
                </span>
              );
            })}
          </li>
        );
      },
    );
  };

  const onClick = () => setShow(true);

  return (
    <section className={styles.suppliersSection}>
      <Button text="Calculate order amount" onClick={onClick} />
      {show ? (
        <>
          <h2>Suppliers to order from:</h2>
          <p>* Red ingredients have freshness - 24 hours or less *</p>
          <ol>{data}</ol>
        </>
      ) : null}
    </section>
  );
};

export default SuppliersSection;
