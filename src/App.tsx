import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TableContainer } from "./components/Table/TableContainer";
import bankAccounts from "./data.json";
import { TableItem } from "./components/Table/interfaces";
import { BankAccount } from "./commonInterfaces";

function App() {
  const tableItems = React.useMemo(
    () => getTableData(bankAccounts),
    [bankAccounts]
  );

  const getChildren = (id: keyof typeof tableItems) => tableItems[id];

  return (
    <div className="App">
      <TableContainer
        tableItems={tableItems[0] || []}
        getChildren={getChildren}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

function getTableData(data: Array<BankAccount>) {
  type TItem = typeof data[number];

  // const objectData: Record<TItem["id"], TableItem> = {};
  const result: Record<TItem["parentId"], TableItem[] | undefined> = {};

  for (let item of data) {
    // objectData[item.id] = { ...item };
    const parentId = item.parentId;
    const ob2 = result[parentId];
    if (ob2) {
      ob2.push({ ...item });
    } else result[parentId] = [item];
  }

  return result;
}
