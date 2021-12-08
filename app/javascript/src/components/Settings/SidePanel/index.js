import React from "react";

import { Settings, Repeat, Seo } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { NavLink } from "react-router-dom";

const SidePanel = ({ children }) => {
  return (
    <div className="flex ">
      <aside className="mr-4 w-full h-screen sticky max-w-sm border-r-2 border-gray-300 ">
        <div className="ml-4 mr-4">
          <div className="mr-4 mt-10 w-full flex flex-col items-center">
            <NavLink
              to="/settings/general"
              className={isActive =>
                isActive ? "bg-nitro-indigo w-full mb-4" : "w-full mb-4"
              }
            >
              <div className=" flex w-11/12 ml-1 mr-1 p-3">
                <div className="flex items-center">
                  <Settings />
                </div>
                <div className="w-full ml-3">
                  <Typography style="body1" className="font-bold">
                    General
                  </Typography>
                  <Typography style="body3">
                    Page Title, Brand Name & Meta Description
                  </Typography>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/settings/redirection"
              className={isActive =>
                isActive ? "bg-nitro-indigo w-full mb-4" : "w-full mb-4"
              }
            >
              <div className="flex w-11/12 ml-1 mr-1 p-3">
                <div className="flex items-center">
                  <Repeat />
                </div>
                <div className="w-full ml-3">
                  <Typography style="body1" className="font-bold">
                    Redirections
                  </Typography>
                  <Typography style="body3">
                    Create & configure redirection rules
                  </Typography>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/settings/manage-category"
              className={isActive =>
                isActive ? "bg-nitro-indigo w-full mb-4" : "w-full mb-4"
              }
            >
              <div className="flex w-11/12 ml-1 mr-1 p-3">
                <div className="flex items-center">
                  <Seo />
                </div>
                <div className="w-full ml-3">
                  <Typography style="body1" className="font-bold">
                    Manage Categories
                  </Typography>
                  <Typography style="body3">
                    Edit & Reorder KB structure
                  </Typography>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </aside>
      <main className="w-full mt-6">{children}</main>
    </div>
  );
};

export default SidePanel;
