import React from "react";
import Table from "./components/Table";
import DataTable from "./components/DataTable";
import NewData from "./components/NewData";

function App() {
  const data = [
    { disease: "John", diseaseCount: 25, city: "New York" },
    { disease: "Jane", diseaseCount: 30, city: "San Francisco" },
    { disease: "Bob", diseaseCount: 35, city: "Seattle" },
  ];

  const columns = [
    { Header: "Disease", accessor: "disease" },
    { Header: "1", accessor: "diseaseCount" },
    { Header: "2", accessor: "city" },
  ];

  const customStyles = {
    cells: {
      padding: "1cm",
    },
    header: {
      fontWeight: "bold",
    },
    table: {
      border: "1px solid black",
      borderCollapse: "collapse",
    },
    row: {
      borderBottom: "1px solid black",
    },
  };
  return (
    <div>
      <h1>My Table</h1>
      <DataTable customStyles={customStyles} />
    </div>
  );
}

export default App;
