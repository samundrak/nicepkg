import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
//@ts-ignore
import startCase from "lodash.startcase";
import { convertToHumanReadableNumbers } from "../../utils";

interface IProps {
  data: {}[];
  dataKeys: {
    key: string;
    colorCode: string;
  }[];
}
const PackageBarChart: React.FC<IProps> = (props) => {
  return (
    <ResponsiveContainer width={"99%"} height={250}>
      <BarChart data={props.data}>
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
          <Bar
            key={item.key}
            name={startCase(item.key)}
            dataKey={item.key}
            fill={item.colorCode}
            background={false}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
export default PackageBarChart;
