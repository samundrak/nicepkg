import React from "react";
import { IDependency } from "../../interfaces/IDependency";

interface IProps {
  onScan: (dependencies: IDependency[]) => void;
}
const UploadPackage: React.FC<IProps> = (props) => {
  const fileBtnRef = React.useRef<HTMLInputElement>(null);
  const handleFileChange = React.useCallback(
    (event) => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        //@ts-ignore
        fetch(e.target?.result)
          //@ts-ignore
          .then((response) => response.json())
          .then((packagejson: { dependencies: IDependency[] }) => {
            props.onScan(packagejson.dependencies);
          })
          .catch((err: Error) => alert(err.message));
      };
      fileReader.readAsDataURL(file);
    },
    [props]
  );

  return (
    <React.Fragment>
      <button
        onClick={() => {
          fileBtnRef.current?.click();
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        SCAN YOUR "package.json"
      </button>
      <input
        ref={fileBtnRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
    </React.Fragment>
  );
};
export default UploadPackage;
