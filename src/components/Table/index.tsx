import React from "react";
import DataTable from "react-data-table-component";
import columns from "./columns";
import { ITableData } from "../../interfaces/ITableData";

interface IProps {
  data?: ITableData[];
}
const Table: React.FC<IProps> = (props) => {
  return (
    <DataTable
      striped
      highlightOnHover
      noHeader
      fixedHeader
      columns={columns}
      data={props.data || []}
      customStyles={{
        headCells: {
          style: {
            color: "white",
            background: "#1d232f",
          },
          activeSortStyle: {
            color: "white",
          },
          inactiveSortStyle: {
            color: "white",
          },
        },
        headRow: {
          style: {
            background: "#1a202c",
            color: "white",
          },
        },
        rows: {
          stripedStyle: {
            background: "#292f3c",
            color: "white",
          },
          style: {
            background: "#1a202c",
            color: "white",
          },
        },
      }}
    />
  );
};
export default Table;
