import React from "react";
import { FilterOptions, SortOptions } from "../../commonInterfaces";
import { FilterButton } from "../FilterButton";
import { SortButton } from "../SortButton";
import { TableItem } from "../Table/interfaces";
import { THead } from "../THead";
import { Head } from "./Head";
import { Column } from "./interfaces";

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
          {title}
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
        </THead>
      );
    }
  );

  return (
    <Head>
      <tr>{cells}</tr>
    </Head>
  );
};
