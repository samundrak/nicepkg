import React, { SyntheticEvent } from "react";
import Tag from "./Tag";

interface Tag {
  value: string;
  id: string;
}
interface UseTagInput {
  getInputProps: () => {
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  };
  onDelete: (tagId: string) => void;
  tags: Tag[];
  addNewTag?: (id: string, value: string) => boolean;
}

interface IProps {
  delimiter?: string;
  shouldBreakOnEnter?: boolean;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
}
const SearchBox = ({ delimiter = ",", onChange, ...props }: IProps = {}) => {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState<Tag[]>([]);

  const addValue = React.useCallback(
    (
      value: {
        value: string;
        id?: string;
      },
      callback: (value: string) => boolean
    ) => {
      const nextValue = value.value.trim();
      if (callback(nextValue)) {
        setTags([
          ...tags,
          {
            value: nextValue.replace(delimiter, ""),
            id: value.id ?? Date.now() + "",
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
        !addValue({ value }, (text) =>
          text ? text.endsWith(delimiter) : false
        )
      ) {
        onChange?.(event);
        setValue(nextValue);
      }
    },
    [addValue, delimiter, onChange]
  );
  const handleKeyup = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      if (props.shouldBreakOnEnter && event.keyCode === 13 && value.length) {
        addValue({ value }, () => true);
        return;
      }
      // if (event.keyCode === 8 && !value.length) {
      //   // it is back key
      //   const nextTags = [...tags];
      //   nextTags.pop?.();
      //   setTags(nextTags);
      //   return;
      // }
    },
    [addValue, props.shouldBreakOnEnter]
  );
  const handleTagDelete = React.useCallback(
    (tagId: string) => {
      setTags(tags.filter((item) => item.id !== tagId));
    },
    [tags]
  );
  const handleAddNewTag = React.useCallback(
    (id: string, value: string) => {
      addValue(
        {
          id,
          value,
        },
        () => true
      );
      return true;
    },
    [addValue]
  );

  const outputFactory = React.useCallback(() => {
    return {
      getInputProps: () => ({
        onKeyUp: handleKeyup,
        onChange: handleValueChange,
        value: value,
      }),
      onDelete: handleTagDelete,
      addNewTag: handleAddNewTag,
      tags: tags,
    };
  }, [
    handleAddNewTag,
    handleKeyup,
    handleTagDelete,
    handleValueChange,
    tags,
    value,
  ]);
  const sameRef = React.useRef<UseTagInput>(outputFactory());

  Object.assign(sameRef.current, outputFactory());
  return sameRef.current;
};
export default SearchBox;
