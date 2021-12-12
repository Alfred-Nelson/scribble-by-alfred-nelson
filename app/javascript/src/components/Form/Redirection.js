import React, { useState } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";

import { RedirectionApi } from "apis/redirection";

const Redirection = ({
  id = null,
  editFromInput = null,
  editToInput = null,
  setEditFromInput = () => {},
  setEditToInput = () => {},
  setEditInput,
  setShowRedirectionInput = () => {},
  fetchDetails = () => {},
}) => {
  const [fromInput] = useState(editFromInput);
  const [toInput] = useState(editToInput);

  const handleEditCall = async () => {
    const newFromInput =
      editFromInput[0] !== "/" ? "/" + editFromInput : editFromInput;
    const newToInput = editToInput[0] !== "/" ? "/" + editToInput : editToInput;
    await RedirectionApi.update(id, {
      redirection: { from: newFromInput, to: newToInput },
    });
    fetchDetails();
  };

  const handleCreateCall = async () => {
    const newFromInput =
      editFromInput[0] !== "/" ? "/" + editFromInput : editFromInput;
    const newToInput = editToInput[0] !== "/" ? "/" + editToInput : editToInput;
    await RedirectionApi.create({
      redirection: { from: newFromInput, to: newToInput },
    });
    fetchDetails();
  };

  const handleClick = () => {
    if (editFromInput !== fromInput || toInput !== editToInput) {
      if (id) {
        handleEditCall();
      } else {
        handleCreateCall();
      }
    }
    setEditInput(null);
    setShowRedirectionInput(false);
    setEditFromInput(null);
    setEditToInput(null);
  };

  return (
    <>
      <td className="p-2">
        <Input
          value={editFromInput || "/"}
          onChange={e => setEditFromInput(e.target.value)}
        />
      </td>
      <td className="p-2">
        <Input
          value={editToInput || "/"}
          onChange={e => setEditToInput(e.target.value)}
        />
      </td>
      <td className="pr-6 xl:pr-20">
        <div className="flex justify-end items-center">
          <Check className="cursor-pointer" onClick={handleClick} />
        </div>
      </td>
    </>
  );
};

export default Redirection;
