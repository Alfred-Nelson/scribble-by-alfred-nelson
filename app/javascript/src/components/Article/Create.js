import React, { useState } from "react";

import {
  Input,
  Button,
  Select,
  Textarea,
  Dropdown,
} from "@bigbinary/neetoui/v2";

const Create = () => {
  const [saveAsPublished, setSaveAsPublished] = useState(false);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-7/12">
        <div className="flex justify-between">
          <Input label="Article title" size="large" className="mr-3" />
          <Select label="Category" />
        </div>
        <Textarea label="Article Body" rows={10} className="my-5" />
        <div className="flex">
          <Button
            label={saveAsPublished ? "Save Published" : "Save Draft"}
            size="large"
            className="bg-bb-purple rounded-l-md"
          />
          <div className="border-l border-white">
            <Dropdown
              buttonProps={{
                size: "large",
                className: "bg-bb-purple rounded-r-md",
              }}
            >
              <li onClick={() => setSaveAsPublished(false)}>Save Draft</li>
              <li onClick={() => setSaveAsPublished(true)}>Save Published</li>
            </Dropdown>
          </div>
          <Button label="Cancel" style="text" size="large" className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Create;
