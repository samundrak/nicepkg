import React, { useContext } from "react";
import "./css/app.css";
import SearchBox, { IMiniPackageInfo } from "./components/SearchBox";
import { PackageContext } from "./providers/PackageProvider";
import PackageBox, { Charts } from "./components/PackageBox";
import { PACKAGE_INFO } from "./consts/api";
import { IPackage } from "./interfaces/IPackage";
import {
  addPackage,
  deletePackage,
} from "./providers/PackageProvider/action-creator";

function App() {
  const packageState = useContext(PackageContext);

  const handlePackageAddition = React.useCallback(
    async (packageInfo: IMiniPackageInfo) => {
      const data = (await fetch(
        `${PACKAGE_INFO}${packageInfo.name}`
      ).then((response) => response.json())) as { collected: IPackage };
      packageState.dispatch?.(addPackage(data.collected));
    },
    [packageState.dispatch]
  );

  const handlePackageDeletion = React.useCallback(
    (packageId: string) => {
      packageState.dispatch?.(deletePackage(packageId));
    },
    [packageState.dispatch]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-700 justify-start h-auto items-center">
      <div className="min-w-full p-12 ">
        <SearchBox
          onAdd={handlePackageAddition}
          onDelete={handlePackageDeletion}
        />
      </div>
      <div className="min-w-full p-1 flex flex-wrap items-center justify-center">
        <PackageBox
          title="Downloads"
          chart={Charts.BAR_CHART}
          value={packageState.state.packages.map((item) => ({
            name: item.metadata.name,
            downloads: item.npm.downloads[item.npm.downloads.length - 1].count,
          }))}
          dataKeys={[
            {
              colorCode: "#003c46",
              key: "downloads",
            },
          ]}
        />
        <PackageBox
          chart={Charts.BAR_CHART}
          title="Popularity"
          value={packageState.state.packages.map((packageInfo) => ({
            name: packageInfo.metadata.name,
            stars: packageInfo.github?.starsCount || 0,
          }))}
          dataKeys={[
            {
              colorCode: "#13719b",
              key: "stars",
            },
          ]}
        />
        <PackageBox
          chart={Charts.LINE_CHART}
          title="Issues (Open)"
          value={packageState.state.packages.map((packageInfo) => ({
            name: packageInfo.metadata.name,
            openIssues: packageInfo.github?.issues?.openCount + "" || 0,
            totalIssues: packageInfo.github?.issues?.count + "" || 0,
          }))}
          dataKeys={[
            {
              colorCode: "#003c46",
              key: "openIssues",
            },
            {
              colorCode: "#3994e0",
              key: "totalIssues",
            },
          ]}
        />
        <PackageBox
          chart={Charts.BAR_CHART}
          title="Contributors"
          value={packageState.state.packages.map((packageInfo) => ({
            name: packageInfo.metadata.name,
            contributors: packageInfo.github?.contributors?.length || 0,
          }))}
          dataKeys={[
            {
              colorCode: "#3994e0",
              key: "contributors",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
