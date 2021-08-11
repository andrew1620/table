import React from "react";
import classes from "./style.module.css";

export const TableHead: React.FC = ({ children }) => {
  return <thead className={classes.tableHead}>{children}</thead>;
};
