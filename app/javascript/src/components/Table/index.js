import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";

import TableData from "components/Dashboard/TableData";
import Redirection from "components/Form/Redirection";
import RedirectionTableData from "components/Settings/Redirection/RedirectionTableData";

const Table = ({
  tableInstance,
  check = true,
  editInput = null,
  editFromInput = null,
  editToInput = null,
  showAddRedirectionInput = null,
  tableElement = null,
  setShowRedirectionInput = () => {},
  setEditFromInput = () => {},
  setEditToInput = () => {},
  setEditInput = () => {},
  fetchDetails = () => {},
}) => {
  const [rowsToZero, setRowsToZero] = useState(false);
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    tableInstance;
  const topStyle = check ? "w-full" : "h-100";
  const mainStyle = check
    ? "ml-5 mt-10 h-550 overflow-y-scroll"
    : "ml-4 mr-4 max-h-400 overflow-y-scroll mt-5";
  const tableStyle = check
    ? "w-full mt-5 table-fixed"
    : " w-full mt-5 table-fixed";
  const thStyle = check
    ? "text-left text-gray-500 pb-4 text-xs "
    : "text-left text-gray-500 pb-4 text-xs pl-5";
  const trDataStyle = check
    ? " w-full even:bg-gray-100"
    : "w-full bg-white border-b-8 border-nitro-indigo";

  useEffect(() => {
    if (headerGroups[0].headers.length === 1) {
      setRowsToZero(true);
    } else {
      setRowsToZero(false);
    }
  }, [headerGroups]);

  return (
    <div className={topStyle}>
      <div ref={tableElement} className={mainStyle}>
        {check ? (
          <Typography style="body2" weight="bold">
            {rowsToZero ? 0 : rows.length} Articles
          </Typography>
        ) : null}
        <table {...getTableProps()} className={tableStyle}>
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
                        className={thStyle}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()} className="w-full pl-5">
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  key={rowIndex}
                  {...row.getRowProps()}
                  className={trDataStyle}
                >
                  {check ? (
                    <TableData row={row} />
                  ) : (
                    <RedirectionTableData
                      row={row}
                      editInput={editInput}
                      editFromInput={editFromInput}
                      editToInput={editToInput}
                      setEditInput={setEditInput}
                      setEditFromInput={setEditFromInput}
                      setEditToInput={setEditToInput}
                      fetchDetails={fetchDetails}
                    />
                  )}
                </tr>
              );
            })}
            <tr className={trDataStyle}>
              {showAddRedirectionInput && (
                <Redirection
                  editFromInput={editFromInput}
                  editToInput={editToInput}
                  showAddRedirectionInput={showAddRedirectionInput}
                  setShowRedirectionInput={setShowRedirectionInput}
                  setEditInput={setEditInput}
                  setEditFromInput={setEditFromInput}
                  setEditToInput={setEditToInput}
                  fetchDetails={fetchDetails}
                />
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
