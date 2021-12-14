import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { NavLink, Link } from "react-router-dom";

import Line from "components/Common/utils/Line";

const Container = ({ children }) => {
  return (
    <div className="w-full fixed">
      <div className="py-5 flex justify-between mx-4">
        <div className="flex ">
          <Link to="/">
            <Typography style="body1" className="font-bold">
              Scribble
            </Typography>
          </Link>
          <NavLink
            exact
            to="/"
            className={isActive =>
              isActive ? "text-indigo-600" : "text-black"
            }
          >
            <Typography style="body1" className="ml-5 hover:text-bb-purple">
              Articles
            </Typography>
          </NavLink>
          <NavLink
            to="/settings"
            className={isActive =>
              isActive ? "text-indigo-600" : "text-black"
            }
          >
            <Typography style="body1" className="ml-5 hover:text-bb-purple">
              Settings
            </Typography>
          </NavLink>
        </div>
        <Button
          style="secondary"
          label="Preview"
          icon={ExternalLink}
          onClick={() => window.open("/public", "_blank")}
        />
      </div>
      <Line />
      <div className="mr-5">{children}</div>
    </div>
  );
};

export default Container;
