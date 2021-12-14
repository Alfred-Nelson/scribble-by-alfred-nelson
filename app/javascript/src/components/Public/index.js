import React, { useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { either, isEmpty, isNil } from "ramda";
import { Redirect } from "react-router";

import { PublicCategoriesApi } from "apis/public/categories";
import { PublicSiteApi } from "apis/public/site";
import { SiteApi } from "apis/site";
import PublicNav from "components/Container/PublicNav";
import { setToLocalStorage, getFromLocalStorage } from "helpers/Storage";

const Public = ({ redirectToLogin, setRedirectToLogin }) => {
  const siteName = getFromLocalStorage("site");
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  const fetchSiteDetails = async () => {
    const response = await SiteApi.show();
    setToLocalStorage({ site: response.data.site.name });
    const shouldRedirect = response.data.site.has_password;
    if (!shouldRedirect) {
      const result = await PublicSiteApi.getToken({ site: {} });
      setToLocalStorage({ authToken: result.data.token });
    }
    setRedirectToLogin(shouldRedirect);
  };

  const fetchCategoryDetails = async () => {
    const response = await PublicCategoriesApi.getData();
    response;
  };

  useEffect(() => {
    if (!siteName || redirectToLogin === null) {
      fetchSiteDetails();
    }

    if (isLoggedIn) {
      fetchCategoryDetails();
    }
  }, []);

  if (redirectToLogin === null) {
    return (
      <div className="mt-40">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {!isLoggedIn && <Redirect to="/login" />}
      <PublicNav>Hello {siteName}</PublicNav>
    </div>
  );
};

export default Public;
