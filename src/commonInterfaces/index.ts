export interface BankAccount {
    id: number;
    parentId: number;
    isActive: boolean;
    balance: string;
    name: string;
    email: string;
}

export interface SortOptions<TField> {
    field?: TField;
    direction: "ASC" | "DESC";
  }