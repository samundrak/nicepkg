import React from "react";
import millify from "millify";
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
        <YAxis tickFormatter={(value) => millify(value)} />
        <Tooltip
          //@ts-ignore
          formatter={(value: number, name: string) => {
            return millify(value);
          }}
        />
        <Legend wrapperStyle={{ color: "gray" }} />
        {(props.dataKeys || []).map((item) => (
          <Line
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
