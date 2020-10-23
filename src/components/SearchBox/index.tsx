import React, { SyntheticEvent } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import useTagInput from "./useTagInput";
import { NPM_SEARCH } from "../../consts/api";
import { fetcher } from "../../utils";
import useKeyBoardEvents, { SpecialKeys } from "../../hooks/useKeyboard";

export interface IMiniPackageInfo {
  name: string;
  version?: string;
}
interface IProps {
  onAdd?: (packageInfo: IMiniPackageInfo) => void;
  onDelete?: (packageName: string) => void;
}
const SearchBox = (props: IProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [activeListIndex, setActiveListIndex] = React.useState(-1);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const { data } = useSWR(
    debouncedSearchTerm ? `${NPM_SEARCH}${debouncedSearchTerm}&size=5` : null,
    fetcher
  );
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
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
      return async () => {
        try {
          const ifPackageExist = tagInput.tags.find(
            (tag) => tag.id === item.package.name
          );
          if (ifPackageExist) {
            alert("Package already added.");
            return;
          }
          //@ts-ignore
          tagInput.addNewTag(item.package.name, item.package.name);
          setSearchTerm("");
          inputRef.current?.focus();
          await props.onAdd?.({
            name: item.package.name,
            version: item.package.version,
          });
        } catch {
          tagInput.onDelete(item.package.name);
        }
      };
    },
    [props.onAdd, tagInput]
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
                onClick={() => {
                  props.onDelete?.(tag.id);
                  tagInput.onDelete(tag.id);
                }}
                className="cursor-pointer p-2 ml-1 bg-gray-900"
              >
                x
              </div>
            </div>
          ))}
        </div>
        <div className="sm:w-2/6 md:w-5/12 h-16">
          <div className="flex flex-row-reverse">
            <input
              ref={inputRef}
              className="
            p-6
            w-full
            h-16
          text-2xl
          text-center
          font-thin
          focus:outline-none focus:shadow-outline mt-2 rounded-lg border-solid"
              placeholder="Enter package name to compare..."
              type="text"
              {...tagInput.getInputProps()}
              value={searchTerm}
            />
            <div className="absolute">
              <svg
                className="sm:w-10 w-5 h-16 mt-2  text-gray-700 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <ul
            ref={listRef}
            className="absolute rounded-md mt-1 sm:12/12 md:w-5/12 bg-white shadow-xl z-50"
          >
            {(data?.results || []).map(
              (item: { package: Record<string, any> }, index: number) => (
                <li
                  key={index}
                  className={`text-md
                 p-2 mt-1 text-center leading-loose
                 hover:bg-gray-200
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
                  <br />
                  <span className="text-gray-600 ml-2 text-sm">
                    {(item.package.maintainers || [])
                      .map((item: { username: string }) => `@${item.username}`)
                      .join(", ")}
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
