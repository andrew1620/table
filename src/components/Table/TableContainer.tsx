import React from "react";
import { RowContainer } from "../Row/RowContainer";
import { TableItem } from "./interfaces";
import { Table } from "./Table";

interface Props {
  tableItems: Array<TableItem>;
}

export const TableContainer: React.FC<Props> = ({ tableItems }) => {
  type RecordKey = typeof tableItems[number]["id"];

  const [collapsedItems, setCollapseItems] = React.useState<
    Record<RecordKey, boolean>
  >({});

  React.useEffect(() => {
    console.table(collapsedItems);
  }, [collapsedItems]);

  const toggleCollapse = (id: RecordKey) => {
    setCollapseItems((collapsedItems) => ({
      ...collapsedItems,
      [id]: !collapsedItems[id],
    }));
  };

  const getCollapsed = (id: RecordKey) => {
    return !Boolean(collapsedItems[id]);
  };

  const rows = tableItems.map((item) => (
    <RowContainer
      key={item.id}
      item={item}
      getCollapsed={getCollapsed}
      toggleCollapse={toggleCollapse}
    />
  ));

  return <Table> {rows} </Table>;
};
