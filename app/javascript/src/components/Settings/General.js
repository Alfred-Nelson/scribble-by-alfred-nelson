import React from "react";

import { Typography, Input, Checkbox, Button } from "@bigbinary/neetoui/v2";

import Line from "components/Common/utils/Line";

const General = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-400 mr-20">
        <Typography style="h2">General Settings</Typography>
        <Typography style="body2">
          Configure general attributes of scribble
        </Typography>
        <Input label="Site Name" className="mt-8 w-full" />
        <Typography className="text-gray-600 text-xs mb-4">
          Customize the site name which is used to show the site name in <br />
          <b>Open Graph Tags</b>
        </Typography>
        <Line />
        <Checkbox
          checked
          id="checkbox_name"
          label={<b>Password Protect Knowledge Base</b>}
          className="my-4"
          style={{
            color: "#6366F1",
            borderRadius: "5px",
          }}
        />
        <div className="flex mt-8">
          <Button
            label="Save Changes"
            className="bg-bb-purple rounded-sm mr-2"
          />
          <Button style="text" label="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default General;
