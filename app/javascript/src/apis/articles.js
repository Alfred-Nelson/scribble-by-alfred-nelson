import axios from "axios";

const create = payload => axios.post("/articles", payload);
const list = () => axios.get("/articles");
const show = id => axios.get(`/articles/${id}`);

export const ArticlesApi = {
  create,
  list,
  show,
};
