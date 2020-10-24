import React from "react";

interface IProps {
  message?: string;
  isSpinning?: boolean;
}

const Loading: React.FC<IProps> = (props) => {
  return (
    <div>
      {props.children}
      {props.isSpinning && (
        <>
          <div className=" bg-white min-h-screen w-screen fixed opacity-50"></div>
          <div className="fixed  z-50 h-screen w-screen">
            <div className=" flex  w-full h-full justify-center items-center">
              <div className="">
                <img src="loading.gif" alt="loading" />
                {props.isSpinning ? props.message || "Loading..." : ""}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Loading;
