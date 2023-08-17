import Table from "@/app/components/Table/Table";

const SaladsTable = ({ rows, ingredients }) => {
  const getIngredientsCell = (row) =>
    row.ingredients
      .map((i) => ingredients.find((ing) => ing.id === i.id).name)
      .join(", ");

  const columns = [
    {
      id: "name",
      name: "Name",
      width: 45,
    },
    {
      id: "size",
      name: "Size",
    },
    {
      id: "ingredients",
      name: "Ingredients",
      cell: getIngredientsCell,
    },
    {
      id: "cost",
      name: "Cost",
      unit: "€",
    },
    {
      id: "weight",
      name: "Weight",
      unit: "g",
    },
    {
      id: "hoursFresh",
      name: "Hours Fresh",
    },
  ];

  return <Table rows={rows} columns={columns} />;
};

export default SaladsTable;
