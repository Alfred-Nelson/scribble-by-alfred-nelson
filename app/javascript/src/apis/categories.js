import axios from "axios";

const list = () => axios.get("/categories");
const create = payload => axios.post("/categories", payload);
const destroy = id => axios.delete(`/categories/${id}`);
const update = (id, payload) => axios.put(`/categories/${id}`, payload);

export const CategoriesApi = {
  list,
  create,
  destroy,
  update,
};
