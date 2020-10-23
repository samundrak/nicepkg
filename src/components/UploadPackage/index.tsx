import React, { SyntheticEvent } from "react";

const UploadPackage = () => {
  const handleFileChange = React.useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      console.log(event);
    },
    []
  );
  return <input type="file" onChange={handleFileChange} />;
};
export default UploadPackage;
