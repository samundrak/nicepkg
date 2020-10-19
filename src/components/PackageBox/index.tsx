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
  value?: {
    [key: string]: string | number;
  }[];
  dataKeys?: { key: string; colorCode: string }[];
}
const PackageBox = (props: IProps) => {
  const [data, setData] = React.useState<
    {
      [key: string]: string | number;
    }[]
  >([]);
  React.useEffect(() => {
    console.log(props.value);
    setData(props.value || []);
  }, [props.value]);

  return (
    <div className="flex flex-col w-4/12 text-white ml-1 mt-5">
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
            {(props.dataKeys || []).map((item) => (
              <Bar dataKey={item.key} fill={item.colorCode} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PackageBox;
