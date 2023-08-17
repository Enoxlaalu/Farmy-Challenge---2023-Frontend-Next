export const getSalads = async () => {
  const res = await fetch("http://localhost:3000/api/salads", {
    cache: "no-store",
  });

  return res.json();
};

export const getIngredients = async () => {
  const res = await fetch("http://localhost:3000/api/ingredients");

  return res.json();
};

export const getBusinessLogic = async () => {
  const res = await fetch("http://localhost:3000/api/businessLogic");

  return res.json();
};

export const getSuppliers = async () => {
  const res = await fetch("http://localhost:3000/api/suppliers");

  return res.json();
};

export const saveNewSalad = async (data) => {
  return await fetch("http://localhost:3000/api/salads", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
