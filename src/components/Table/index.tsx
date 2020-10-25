import React from "react";
import DataTable from "react-data-table-component";
import columns from "./columns";

const data = [{ id: 1, title: "Conan the Barbarian", year: "1982" }];

interface IProps {
  data?: {
    downloads: number;
    contributions: number;
    issues: string;
    stars: number;
  }[];
}
const Table: React.FC<IProps> = (props) => {
  return (
    <div>
      <DataTable
        title="More about packages"
        style={{ width: "60vw" }}
        columns={columns}
        data={props.data || []}
      />
    </div>
  );
};
export default Table;
