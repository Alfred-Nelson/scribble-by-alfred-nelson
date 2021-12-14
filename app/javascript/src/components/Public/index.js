import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { either, isEmpty, isNil } from "ramda";
import { Redirect, Route, useHistory, useLocation } from "react-router";

import { PublicCategoriesApi } from "apis/public/categories";
import { PublicSiteApi } from "apis/public/site";
import { RedirectionApi } from "apis/redirection";
import { SiteApi } from "apis/site";
import PublicNav from "components/Container/PublicNav";
import { setToLocalStorage, getFromLocalStorage } from "helpers/Storage";

import ArticleBoard from "./ArticleBoard";
import SideBar from "./SideBar";

const Public = ({
  redirectToLogin,
  setRedirectToLogin,
  currentLocation,
  setCurrentLocation,
}) => {
  const siteName = getFromLocalStorage("site");
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  const history = useHistory();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [redirections, setRedirections] = useState([]);

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
    setCategories(response.data.categories);
  };

  const fetchRedirections = async () => {
    const response = await RedirectionApi.list();
    setRedirections(response.data.redirections);
  };

  useEffect(() => {
    if (categories.length > 0) {
      if (currentLocation !== null) {
        const checkingSlug = currentLocation.slice(8);
        const hasValidSlug = categories.some(category =>
          category.articles.some(article => article.slug === checkingSlug)
        );
        if (hasValidSlug) {
          history.push(currentLocation);
        } else {
          history.push(`/public/${categories[0].articles[0].slug}`);
        }
      } else {
        history.push(`/public/${categories[0].articles[0].slug}`);
      }
    }
  }, [categories]);

  useEffect(() => {
    fetchRedirections();
    if (location.pathname !== "/public") {
      setCurrentLocation(location.pathname);
    }

    if (!siteName || redirectToLogin === null) {
      fetchSiteDetails();
    }

    if (isLoggedIn) {
      fetchCategoryDetails();
    }
  }, []);

  if (redirectToLogin === null && redirections.length === 0) {
    return (
      <div className="mt-40">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {redirections.map((redirection, index) => (
        <>
          {location.pathname === `/public${redirection.from}` && (
            <Redirect key={index} to={`/public${redirection.to}`} />
          )}
        </>
      ))}
      {!isLoggedIn && <Redirect to="/login" />}
      <PublicNav>
        {categories.length > 0 ? (
          <SideBar categories={categories}>
            <Route
              path="/public/:slug"
              component={() => (
                <ArticleBoard setCurrentLocation={setCurrentLocation} />
              )}
            />
          </SideBar>
        ) : (
          <div className="w-full flex justify-center mt-20">
            {" "}
            👾 No published articles{" "}
          </div>
        )}
      </PublicNav>
    </div>
  );
};

export default Public;
