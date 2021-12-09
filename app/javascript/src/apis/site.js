import axios from "axios";

const show = () => axios.get("/site");
const update = payload => axios.patch("/site", payload);

export const SiteApi = {
  show,
  update,
};
