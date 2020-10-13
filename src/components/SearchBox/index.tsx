import React from "react";
import useTagInput from "./useTagInput";

const SearchBox = () => {
  const tagInput = useTagInput({
    shouldBreakOnEnter: true,
  });

  React.useMemo(() => {
    console.log("ref changed", tagInput);
  }, [tagInput]);
  return (
    <React.Fragment>
      <div
        className=" 
      flex flex-col
    justify-center
    items-center
      "
      >
        <div className="flex flex-row">
          {tagInput.tags.map((tag) => (
            <div
              key={tag.id}
              className="
          bg-gray-800 rounded-full mr-1
          text-gray-400
          flex flex-row
          overflow-hidden
          "
            >
              <div className="p-2">{tag.value}</div>
              <div
                onClick={() => tagInput.onDelete(tag.id)}
                className="cursor-pointer p-2 ml-1 bg-gray-900"
              >
                x
              </div>
            </div>
          ))}
        </div>
        <input
          className="
          text-2xl
          text-center
          font-thin
          focus:outline-none focus:shadow-outline mt-2 h-16 rounded-full border-solid w-3/5 p-4"
          placeholder="Enter package name..."
          type="text"
          {...tagInput.getInputProps()}
        />
      </div>
    </React.Fragment>
  );
};
export default SearchBox;
