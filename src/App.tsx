import React from "react";
import "./css/app.css";
import SearchBox from "./components/SearchBox";

function App() {
  return (
    <div className="flex flex-col bg-gray-200 justify-center h-screen items-center">
      <div className="min-w-full p-12 ">
        <SearchBox />
      </div>
      <div className="">packages heres</div>
    </div>
  );
}

export default App;
