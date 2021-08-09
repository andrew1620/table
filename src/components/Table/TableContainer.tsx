import React from "react";
import { SortOptions } from "../../commonInterfaces";
import { useTableSort } from "../../hooks";
import { RowContainer } from "../Row/RowContainer";
import { TableItem } from "./interfaces";
import { Table } from "./Table";

interface Props {
  tableItems: Array<TableItem>;
}

export const TableContainer: React.FC<Props> = ({ tableItems }) => {
  type TItems = typeof tableItems[number];

  type RecordKey = TItems["id"];

  const [collapsedItems, setCollapseItems] = React.useState<
    Record<RecordKey, boolean>
  >({});

  const [sortOptions, setSortOptions] = React.useState<
    SortOptions<keyof Pick<TItems, "email" | "balance">>
  >({
    field: undefined,
    direction: "ASC",
  });

  const toggleCollapse = (id: RecordKey) => {
    setCollapseItems((collapsedItems) => ({
      ...collapsedItems,
      [id]: !collapsedItems[id],
    }));
  };

  const getCollapsed = (id: RecordKey) => {
    return !Boolean(collapsedItems[id]);
  };

  const sortedTableItems = useTableSort(sortOptions, tableItems);

  const rows = sortedTableItems.map((item) => (
    <RowContainer
      key={item.id}
      item={item}
      getCollapsed={getCollapsed}
      toggleCollapse={toggleCollapse}
      sortOptions={sortOptions}
    />
  ));

  return (
    <Table>
      <button
        onClick={() => {
          setSortOptions({ field: "email", direction: "ASC" });
        }}
      >
        ASC
      </button>{" "}
      {rows}{" "}
    </Table>
  );
};
