import React from "react";

export const usePagination = <Item>(
  items: Array<Item>,
  perPage: number,
  currentPage: number
) => {
  const lastItemIndex = currentPage * perPage;
  const firstItemIndex = lastItemIndex - perPage;

  const paginatedItems = React.useMemo(
    () => items.slice(firstItemIndex, lastItemIndex),
    [currentPage]
  );

  return paginatedItems;
};
