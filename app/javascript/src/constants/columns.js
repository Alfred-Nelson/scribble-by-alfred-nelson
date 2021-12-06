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
    Cell: ({ value }) => {
      return format(new Date(value), "MMMM dd, yyyy");
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
  },
  {
    id: "status",
    Header: "STATUS",
    accessor: "status",
  },
];
