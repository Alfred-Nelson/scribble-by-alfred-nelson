import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

import { CategoriesApi } from "../../../apis/categories";

const AddCategoryInput = ({
  isAddCategoryCollapsed,
  setIsAddCategoryCollapsed,
  fetchCategoryDetails,
}) => {
  const [categoryInputValue, setCategoryInputValue] = useState("");

  const handleClick = async () => {
    if (categoryInputValue !== "") {
      await CategoriesApi.create({ category: { value: categoryInputValue } });
      setIsAddCategoryCollapsed(true);
      fetchCategoryDetails();
      setCategoryInputValue("");
    } else {
      setIsAddCategoryCollapsed(true);
    }
  };

  return (
    <div className="mb-4">
      {isAddCategoryCollapsed ? null : (
        <Input
          placeholder="Enter new category"
          value={categoryInputValue}
          onChange={e => setCategoryInputValue(e.target.value)}
          suffix={
            <Check
              color="black"
              className="cursor-pointer"
              onClick={handleClick}
            />
          }
        />
      )}
    </div>
  );
};

export default AddCategoryInput;
