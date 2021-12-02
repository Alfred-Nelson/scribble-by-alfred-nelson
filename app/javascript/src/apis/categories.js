import axios from "axios";

const list = () => axios.get("/categories");

export const CategoriesApi = {
  list,
};
