import React from "react";
import classes from "./style.module.css";

export const Row: React.FC = ({ children }) => {
  return <tr className={classes.tr}>{children}</tr>;
};
