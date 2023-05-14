import React from "react";
import Table from "./components/Table";
import DataTable from "./components/ReportTable";
import NewData from "./components/NewData";

// Report table custom styles
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

function App() {
  return (
    <div>
      {/* To activate the Report Table, uncomment this */}
      {/* <DataTable customStyles={customStyles} /> */}
    </div>
  );
}

export default App;
