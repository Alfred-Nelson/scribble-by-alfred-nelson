import React from "react";

const TableData = ({ row }) => {
  const fadedColumn = ["AUTHOR", "CATEGORY", "STATUS"];
  return (
    <>
      {row.cells
        .slice(0, row.cells.length - 1)
        .map(cell => cell.isVisible)
        .filter(value => !value).length > 0 &&
        row.cells.map((cell, cellIndex) => {
          return (
            <td key={cellIndex} {...cell.getCellProps()} className={`py-3`}>
              <p
                className={
                  fadedColumn.includes(cell.column.Header)
                    ? `text-gray-600`
                    : cell.column.Header === "TITLE"
                    ? "text-indigo-600"
                    : null
                }
              >
                {cell.render("Cell")}
              </p>
            </td>
          );
        })}
    </>
  );
};

export default TableData;
