import React from "react";
import { useTableFilter, useTableSort } from "../../../hooks";
import { HeadContainer } from "../TableHead";
import { RowContainer } from "../Row";
import { TableItem } from "./interfaces";
import { Table } from "../../common/Table";
import { SortOptions, FilterOptions } from "../../../commonInterfaces";

interface Props {
  tableItems: Array<TableItem>;
  getChildren: (
    id: Props["tableItems"][number]["id"]
  ) => Props["tableItems"] | undefined;
}

export const TableContainer: React.FC<Props> = ({
  tableItems,
  getChildren,
}) => {
  type TItems = typeof tableItems[number];

  type RecordKey = TItems["id"];

  const [visibleItems, setVisibleItems] = React.useState<
    Record<RecordKey, boolean>
  >({});

  const [sortOptions, setSortOptions] = React.useState<
    SortOptions<keyof Pick<TItems, "email" | "balance">>
  >({
    field: undefined,
    direction: undefined,
  });

  const [filterOptions, setFilterOptions] = React.useState<
    FilterOptions<TableItem>
  >({});

  const toggleVisible = (id: RecordKey) => {
    setVisibleItems((visibleItems) => ({
      ...visibleItems,
      [id]: !visibleItems[id],
    }));
    return visibleItems[id];
  };

  const getVisible = (id: RecordKey) => {
    const isVisible = Boolean(visibleItems[id]);
    return isVisible;
  };

  const filteredItems = useTableFilter(filterOptions, tableItems);

  const sortedTableItems = useTableSort(sortOptions, filteredItems);

  const rows = sortedTableItems.map((item) => {
    return (
      <RowContainer
        key={item.id}
        item={item}
        getVisible={getVisible}
        toggleVisible={toggleVisible}
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        getChildren={getChildren}
      />
    );
  });

  return (
    <>
      <Table>
        <HeadContainer
          filterOptions={filterOptions}
          setFilterOptions={(options) => setFilterOptions(options)}
          setSort={setSortOptions}
          sortOptions={sortOptions}
          columns={[
            { title: "Name", sortable: false, fieldName: "name" },
            { title: "Email", sortable: true, fieldName: "email" },
            { title: "Balance", sortable: true, fieldName: "balance" },
            {
              title: "Active",
              sortable: false,
              fieldName: "isActive",
              filterFunction: (item) => item.isActive,
            },
          ]}
        />
        {rows}
      </Table>
    </>
  );
};
