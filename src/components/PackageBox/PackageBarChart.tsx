import React from "react";
import millify from "millify";
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
        <YAxis tickFormatter={(value) => millify(value)} />
        <Tooltip
          //@ts-ignore
          formatter={(value: number, name: string) => {
            return millify(value);
          }}
        />
        <Legend wrapperStyle={{ color: "gray" }} />
        {(props.dataKeys || []).map((item) => (
          <Bar
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
