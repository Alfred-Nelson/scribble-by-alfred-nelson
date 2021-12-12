import React from "react";

import Redirection from "components/Form/Redirection";

const RedirectionTableData = ({
  row,
  editInput,
  editFromInput,
  editToInput,
  setEditFromInput,
  setEditToInput,
  setEditInput,
  fetchDetails,
}) => {
  return (
    <>
      {editInput !== row.original.id ? (
        <>
          {row.cells.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              {...cell.getCellProps()}
              className={`py-3 pl-5`}
            >
              {cell.render("Cell")}
            </td>
          ))}
        </>
      ) : (
        <Redirection
          id={row.original.id}
          setEditInput={setEditInput}
          editInput={editInput}
          editFromInput={editFromInput}
          editToInput={editToInput}
          setEditFromInput={setEditFromInput}
          setEditToInput={setEditToInput}
          fetchDetails={fetchDetails}
        />
      )}
    </>
  );
};

export default RedirectionTableData;
