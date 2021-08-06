import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TableContainer } from "./components/Table/TableContainer";
import data from "./data.json";

function App() {
  return (
    <div className="App">
      <TableContainer data={data} />
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
