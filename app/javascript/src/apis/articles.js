import axios from "axios";

const create = payload => axios.post("/articles", payload);
const list = () => axios.get("/articles");
const show = id => axios.get(`/articles/${id}`);
const destroy = id => axios.delete(`/articles/${id}`);
const update = (id, payload) => axios.put(`/articles/${id}`, payload);

export const ArticlesApi = {
  create,
  list,
  show,
  destroy,
  update,
};
