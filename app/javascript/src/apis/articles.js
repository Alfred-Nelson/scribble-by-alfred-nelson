import axios from "axios";

const create = payload => axios.post("/articles", payload);

export const ArticlesApi = {
  create,
};
