import React from "react";

import classes from "./style.module.css";

export const Table: React.FC = ({ children }) => {
  return <table className={classes.table}>{children}</table>;
};
