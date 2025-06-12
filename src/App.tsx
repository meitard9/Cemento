import React from "react";
import Table from "./components/table/Table";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Editable Data Table</h1>
      <Table />
    </div>
  );
};

export default App;
