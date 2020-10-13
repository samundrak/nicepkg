import React, { SyntheticEvent, Children } from "react";
import Tag from "./Tag";

interface Tag {
  value: string;
  id: string;
}
interface UseTagInput {
  getInputProps: (events: {}) => {
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  };
  onDelete: (tagId: string) => void;
  tags: Tag[];
}

interface IProps {
  delimiter?: string;
  shouldBreakOnEnter?: boolean;
}
const SearchBox = ({ delimiter = ",", ...props }: IProps = {}) => {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState<Tag[]>([
    {
      id: "s",
      value: "samundra",
    },
  ]);
  const addValue = React.useCallback(
    (value: string, callback: (value: string) => boolean) => {
      const nextValue = value.trim();
      if (callback(nextValue)) {
        setTags([
          ...tags,
          {
            value: nextValue.replace(delimiter, ""),
            id: Date.now() + "",
          },
        ]);
        setValue("");
        return true;
      }
      return false;
    },
    [delimiter, tags]
  );

  const handleValueChange = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      const nextValue = value.trim();
      if (
        !addValue(value, (text) => (text ? text.endsWith(delimiter) : false))
      ) {
        setValue(nextValue);
      }
    },
    [addValue, delimiter]
  );
  const handleKeyup = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      if (event.keyCode === 13 && value.length) {
        console.log("pls add this");
        addValue(value, () => true);
        return;
      }
      if (event.keyCode === 8 && !value.length) {
        // it is back key
        const nextTags = [...tags];
        nextTags.pop?.();
        setTags(nextTags);
        return;
      }
    },
    [tags]
  );
  const handleTagDelete = React.useCallback(
    (tagId: string) => {
      setTags(tags.filter((item) => item.id !== tagId));
    },
    [tags]
  );

  const outputFactory = React.useCallback(() => {
    return {
      getInputProps: () => ({
        onKeyUp: handleKeyup,
        onChange: handleValueChange,
        value: value,
      }),
      onDelete: handleTagDelete,
      tags: tags,
    };
  }, [handleKeyup, handleTagDelete, handleValueChange, tags, value]);
  const sameRef = React.useRef<UseTagInput>(outputFactory());

  Object.assign(sameRef.current, outputFactory());
  return sameRef.current;
};
export default SearchBox;
