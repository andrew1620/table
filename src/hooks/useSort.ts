import React from "react";
import { SortOptions } from "../commonInterfaces";
import { TableItem } from "../components/Table/interfaces";

export const sort = <TItems extends Array<any>>(
  tableItems: TItems,
  compare: (a: TItems[number], b: TItems[number]) => number
) => {
  return tableItems.sort(compare);
};

export const useTableSort = (
  sortOption: SortOptions<keyof Pick<TableItem, "email" | "balance">>,
  items: Array<TableItem>
) => {
  const sortedItems = React.useMemo(() => {
    const { field, direction } = sortOption;
    if (!field || !items.length || !direction) return items;
    console.log("SORT - ", items);

    //TODO подумать
    return [
      ...sort(items, (item1, item2) => {
        switch (direction) {
          case "ASC":
            return Number(item1[field] > item2[field]) === 0 ? -1 : 1;
          case "DESC":
            return Number(item1[field] < item2[field]) === 0 ? -1 : 1;
        }
      }),
    ];
  }, [sortOption, items]);

  return sortedItems;
};
