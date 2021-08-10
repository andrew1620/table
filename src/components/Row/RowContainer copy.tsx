import React from "react";
import { FilterOptions, SortOptions } from "../../commonInterfaces";
import { useTableFilter, useTableSort } from "../../hooks";
import { Cell } from "../Cell";
import { TableItem } from "../Table/interfaces";
import { Row } from "./Row";

type TCollapsedItems = Record<TableItem["id"], boolean>;

interface Props {
  item: TableItem;
  nesting?: number;
  getCollapsed: (id: Props["item"]["id"]) => boolean;
  toggleCollapse: (id: Props["item"]["id"]) => void;
  sortOptions: SortOptions<keyof Pick<Props["item"], "email" | "balance">>;
  getChildren: (id: Props["item"]["id"]) => Array<Props["item"]> | undefined;
  filterOptions: FilterOptions<Props["item"]>;
}

const buttonWidth = 25;

export const RowContainer: React.FC<Props> = ({
  item,
  nesting = 0,
  getCollapsed,
  toggleCollapse,
  sortOptions,
  filterOptions,
  getChildren,
}) => {
  //TODO Подумать
  const [isCollapsed, setIsCollapsed] = React.useState(getCollapsed(item.id));

  const [children, setChildren] = React.useState<
    NonNullable<ReturnType<Props["getChildren"]>>
  >([]);
  const kids = React.useMemo(() => getChildren(item.id) || [], [item]);

  const filteredItems = useTableFilter(filterOptions, children);

  const sortedTableItems = useTableSort(sortOptions, filteredItems);
  const subRows = React.useMemo(() => {
    return sortedTableItems.map((item) => (
      <RowContainer
        key={item.id}
        item={item}
        nesting={nesting + 1}
        getCollapsed={getCollapsed}
        toggleCollapse={toggleCollapse}
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        getChildren={getChildren}
      />
    ));
  }, [isCollapsed, sortedTableItems]);

  React.useEffect(() => {
    if (!isCollapsed) {
      console.log(item.name, kids);
      setChildren(kids);
    }
  }, []);

  const toggleItem = () => {
    const itemId = item.id;
    toggleCollapse(itemId);
    setIsCollapsed(!isCollapsed);
    if (kids.length) setChildren(kids);
  };
  return (
    <>
      <Row>
        <Cell style={{ paddingLeft: nesting * buttonWidth }}>
          <>
            <button
              onClick={toggleItem}
              style={{
                width: buttonWidth + "px",
                visibility: kids?.length ? "visible" : "hidden",
              }}
            >
              {isCollapsed ? "+" : "-"}
            </button>{" "}
            {item.name}
          </>
        </Cell>
        <Cell>{item.email}</Cell>
      </Row>
      {!isCollapsed && (subRows || [])}
    </>
  );
};
