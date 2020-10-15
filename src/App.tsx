import React, { useContext } from "react";
import "./css/app.css";
import SearchBox from "./components/SearchBox";
import { PackageContext } from "./providers/PackageProvider";

function App() {
  const packageState = useContext(PackageContext);

  return (
    <div className="flex flex-col bg-gray-200 justify-center h-screen items-center">
      <div className="min-w-full p-12 flex-initial">
        <SearchBox />
      </div>
      <div className="flex-auto">
        packages heres
        {packageState.state?.name}
      </div>
    </div>
  );
}

export default App;
