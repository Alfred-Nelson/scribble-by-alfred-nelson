import React, { useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Input, Button, Dropdown, Checkbox } from "@bigbinary/neetoui/v2";
import { useAsyncDebounce } from "react-table";

const ArticleFilterBar = ({ handleClick, tableInstance }) => {
  const { globalFilter, setGlobalFilter, allColumns } = tableInstance;
  const [filteredValue, setFilteredValue] = useState(globalFilter);

  const handleChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="w-full flex justify-end pt-4">
      <div>
        <Input
          placeholder="Search"
          prefix={<Search />}
          value={filteredValue || ""}
          onChange={e => {
            setFilteredValue(e.target.value);
            handleChange(e.target.value);
          }}
        />
      </div>
      <div className="ml-4">
        <Dropdown
          closeOnOutsideClick
          closeOnSelect={false}
          buttonStyle="secondary"
          buttonProps={{
            size: "large",
          }}
          label="Columns"
          position="bottom-end"
        >
          {allColumns.slice(0, allColumns.length - 1).map(column => (
            <li key={column}>
              <Checkbox
                {...column.getToggleHiddenProps()}
                label={column.Header}
                buttonProps={{
                  size: "large",
                }}
                style={{
                  color: "#6366F1",
                  borderRadius: "5px",
                }}
              />
            </li>
          ))}
        </Dropdown>
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
  );
};

export default ArticleFilterBar;
