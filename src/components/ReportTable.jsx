import React, { useState, useEffect } from "react";
function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/report")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => {
          return { Header: key, accessor: key };
        })
      : [];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.Header}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.disease}>
            {columns.map((column) => (
              <td key={column.Header}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
