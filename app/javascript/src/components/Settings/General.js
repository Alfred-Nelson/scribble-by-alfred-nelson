import React, { useEffect, useState } from "react";

import { Close, Check, Warning } from "@bigbinary/neeto-icons";
import {
  Typography,
  Input,
  Checkbox,
  Button,
  Callout,
} from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";

import { SiteApi } from "apis/site";
import Line from "components/Common/utils/Line";

const General = () => {
  const [siteName, setSiteName] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHasAlphabet, setPasswordHasAlphabet] = useState(false);
  const [passwordHasDigit, setPasswordHasDigit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const fetchSiteDetails = async () => {
    const response = await SiteApi.show();
    setSiteName(response.data.site);
  };

  const checkForAlphabetInPassword = () => {
    const alphabets = "abcedfghijklmnopqrstuvwxyz".split("");
    setPasswordHasAlphabet(
      passwordInput.split("").some(element => alphabets.includes(element))
    );
  };

  const checkForDigitInPassword = () => {
    const digits = "0123456789".split("");
    setPasswordHasDigit(
      passwordInput.split("").some(element => digits.includes(element))
    );
  };

  const handleClick = async () => {
    if (siteName === "") {
      setErrorMessage("Site name can't be blank");
    } else if (showPassword && !passwordInput.length > 6) {
      setErrorMessage("Password should have minimum 6 charecters");
    } else if (showPassword && !passwordHasAlphabet) {
      setErrorMessage("Password must have atleast 1 alphabet");
    } else if (showPassword && !passwordHasDigit) {
      setErrorMessage("Password should have atleast 1 digit");
    } else {
      setErrorMessage("");
      const payload = {
        site: { name: siteName, password: showPassword ? passwordInput : null },
      };
      await SiteApi.update(payload);
    }
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  useEffect(() => {
    checkForAlphabetInPassword();
    checkForDigitInPassword();
  }, [passwordInput]);

  return (
    <div className="w-full">
      {errorMessage !== "" ? (
        <Callout style="warning" icon={Warning} className="mb-3">
          {errorMessage}
        </Callout>
      ) : null}
      <div className="w-full flex justify-center">
        <div className="w-400 mr-20">
          <Typography style="h2">General Settings</Typography>
          <Typography style="body2">
            Configure general attributes of scribble
          </Typography>
          <Input
            label="Site Name"
            className="mt-8 w-full"
            value={siteName}
            onChange={e => setSiteName(e.target.value)}
          />
          <Typography className="text-gray-600 text-xs mb-4">
            Customize the site name which is used to show the site name in{" "}
            <br />
            <b>Open Graph Tags</b>
          </Typography>
          <Line />
          <Checkbox
            checked={showPassword}
            id="checkbox_name"
            label={<b>Password Protect Knowledge Base</b>}
            onChange={() => setShowPassword(prev => !prev)}
            className="my-4"
            style={{
              color: "#6366F1",
              borderRadius: "5px",
            }}
          />
          {showPassword ? (
            <div>
              <Input
                label="Password"
                type="password"
                className="w-7/12 mb-3"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={e => {
                  setPasswordInput(e.target.value);
                }}
              />
              <div className="flex">
                {passwordInput.length >= 6 ? (
                  <Check size={16} color="#289769" />
                ) : (
                  <Close size={16} color="#cd5c5c" />
                )}
                <Typography className="text-xs font-light ml-2">
                  Have at least 6 charecters
                </Typography>
              </div>
              <div className="flex">
                {passwordHasAlphabet && passwordHasDigit ? (
                  <Check size={16} color="#289769" />
                ) : (
                  <Close size={16} color="#cd5c5c" />
                )}
                <Typography className="text-xs font-light ml-2">
                  Have atleast 1 charecter and 1 digit
                </Typography>
              </div>
            </div>
          ) : null}
          <div className="flex mt-8">
            <Button
              label="Save Changes"
              className="bg-bb-purple rounded-sm mr-2"
              onClick={handleClick}
            />
            <Button
              style="text"
              label="Cancel"
              onClick={() => history.push("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
