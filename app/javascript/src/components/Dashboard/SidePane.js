import React from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

const SidePane = () => {
  return (
    <MenuBar showMenu={true} title="Articles">
      <MenuBar.Block label="All" count={13} active />
      <MenuBar.Block label="Published" count={2} />
      <MenuBar.Block label="Drafts" count={7} />

      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
          },
          {
            icon: Plus,
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search />
      <MenuBar.Block label="Getting started" count={80} />
    </MenuBar>
  );
};

export default SidePane;
