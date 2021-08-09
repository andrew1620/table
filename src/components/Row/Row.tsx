import React from "react";
import { TableItem } from "../Table/interfaces";

interface Props {}

export const Row: React.FC<Props> = ({ children }) => {
  return <tr>{children}</tr>;
};
