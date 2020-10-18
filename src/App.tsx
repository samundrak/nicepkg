import React, { useContext } from "react";
import "./css/app.css";
import SearchBox, { IMiniPackageInfo } from "./components/SearchBox";
import { PackageContext } from "./providers/PackageProvider";
import PackageBox from "./components/PackageBox";
import { PACKAGE_INFO } from "./consts/api";
import { IPackage } from "./interfaces/IPackage";
import { addPackage } from "./providers/PackageProvider/action-creator";

function App() {
  const packageState = useContext(PackageContext);

  const handlePackageAddition = React.useCallback(
    async (packageInfo: IMiniPackageInfo) => {
      const data = (await fetch(
        `${PACKAGE_INFO}${packageInfo.name}`
      ).then((response) => response.json())) as { collected: IPackage };
      packageState.dispatch?.(addPackage(data.collected));
    },
    []
  );
  return (
    <div className="min-h-screen flex flex-col bg-gray-700 justify-start h-auto items-center">
      <div className="min-w-full p-12 ">
        <SearchBox onAdd={handlePackageAddition} />
      </div>
      <div className="min-w-full p-1 flex justify-center flex-wrap">
        <PackageBox title="Downloads" />
        <PackageBox title="Popularity" />
        <PackageBox title="Size" />
        <PackageBox title="Size" />
      </div>
    </div>
  );
}

export default App;
