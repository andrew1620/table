import React from "react";
import { TableItem } from "./interfaces";

interface Props {}
export const Table: React.FC<Props> = ({ children }) => {
  return <table>{children}</table>;
};
