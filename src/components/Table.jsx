import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "./style.css";
// Import columns
import { columns } from "./table-columns.js";
import GoBackButton from "./goBackButton.jsx";
//REACT-ICONS
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Table = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = [...reportData];

  const fetchFromReportEndpoint = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/report");

      if (response.ok) {
        const reportData = await response.json();

        if (reportData.length !== 0) {
          setReportData(reportData);
        }
      } else {
        console.error("API ENDPOINT IS DOWN!");
      }
    } catch (error) {
      console.error("An error occurred while fetching the data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFromReportEndpoint().then((r) => {});
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const updateReport = async () => {
    const updateURl = "http://localhost:3000/update-report";
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <GoBackButton destination={"/"} />
      <button className="btn" onClick={() => updateReport()}>
        UPDATE REPORT
      </button>
      <table {...getTableProps()} style={{ border: "1px solid black" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "1px solid black",
                    background: "aliceblue",
                    padding: "8px",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "8px",
                      border: "1px solid black",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
