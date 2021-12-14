import axios from "axios";

const getToken = payload =>
  axios.post("/public/site/get_authentication_token", payload);

export const PublicSiteApi = {
  getToken,
};
