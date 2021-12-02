import React from "react";

import { Search, Down, Plus } from "@bigbinary/neeto-icons";
import { Input, Button } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router";

import SidePane from "./SidePane";

const Dashboard = () => {
  const history = useHistory();

  const handleClick = () => history.push("/article/new");

  return (
    <div className="flex">
      <SidePane />
      <div className="w-full flex justify-end pt-4">
        <div>
          <Input placeholder="Search" prefix={<Search />} />
        </div>
        <div className="ml-4">
          <Button label="Columns" icon={Down} size="large" style="secondary" />
        </div>
        <div className="ml-4">
          <Button
            label="Add New Article"
            icon={Plus}
            size="large"
            className="bg-bb-purple"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
