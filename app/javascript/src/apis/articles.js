import axios from "axios";

const create = payload => axios.post("/articles", payload);
const list = () => axios.get("/articles");

export const ArticlesApi = {
  create,
  list,
};
