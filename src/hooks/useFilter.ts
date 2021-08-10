import React from "react";
import { FilterOptions } from "../commonInterfaces";

export const useTableFilter = <TTableItem>(
  options: FilterOptions<TTableItem>,
  items: Array<TTableItem>
) => {
  const filteredItems = React.useMemo(() => {
    const optionKeys = Object.keys(options).filter((name) => {
      //@ts-ignore
      return !!options[name];
    });

    if (!optionKeys.length || !items.length) return items;

    return items.filter((item) => {
      return optionKeys.reduce((isValid, fieldName) => {
        //@ts-ignore
        isValid = isValid && options[fieldName](item);
        return isValid;
      }, Boolean(true));
    });
  }, [options, items]);

  return filteredItems;
};
