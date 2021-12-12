import React, { useState, useEffect, useMemo, useRef } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import { RedirectionApi } from "apis/redirection";
import redirectionColumn from "components/Common/redirectionColumn";
import Table from "components/Table";

const Redirection = () => {
  const [showAddRedirectionInput, setShowRedirectionInput] = useState(false);
  const [redirectionData, setRedirectionData] = useState([]);
  const [editInput, setEditInput] = useState(null);
  const [editFromInput, setEditFromInput] = useState("");
  const [editToInput, setEditToInput] = useState("");
  const [deleteRow, setDeleteRow] = useState(null);
  const redirectColumn = redirectionColumn(
    setEditInput,
    setEditFromInput,
    setEditToInput,
    setDeleteRow
  );
  const columns = useMemo(
    () => redirectColumn,
    [editInput, editFromInput, editToInput]
  );
  const data = useMemo(() => redirectionData, [redirectionData]);
  const tableElement = useRef();

  const fetchDetails = async () => {
    const response = await RedirectionApi.list();
    setRedirectionData(response.data.redirections);
  };

  const handleDelete = async id => {
    const result = confirm("Are you sure you want to delete the redirection");
    if (result) {
      await RedirectionApi.destroy(id);
      const newRedirectionData = redirectionData.filter(data => data.id !== id);
      setRedirectionData(newRedirectionData);
    }
  };

  const tableInstance = useTable({ columns, data });

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    if (showAddRedirectionInput) {
      const domNode = tableElement.current;
      if (domNode) {
        domNode.scrollTop = domNode.scrollHeight;
      }
    }
  }, [showAddRedirectionInput]);

  useEffect(() => {
    if (deleteRow) {
      handleDelete(deleteRow);
    }
  }, [deleteRow]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-400 mr-10 xl:w-720">
        <Typography style="h2">Redirections</Typography>
        <Typography style="body2" className="text-gray-600 mt-1 mb-5">
          Create and configure redirection rules to send users from old links to
          new links. All the redirections are performed with 301 status code to
          be SEO friendly
        </Typography>
        <div className="p-2 w-full bg-nitro-indigo">
          <div>
            <Table
              tableInstance={tableInstance}
              check={false}
              editInput={editInput}
              editFromInput={editFromInput}
              editToInput={editToInput}
              showAddRedirectionInput={showAddRedirectionInput}
              tableElement={tableElement}
              setShowRedirectionInput={setShowRedirectionInput}
              setEditInput={setEditInput}
              setEditFromInput={setEditFromInput}
              setEditToInput={setEditToInput}
              fetchDetails={fetchDetails}
            />
          </div>
          <>
            <Typography
              className="flex w-5/12 mt-5 ml-5 mb-5 text-indigo-600 cursor-pointer"
              style="body2"
              onClick={() => {
                setShowRedirectionInput(prev => !prev);
              }}
            >
              <Plus size={20} /> Add New Redirection
            </Typography>
          </>
        </div>
      </div>
    </div>
  );
};

export default Redirection;
