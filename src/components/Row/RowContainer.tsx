import React from "react";
import { Cell } from "../Cell";
import { TableItem } from "../Table/interfaces";
import { Row } from "./Row";

type TCollapsedItems = Record<TableItem["id"], boolean>;

interface Props {
  item: TableItem;
  nesting?: number;
  getCollapsed: (id: TableItem["id"]) => boolean;
  toggleCollapse: (id: TableItem["id"]) => void;
}

const buttonWidth = 25;

export const RowContainer: React.FC<Props> = ({
  item,
  nesting = 0,
  getCollapsed,
  toggleCollapse,
}) => {
  //TODO Подумать
  const [isCollapsed, setIsCollapsed] = React.useState(getCollapsed(item.id));

  const subRows = React.useMemo(() => {
    return item.children?.map((item) => (
      <RowContainer
        key={item.id}
        item={item}
        nesting={nesting + 1}
        getCollapsed={getCollapsed}
        toggleCollapse={toggleCollapse}
      />
    ));
  }, [isCollapsed]);

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
