import { useState } from "react";
import readXlsxFile from "read-excel-file";
import GoBackButton from "../components/goBackButton";
export default function App() {
  const [excelInfo, setExcelInfo] = useState([]);
  const [admNos, setAdmNos] = useState([]);

  const handleUpload = (e) => {
    readXlsxFile(e.target.files[0]).then((rows) => {
      const admissionNumbers = [];
      for (let i = 1; i < rows.length && i < 5; i++) {
        const admissionNumber = rows[i][4]; // Assuming the admission number is in column 4
        admissionNumbers.push(admissionNumber);
      }
      setAdmNos(admissionNumbers);

      const modifiedRows = rows
        .slice(1)
        .map((row) => [row[0], row[1], ...row.slice(4)]);
      setExcelInfo(modifiedRows);
    });
  };

  const uploadExcelFile = async () => {
    try {
      const response = await fetch("http://localhost:3000/new-students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(excelInfo),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to fetch data from API");
        alert("DATA API ENDPOINT IS DOWN!");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      alert("An error occurred while fetching data");
    }
  };

  let tableContent;

  if (admNos.length > 0 && excelInfo) {
    tableContent = admNos.map((admissionNumber, index) => (
      <tr key={index}>
        <td>{excelInfo[index + 1]?.[0]}</td>
        {/* Assuming First Name is in column 0 */}
        <td>{excelInfo[index + 1]?.[1]}</td>
        {/* Assuming Second Name is in column 1 */}
        <td>{excelInfo[index + 1]?.[2]}</td>
        {/* Assuming Third Name is in column 2 */}
        <td>{excelInfo[index + 1]?.[3]}</td>
        {/* Assuming Fourth Name is in column 3 */}
        <td>{excelInfo[index + 1]?.[5]}</td>
        {/* Assuming Class is in column 5 */}
      </tr>
    ));
  } else {
    tableContent = (
      <tr>
        <td colSpan="6">No data to display.</td>
      </tr>
    );
  }

  return (
    <div className="container center-align">
      <h2>Upload an Excel file with student details:</h2>
      <GoBackButton destination={"/"} />
      <p>
        The Excel file must adhere to the following column order:
        <strong>First Name, Second Name, Adm No., Class</strong>.
      </p>
      <div className="file-field input-field">
        <div className="btn">
          <span>Click to Upload File</span>
          <input type="file" onChange={handleUpload} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn" onClick={uploadExcelFile}>
        Submit Excel File
      </button>
      {admNos.length > 0 && (
        <div>
          <h3>Preview of the excel file:</h3>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Adm No.</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
