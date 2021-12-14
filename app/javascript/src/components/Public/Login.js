import React, { useEffect, useState } from "react";

import { Typography, Input, Button, PageLoader } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";

import { PublicSiteApi } from "apis/public/site";
import { SiteApi } from "apis/site";
import Frame from "assets/Frame.png";
import PublicNav from "components/Container/PublicNav";

import { getFromLocalStorage, setToLocalStorage } from "../../helpers/Storage";

const Login = ({ redirectToLogin, setRedirectToLogin }) => {
  const [passwordInput, setPasswordInput] = useState("");
  const siteName = getFromLocalStorage("site");
  const history = useHistory();

  const handleClick = async () => {
    const payload = { site: { password: passwordInput } };
    const response = await PublicSiteApi.getToken(payload);
    const token = response.data.token;
    setToLocalStorage({ authToken: token });
    setRedirectToLogin(false);
  };

  const fetchSiteDetails = async () => {
    const response = await SiteApi.show();
    setToLocalStorage({ site: response.data.site.name });
    if (!response.data.site.has_password) {
      handleClick();
    }
    setRedirectToLogin(true);
  };

  useEffect(() => {
    if (redirectToLogin === false) {
      history.push("/public");
    }
  }, [redirectToLogin]);

  useEffect(() => {
    if (siteName === null || redirectToLogin === null) {
      fetchSiteDetails();
    }
  }, []);

  if (siteName === null || !redirectToLogin) {
    return (
      <div className="mt-40">
        <PageLoader />
      </div>
    );
  }

  return (
    <PublicNav siteName={siteName}>
      <div className="w-full flex flex-col items-center">
        <img src={Frame} className="mt-20 mb-5 w-1/9 " />
        <Typography style="h2"> {siteName} is password protected! </Typography>
        <Typography className="my-2 text-gray-600">
          Enter the password to gain access to {siteName.toLowerCase()}{" "}
        </Typography>
        <div className="w-1/4 mt-3">
          <Input
            type="password"
            label="Password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
          />
          <Button
            label="Continue"
            className="mt-4 bg-bb-purple"
            onClick={handleClick}
          />
        </div>
      </div>
    </PublicNav>
  );
};

export default Login;
