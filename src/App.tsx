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

  return (
    <div className="App">
      <TableContainer tableItems={tableItems} />
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
  const objectData: Record<typeof data[number]["id"], TableItem> = {};
  for (let item of data) {
    objectData[item.id] = { ...item };
  }

  const result = [];

  for (let id in objectData) {
    const elem = objectData[id];

    if (elem.parentId > 0) {
      const elemParent = objectData[elem.parentId];
      Array.isArray(elemParent.children)
        ? elemParent.children.push(elem)
        : (elemParent.children = [elem]);
    }
    if (elem.parentId === 0) result.push(elem);
  }

  return result;
}
