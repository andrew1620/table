import { BankAccount } from "../../commonInterfaces";


export interface TableItem extends BankAccount  {
    children?: Array<TableItem>;
}