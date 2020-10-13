import React from "react";

interface IProps {
  onDelete?: (tag: string) => Promise<boolean> | boolean;
  onClick?: (tag: string) => void;
}
const Tag: React.FC<IProps> = ({ children, ...props }) => {
  return <div>{children}</div>;
};
export default Tag;
