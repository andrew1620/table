export interface BankAccount {
  id: number;
  parentId: number;
  isActive: boolean;
  balance: string;
  name: string;
  email: string;
}

export interface SortOptions<TField extends string> {
  field?: TField;
  direction?: "ASC" | "DESC";
}

export type FilterOptions<TItem> = {
  [Key in keyof TItem]?: (value: TItem) => boolean;
};
