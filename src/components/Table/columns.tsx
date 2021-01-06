import React from "react";
import { convertToHumanReadableNumbers } from "../../utils";
import { ITableData } from "../../interfaces/ITableData";

export default [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    cell: (row: ITableData) => (
      // eslint-disable-next-line react/jsx-no-target-blank
      <>
        henlo
        <a target="_blank" href={`https://www.npmjs.com/package/${row.name}`}>
          {row.name}
        </a>
      </>
    ),
  },
  {
    name: "Stars",
    selector: "stars",
    cell: (row: ITableData) => convertToHumanReadableNumbers(row.stars),
    sortable: true,
  },

  {
    name: "Contributions",
    selector: "contributions",
    cell: (row: ITableData) => convertToHumanReadableNumbers(row.contributions),
    sortable: true,
  },
  {
    name: "Issues (open/closed)",
    selector: "issues",
    cell: (row: ITableData) =>
      `${convertToHumanReadableNumbers(
        row.issuesOpen
      )}/${convertToHumanReadableNumbers(row.issues)}`,
  },
  {
    name: "Downloads (Weekly)",
    selector: "downloads",
    cell: (row: ITableData) => convertToHumanReadableNumbers(row.downloads),
    sortable: true,
  },
];
