import React, { useContext } from "react";
import "./css/app.css";
import SearchBox, { IMiniPackageInfo } from "./components/SearchBox";
import { PackageContext } from "./providers/PackageProvider";
import PackageBox, { Charts } from "./components/PackageBox";
import { getPackageInformation } from "./consts/api";
import {
  addPackage,
  deletePackage,
  addPackages,
} from "./providers/PackageProvider/action-creator";
import { ReactComponent as ILEmpty } from "./assets/svg/il-empty.svg";
import UploadPackage from "./components/UploadPackage";
import { IDependency } from "./interfaces/IDependency";

function App() {
  const packageState = useContext(PackageContext);

  const handlePackageAddition = React.useCallback(
    async (packageInfo: IMiniPackageInfo) => {
      const data = await getPackageInformation([packageInfo.name]);
      if (
        data[packageInfo.name].code === "NOT_FOUND" ||
        data[packageInfo.name].code === "INTERNAL"
      ) {
        alert("Unable to get package information.");
        throw new Error("Unable to find");
      }
      packageState.dispatch?.(addPackage(data[packageInfo.name].collected));
    },
    [packageState.dispatch]
  );

  const handlePackageDeletion = React.useCallback(
    (packageId: string) => {
      packageState.dispatch?.(deletePackage(packageId));
    },
    [packageState.dispatch]
  );
  const handleOnPackageJsonScan = React.useCallback(
    async (dependencis: IDependency[]) => {
      const data = await getPackageInformation(Object.keys(dependencis));
      packageState.dispatch?.(
        addPackages(Object.values(data).map((item) => item.collected))
      );
    },
    [packageState.dispatch]
  );

  return (
    <>
      <div
        className="
          absolute bg-white"
      >
        <img
          src="./logo.png"
          className="
          
          w-20
          h-20
        "
          alt="Nice Package logo"
        />
      </div>
      <div className="heroBG min-h-screen flex flex-col bg-gray-700 justify-center items-center">
        <div className="min-w-full p-6 ">
          <SearchBox
            onAdd={handlePackageAddition}
            onDelete={handlePackageDeletion}
            packages={packageState.state.packages}
          />
        </div>
        <UploadPackage onScan={handleOnPackageJsonScan} />
        <div className="min-w-full p-1 flex flex-wrap items-center justify-center">
          {!packageState.state.packages.length ? (
            <ILEmpty className="w-6/12 h-auto opacity-75 rounded-full" />
          ) : (
            //
            <React.Fragment>
              <PackageBox
                title="Downloads"
                chart={Charts.BAR_CHART}
                value={packageState.state.packages.map((item) => ({
                  name: item?.metadata?.name,
                  downloads:
                    item?.npm.downloads[item.npm.downloads.length - 1].count,
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
                  name: packageInfo?.metadata.name,
                  stars: packageInfo?.github?.starsCount || 0,
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
                  name: packageInfo?.metadata.name,
                  openIssues: packageInfo?.github?.issues?.openCount + "" || 0,
                  totalIssues: packageInfo?.github?.issues?.count + "" || 0,
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
                  name: packageInfo?.metadata.name,
                  contributors: packageInfo?.github?.contributors?.length || 0,
                }))}
                dataKeys={[
                  {
                    colorCode: "#3994e0",
                    key: "contributors",
                  },
                ]}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
