import React from "react";
import { SortOptions } from "../../commonInterfaces";
import { useTableSort } from "../../hooks";
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
}

const buttonWidth = 25;

export const RowContainer: React.FC<Props> = ({
  item,
  nesting = 0,
  getCollapsed,
  toggleCollapse,
  sortOptions,
}) => {
  //TODO Подумать
  const [isCollapsed, setIsCollapsed] = React.useState(getCollapsed(item.id));
  const sortedTableItems = useTableSort(sortOptions, item.children || []);

  const subRows = React.useMemo(() => {
    return sortedTableItems.map((item) => (
      <RowContainer
        key={item.id}
        item={item}
        nesting={nesting + 1}
        getCollapsed={getCollapsed}
        toggleCollapse={toggleCollapse}
        sortOptions={sortOptions}
      />
    ));
  }, [isCollapsed, sortedTableItems]);

  const toggleItem = () => {
    toggleCollapse(item.id);
    setIsCollapsed(!isCollapsed);
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
                visibility: item.children ? "visible" : "hidden",
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
