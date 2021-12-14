import axios from "axios";

import { getFromLocalStorage } from "helpers/Storage";

const getData = () =>
  new Promise(resolve => {
    const authToken = getFromLocalStorage("authToken");
    const headers = {};
    headers["X-Auth-Token"] = authToken;
    const options = {
      headers,
    };
    const response = axios.get("/public/categories", options);
    resolve(response);
  });

export const PublicCategoriesApi = {
  getData,
};
