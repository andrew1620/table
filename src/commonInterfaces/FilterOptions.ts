export type FilterOptions<TItem> = {
  [Key in keyof TItem]?: (value: TItem) => boolean;
};
