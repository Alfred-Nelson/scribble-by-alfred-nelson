import axios from "axios";

const list = () => axios.get("/categories");
const create = payload => axios.post("/categories", payload);

export const CategoriesApi = {
  list,
  create,
};
