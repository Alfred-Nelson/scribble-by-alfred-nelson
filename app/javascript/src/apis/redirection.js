import axios from "axios";

const create = payload => axios.post("/redirections", payload);
const list = () => axios.get("/redirections");
const update = (id, payload) => axios.put(`/redirections/${id}`, payload);
const destroy = id => axios.delete(`/redirections/${id}`);

export const RedirectionApi = {
  create,
  list,
  update,
  destroy,
};
