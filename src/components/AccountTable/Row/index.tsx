import React from "react";

import { useTableFilter, useTableSort } from "../../../hooks";
import { Cell } from "../../common/Cell";
import { Button } from "../../common/Button";
import { TableItem } from "../Table/interfaces";
import { Row } from "../../common/Row";
import { FilterOptions, SortOptions } from "../../../commonInterfaces";

interface Props {
  item: TableItem;
  nesting?: number;
  getVisible: (id: Props["item"]["id"]) => boolean;
  toggleVisible: (id: Props["item"]["id"]) => boolean;
  sortOptions: SortOptions<keyof Pick<Props["item"], "email" | "balance">>;
  getChildren: (id: Props["item"]["id"]) => Array<Props["item"]> | undefined;
  filterOptions: FilterOptions<Props["item"]>;
}

export const RowContainer: React.FC<Props> = ({
  item,
  nesting = 0,
  getVisible,
  toggleVisible,
  sortOptions,
  filterOptions,
  getChildren,
}) => {
  const isVisible = getVisible(item.id);
  const children = React.useMemo(() => {
    if (isVisible) return getChildren(item.id) || [];
    return [];
  }, [isVisible]);

  const filteredItems = useTableFilter(filterOptions, children);

  const sortedTableItems = useTableSort(sortOptions, filteredItems);

  const subRows = sortedTableItems.map((item) => (
    <RowContainer
      key={item.id}
      item={item}
      nesting={nesting + 1}
      getVisible={getVisible}
      toggleVisible={toggleVisible}
      sortOptions={sortOptions}
      filterOptions={filterOptions}
      getChildren={getChildren}
    />
  ));

  //TODO исправить
  const filteredChildren = useTableFilter(
    filterOptions,
    getChildren(item.id) || []
  );

  const toggleItem = () => {
    const itemId = item.id;
    toggleVisible(itemId);
  };
  return (
    <>
      <Row>
        <Cell style={{ paddingLeft: nesting * 20, display: "flex" }}>
          <>
            <Button
              onClick={toggleItem}
              style={{
                marginRight: "10px",
                marginLeft: "10px",
                visibility: filteredChildren.length ? "visible" : "hidden",
              }}
            >
              {!isVisible ? "+" : "-"}
            </Button>{" "}
            {item.name}
          </>
        </Cell>
        <Cell>{item.email}</Cell>
        <Cell>{item.balance}</Cell>
        <Cell>{String(item.isActive)}</Cell>
      </Row>
      {isVisible && (subRows || [])}
    </>
  );
};
