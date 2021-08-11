import React from "react";
import { SortOptions } from "../../../commonInterfaces";
import { Button } from "../../common/Button";
import { TableItem } from "../Table/interfaces";

interface Props {
  fieldName: keyof TableItem;
  sortOptions: SortOptions<keyof Pick<TableItem, "balance" | "email">>;
  setSortOptions: (options: Props["sortOptions"]) => void;
}
export const SortButton: React.FC<Props> = ({
  sortOptions,
  setSortOptions,
  fieldName,
}) => {
  const onClick = () => {
    const direction = sortOptions.direction === "ASC" ? "DESC" : "ASC";

    if (fieldName === "email" || fieldName === "balance")
      setSortOptions({ direction, field: fieldName });
  };

  const status: Record<any, string> = {
    ASC: "\u2193",
    DESC: "\u2191",
  };

  const isCurrentField = fieldName === sortOptions.field;
  return (
    <Button onClick={onClick}>
      {sortOptions.direction && isCurrentField
        ? status[sortOptions.direction]
        : "\u21C5"}
    </Button>
  );
};
