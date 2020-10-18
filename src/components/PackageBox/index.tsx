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

interface IProps {
  title: string;
}
const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  // {
  //   name: "Page C",
  //   uv: 2000,
  // },
  // {
  //   name: "Page D",
  //   uv: 2780,
  // },
  // {
  //   name: "Page E",
  //   uv: 1890,
  // },
  // {
  //   name: "Page F",
  //   uv: 2390,
  // },
  // {
  //   name: "Page G",
  //   uv: 3490,
  // },
];
const PackageBox = (props: IProps) => {
  return (
    <div className="flex flex-col w-4/12   text-white ml-1 mt-5">
      <div className="text-xl font-semibold rounded-t-md bg-gray-900 text-center p-5">
        {props.title}
      </div>
      <div
        className="bg-gray-300 h-auto p-5 rounded-b-md 
      text-center border-gray-900 border-solid border-8"
      >
        <ResponsiveContainer width={"99%"} height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PackageBox;
