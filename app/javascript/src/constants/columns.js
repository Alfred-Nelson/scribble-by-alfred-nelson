import { format } from "date-fns";

export const COLUMNS = [
  {
    id: "title",
    Header: "TITLE",
    accessor: "heading",
  },
  {
    id: "date",
    Header: "DATE",
    accessor: "updated_at",
    Cell: ({ value, row }) => {
      return row.original.status === "Published"
        ? format(new Date(value), "MMMM dd, yyyy")
        : "-";
    },
  },
  {
    id: "author",
    Header: "AUTHOR",
    accessor: "author",
  },
  {
    id: "category",
    Header: "CATEGORY",
    accessor: "category",
    Cell: ({ value }) => {
      return value ? value : "-";
    },
    filter: "equals",
  },
  {
    id: "status",
    Header: "STATUS",
    accessor: "status",
  },
];
