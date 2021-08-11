export interface Column<TItem> {
  title: string;
  fieldName: keyof TItem;
  sortable: boolean;
  filterFunction?: (item: TItem) => boolean;
}
