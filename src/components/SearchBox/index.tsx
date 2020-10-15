import React, { SyntheticEvent } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import useTagInput from "./useTagInput";
import { NPM_SEARCH } from "../../consts/api";
import { fetcher } from "../../utils";
import useKeyBoardEvents, { SpecialKeys } from "../../hooks/useKeyboard";

const SearchBox = () => {
  const [activeListIndex, setActiveListIndex] = React.useState(-1);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const { data } = useSWR(
    debouncedSearchTerm ? `${NPM_SEARCH}${debouncedSearchTerm}&size=5` : null,
    fetcher
  );

  const handleInputChange = React.useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      setSearchTerm(event.currentTarget.value);
    },
    []
  );
  const tagInput = useTagInput({
    shouldBreakOnEnter: false,
    onChange: handleInputChange,
  });
  const handlePackageSelection = React.useCallback(
    (item) => {
      return () => {
        console.log(item);
        //@ts-ignore
        tagInput.addNewTag(item.package.name, item.package.name);
        setSearchTerm("");
      };
    },
    [tagInput]
  );

  const handleKeyFlow = React.useCallback(
    (specialKey: SpecialKeys) => {
      let nextActiveListIndex = activeListIndex;
      if (specialKey === "bottom") {
        nextActiveListIndex += 1;
        if (nextActiveListIndex === (data?.results || []).length) {
          nextActiveListIndex = 0;
        }
      }
      if (specialKey === "top") {
        nextActiveListIndex -= 1;
        if (nextActiveListIndex < 0) {
          nextActiveListIndex = (data?.results || []).length - 1;
        }
      }
      if (specialKey === "enter") {
        // console.log(data?.results[activeListIndex]);
        handlePackageSelection(data?.results[activeListIndex])();
        nextActiveListIndex = -1;
      }
      setActiveListIndex(nextActiveListIndex);
    },
    [activeListIndex, data, handlePackageSelection]
  );
  useKeyBoardEvents({
    onSpecialKeys: handleKeyFlow,
    onBodyClick: (event) => {
      //@ts-ignore
      if (!listRef.current?.contains(event?.target || null)) {
        setSearchTerm("");
      }
    },
  });
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
        <div className="w-5/12 h-16">
          <input
            className="
            w-full
            h-16
          text-2xl
          text-center
          font-thin
          focus:outline-none focus:shadow-outline mt-2 rounded-full border-solid  p-4"
            placeholder="Enter package name..."
            type="text"
            {...tagInput.getInputProps()}
            value={searchTerm}
          />
          <ul
            ref={listRef}
            className="absolute rounded-md mt-1 w-5/12 bg-white shadow-xl"
          >
            {(data?.results || []).map(
              (item: { package: Record<string, any> }, index: number) => (
                <li
                  key={index}
                  className={`text-md
                 p-2 mt-1 text-center leading-loose
                 hover:bg-gray-100
                 cursor-pointer
                 text-gray-700
                 border-t-4
                 border-gray-100
                 ${activeListIndex === index && "bg-gray-100"}
                 `}
                  onClick={handlePackageSelection(item)}
                >
                  {item.package.name}
                  <span className="text-gray-500 ml-2">
                    @{item.package.version} &lt;
                    {item.package.publisher.username}&gt;
                  </span>
                  <br />
                  <span className="text-gray-500 ml-2 text-sm">
                    {item.package.description}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SearchBox;