import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const Table = ({ tableInstance }) => {
  const [rowsToZero, setRowsToZero] = useState(false);
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    tableInstance;

  const fadedColumn = ["AUTHOR", "CATEGORY", "STATUS"];

  useEffect(() => {
    if (headerGroups[0].headers.length === 1) {
      setRowsToZero(true);
    } else {
      setRowsToZero(false);
    }
  }, [headerGroups]);

  return (
    <div className="w-full">
      <div className="ml-5 mt-10">
        <Typography style="body2" weight="bold">
          {rowsToZero ? 0 : rows.length} Articles
        </Typography>
        <table {...getTableProps()} className="w-full mt-5">
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => {
              return (
                <tr
                  key={headerGroupIndex}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column, headerIndex) => {
                    return (
                      <th
                        key={headerIndex}
                        {...column.getHeaderProps()}
                        className="text-left text-gray-500 pb-4 text-xs"
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  key={rowIndex}
                  {...row.getRowProps()}
                  className="even:bg-gray-100"
                >
                  {row.cells
                    .slice(0, row.cells.length - 1)
                    .map(cell => cell.isVisible)
                    .filter(value => !value).length > 0 &&
                    row.cells.map((cell, cellIndex) => {
                      return (
                        <td
                          key={cellIndex}
                          {...cell.getCellProps()}
                          className={`py-3`}
                        >
                          <p
                            className={
                              fadedColumn.includes(cell.column.Header)
                                ? `text-gray-600`
                                : cell.column.Header === "TITLE"
                                ? "text-indigo-600"
                                : null
                            }
                          >
                            {cell.column.id !== "date" ||
                            row.original.status !== "Draft"
                              ? cell.render("Cell")
                              : "-"}
                          </p>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
