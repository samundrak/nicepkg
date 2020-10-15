import React, { SyntheticEvent } from "react";

export type SpecialKeys = "left" | "right" | "top" | "bottom" | "enter";
interface Props {
  onSpecialKeys?: (arrowKey: SpecialKeys) => void;
  onBodyClick?: (event?: SyntheticEvent<HTMLBodyElement>) => void;
}
const keyCodeToLabelMap: {
  [key: string]: SpecialKeys;
} = {
  "37": "left",
  "38": "top",
  "39": "right",
  "40": "bottom",
  "13": "enter",
};

const useKeyBoardEvents = ({ onSpecialKeys, onBodyClick }: Props) => {
  const element = React.useRef(document.body);
  const handleKeyUp = React.useCallback(
    (event: KeyboardEvent) => {
      onSpecialKeys?.(keyCodeToLabelMap[event.keyCode]);
    },
    [onSpecialKeys]
  );

  const handleMouseUp = React.useCallback(
    (event) => {
      onBodyClick?.(event);
    },
    [onBodyClick]
  );

  React.useEffect(() => {
    const localEl = element;
    localEl.current.addEventListener("keyup", handleKeyUp);
    localEl.current.addEventListener("mouseup", handleMouseUp);
    return () => {
      localEl.current.removeEventListener("keyup", handleKeyUp);
      localEl.current.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleKeyUp, handleMouseUp]);
};
export default useKeyBoardEvents;
