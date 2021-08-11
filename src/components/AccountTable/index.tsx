import React from "react";

import { TableContainer } from "./Table";
import bankAccounts from "../../datasource/data.json";
import { usePagination } from "../../hooks";
import { BankAccount } from "../../commonInterfaces";
import { TableItem } from "./Table/interfaces";
import { Pagination } from "../common/Pagination";

const PER_PAGE = 5;
const FIRST_LEVEL = 0;
export const AccountTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const paginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const tableItems = React.useMemo(
    () => getTableData(bankAccounts),
    [bankAccounts]
  );

  const firstLevelItems = tableItems[FIRST_LEVEL];
  const items = usePagination(firstLevelItems || [], PER_PAGE, currentPage);

  const getChildren = (id: keyof typeof tableItems) => tableItems[id];

  return (
    <div>
      <TableContainer tableItems={items} getChildren={getChildren} />
      <Pagination
        current={currentPage}
        perPage={PER_PAGE}
        total={firstLevelItems?.length || 0}
        onChange={paginationChange}
      />
    </div>
  );
};

function getTableData(data: Array<BankAccount>) {
  type TItem = typeof data[number];

  const result: Record<TItem["parentId"], TableItem[] | undefined> = {};

  for (let item of data) {
    const parentId = item.parentId;
    const parent = result[parentId];
    if (parent) {
      parent.push({ ...item });
    } else result[parentId] = [item];
  }

  return result;
}
