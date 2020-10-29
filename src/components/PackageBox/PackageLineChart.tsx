import React from "react";
//@ts-ignore
import startCase from "lodash.startcase";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { convertToHumanReadableNumbers } from "../../utils";

interface IProps {
  data: {}[];
  dataKeys: {
    key: string;
    colorCode: string;
  }[];
}
const PackageLineChart: React.FC<IProps> = (props) => {
  return (
    <ResponsiveContainer width={"99%"} height={250}>
      <LineChart
        data={props.data || []}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={convertToHumanReadableNumbers} />
        <Tooltip
          //@ts-ignore
          formatter={(
            value: number,
            name: string,
            options: {
              payload: {
                name: string;
              };
            }
          ) => {
            return ` ${convertToHumanReadableNumbers(value)} (${
              options.payload.name
            })`;
          }}
        />
        <Legend wrapperStyle={{ color: "gray" }} />
        {(props.dataKeys || []).map((item) => (
          <Line
            key={item.key}
            type="monotone"
            dataKey={item.key}
            stroke={item.colorCode}
            name={startCase(item.key)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default PackageLineChart;
