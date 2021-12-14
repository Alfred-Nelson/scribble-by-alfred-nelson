import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import Line from "components/Common/utils/Line";

import { getFromLocalStorage } from "../../helpers/Storage";

const PublicNav = ({ children }) => {
  const siteName = getFromLocalStorage("site");
  return (
    <div className="w-full fixed">
      <div className="w-full sticky flex justify-center py-3">
        <Typography style="body1" className="font-bold">
          {siteName}
        </Typography>
      </div>
      <Line />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default PublicNav;
