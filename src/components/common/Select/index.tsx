import React from "react";
import classes from "./style.module.css";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}
export const Select: React.FC<Props> = ({ children, ...props }) => {
  return (
    <select className={classes.select} {...props}>
      {children}
    </select>
  );
};
