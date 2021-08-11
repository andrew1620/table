import React from "react";

import { FilterButton } from "../FilterButton";
import { SortButton } from "../SortButton";
import { TableItem } from "../Table/interfaces";
import { THead } from "../../common/THead";
import { TableHead } from "../../common/TableHead";
import { Column } from "./interfaces";
import { FilterOptions, SortOptions } from "../../../commonInterfaces";

type SortFields = keyof Pick<TableItem, "email" | "balance">;

interface Props {
  columns: Array<Column<TableItem>>;
  filterOptions: FilterOptions<TableItem>;
  setFilterOptions: (options: Props["filterOptions"]) => void;
  sortOptions: SortOptions<SortFields>;
  setSort: (sortOtions: Props["sortOptions"]) => void;
}

export const HeadContainer: React.FC<Props> = ({
  columns,
  filterOptions,
  setFilterOptions,
  setSort,
  sortOptions,
}) => {
  const cells = columns.map(
    ({ sortable, title, fieldName, filterFunction }) => {
      return (
        <THead>
          <span>{title}</span>
          {/* выделить в компонент */}
          <div style={{ marginLeft: "10px" }}>
            {sortable && (
              <SortButton
                fieldName={fieldName}
                sortOptions={sortOptions}
                setSortOptions={setSort}
              />
            )}
            {filterFunction && (
              <FilterButton
                onClick={() =>
                  setFilterOptions({
                    ...filterOptions,
                    [fieldName]: filterOptions[fieldName]
                      ? undefined
                      : filterFunction,
                  })
                }
              />
            )}
          </div>
        </THead>
      );
    }
  );

  return (
    <TableHead>
      <tr>{cells}</tr>
    </TableHead>
  );
};
