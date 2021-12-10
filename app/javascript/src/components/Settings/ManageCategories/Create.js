import React from "react";

import { Check, Plus } from "@bigbinary/neeto-icons";
import { Typography, Input } from "@bigbinary/neetoui/v2";

const Create = ({
  showCreateInput,
  setShowCreateInput,
  categoryInput,
  setCategoryInput,
  handleCreateCategory,
}) => {
  return (
    <div className={`${showCreateInput ? "mt-4" : "mt-6"} mb-3`}>
      {!showCreateInput ? (
        <Typography
          className="flex text-sm text-indigo-600 cursor-pointer"
          onClick={() => setShowCreateInput(prev => !prev)}
        >
          <Plus color="#5a67d8" size={20} /> Add New Category
        </Typography>
      ) : (
        <div>
          <Input
            className="w-7/12"
            placeholder="New Category"
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value)}
            suffix={
              <Check
                size={20}
                className="cursor-pointer"
                onClick={handleCreateCategory}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Create;
