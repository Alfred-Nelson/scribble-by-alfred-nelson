import React from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";

const redirectionColumn = (
  setEditInput,
  setEditFromInput,
  setEditToInput,
  setDeleteRow
) => {
  const COLUMN = [
    {
      Header: "FROMPATH",
      accessor: "from",
      Cell: ({ value }) => {
        return (
          <div className="w-11/12 overflow-x-scroll whitespace-no-wrap">
            <div className="flex">
              <Typography style="body2" className="text-gray-600">
                {window.location.host}/public
              </Typography>
              <Typography style="body2">{value}</Typography>
            </div>
          </div>
        );
      },
    },
    {
      Header: "TOPATH",
      accessor: "to",
      Cell: ({ value }) => {
        return (
          <div className="w-11/12 overflow-x-scroll whitespace-no-wrap">
            <div className="flex">
              <Typography style="body2" className="text-gray-600">
                {window.location.host}/public
              </Typography>
              <Typography style="body2">{value}</Typography>
            </div>
          </div>
        );
      },
    },
    {
      Header: () => <div className="text-center">ACTION</div>,
      accessor: "[action]",
      Cell: ({ row }) => {
        return (
          <div className="flex justify-center overflow-x-scroll">
            <Edit
              size={20}
              className="mr-5 cursor-pointer"
              onClick={() => {
                setEditFromInput(row.original.from);
                setEditToInput(row.original.to);
                setEditInput(row.original.id);
              }}
            />
            <Delete
              size={18}
              className="cursor-pointer"
              onClick={() => {
                setDeleteRow(row.original.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  return COLUMN;
};

export default redirectionColumn;
