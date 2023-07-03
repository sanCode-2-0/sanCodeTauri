import "./styles.css";
import { useState } from "react";
import readXlsxFile from "read-excel-file";

export default function App() {
  const [excelInfo, setExcelInfo] = useState([]);
  const [admNos, setAdmNos] = useState([]);

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    readXlsxFile(e.target.files[0]).then((rows) => {
      setExcelInfo(rows);

      const admissionNumbers = [];
      for (let i = 1; i < 5; i++) {
        const admissionNumber = rows[i][4]; // Assuming the admission number is in column 4
        admissionNumbers.push(admissionNumber);
        console.log(rows[i]);
      }
      setAdmNos(admissionNumbers);
    });
  };

  return (
    <div className="App">
      <h2>Please ensure your Excel file is formatted correctly:</h2>
      <p>
        The Excel file must adhere to the following column order:
        <strong>
          First Name, Second Name, Third Name, Fourth Name, Adm No., Class
        </strong>
        .
      </p>
      <input type="file" id="file" onChange={handleUpload} />
      {admNos.length > 0 && (
        <div>
          <h3>Admission Numbers:</h3>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Third Name</th>
                <th>Fourth Name</th>
                <th>Adm No.</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {admNos.map((admissionNumber, index) => (
                <tr key={index}>
                  <td>{excelInfo[index + 1][0]}</td>{" "}
                  {/* Assuming First Name is in column 0 */}
                  <td>{excelInfo[index + 1][1]}</td>{" "}
                  {/* Assuming Second Name is in column 1 */}
                  <td>{excelInfo[index + 1][2]}</td>{" "}
                  {/* Assuming Third Name is in column 2 */}
                  <td>{excelInfo[index + 1][3]}</td>{" "}
                  {/* Assuming Fourth Name is in column 3 */}
                  <td>{admissionNumber}</td>
                  <td>{excelInfo[index + 1][5]}</td>{" "}
                  {/* Assuming Class is in column 5 */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
