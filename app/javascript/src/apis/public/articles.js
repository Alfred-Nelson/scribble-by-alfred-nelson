import axios from "axios";

import { getFromLocalStorage } from "helpers/Storage";

const getArticle = slug =>
  new Promise(resolve => {
    const authToken = getFromLocalStorage("authToken");
    const headers = {};
    headers["X-Auth-Token"] = authToken;
    const options = {
      headers,
    };
    const response = axios.get(`/public/articles/${slug}`, options);
    resolve(response);
  });

export const PublicArticleApi = {
  getArticle,
};
