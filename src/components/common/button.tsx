import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
