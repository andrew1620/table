import { FilterOptions } from "../../commonInterfaces";
import { TableItem } from "../Table/interfaces";

export interface Column<TItem> {
  title: string;
  fieldName: keyof TItem;
  sortable: boolean;
  filterFunction?: (item: TItem) => boolean;
}
