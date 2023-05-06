import React from "react";

function DataTable() {
  const data = [
    {
      disease: "Diarrhoea",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 0,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
    {
      disease: "Fever",
      " 1": 0,
      " 2": 0,
      " 3": 0,
      " 4": 0,
      " 5": 6,
    },
  ];

  const columns = Object.keys(data[0]).map((key) => {
    return { Header: key, accessor: key };
  });

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
