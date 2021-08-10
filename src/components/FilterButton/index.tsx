import React from "react";
import { FilterOptions } from "../../commonInterfaces";
import { Button } from "../common/button";
import { TableItem } from "../Table/interfaces";

interface Props {
  onClick: () => void;
  //   setFilterOptions: (options: Props["filterOptions"]) => void;
  //   filterOptions: FilterOptions<TableItem>;
  //   fieldName: keyof TableItem;
}
export const FilterButton: React.FC<Props> = ({ onClick }) => {
  //   const onClick = () => {
  //     //   if (filterOptions[fieldName]) {
  //         //   setFilterOptions({...})
  //     //   }
  //     setFilterOptions({...filterOptions, isActive: filterOptions[fieldName] ? undefined : });
  //   };

  return <Button onClick={onClick}>filter</Button>;
};
