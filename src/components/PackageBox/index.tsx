import React from "react";
import PackageLineChart from "./PackageLineChart";
import PackageBarChart from "./PackageBarChart";

export enum Charts {
  LINE_CHART,
  BAR_CHART,
}
interface IProps {
  title: string;
  value?: {
    [key: string]: string | number;
  }[];
  dataKeys?: { key: string; colorCode: string }[];
  chart: Charts;
}
const PackageBox = (props: IProps) => {
  const [data, setData] = React.useState<
    {
      [key: string]: string | number;
    }[]
  >([]);
  React.useEffect(() => {
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
        {props.chart === Charts.BAR_CHART ? (
          <PackageBarChart data={data} dataKeys={props.dataKeys || []} />
        ) : null}
        {props.chart === Charts.LINE_CHART ? (
          <PackageLineChart data={data} dataKeys={props.dataKeys || []} />
        ) : null}
      </div>
    </div>
  );
};
export default PackageBox;
