import { useState, useEffect } from "react";
import M from "materialize-css";

// date-fns date formatting library
import { formatDistanceToNow } from "date-fns";

const SummaryTable = () => {
  const [staffData, setStaffData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/student-data")
      .then((response) => response.json())
      .then(setStaffData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredData = staffData.filter((record) =>
    Object.values(record)
      .join("")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter"
      />
      <table className="highlight responsive-table centered">
        <thead>
          <tr>
            <th>studentID</th>
            <th>Adm. no</th>
            <th>First Name</th>
            <th>Second Name</th>
            <th>Class</th>
            <th>Temperature Reading</th>
            <th>Complain</th>
            <th>Ailment</th>
            <th>Medication</th>
            <th>Last time here</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((eachRecord) => {
            const formattedTimeStamp = formatDistanceToNow(
              new Date(eachRecord.timestamp),
              {
                includeSeconds: true,
                addSuffix: true,
              }
            );
            const newRecordWithFormattedTimeStamp = {
              ...eachRecord,
              timestamp: formattedTimeStamp,
            };
            // Store the keys in a binding to prevent calling the Object.keys() method each time
            const keysForRecordWithFormattedTimeStamp = Object.keys(
              newRecordWithFormattedTimeStamp
            );

            return (
              <tr key={newRecordWithFormattedTimeStamp.recordID}>
                <td>{newRecordWithFormattedTimeStamp.recordID || " "}</td>
                <td>{newRecordWithFormattedTimeStamp.admNo || " "}</td>
                <td>{newRecordWithFormattedTimeStamp.fName || " "}</td>
                <td>{newRecordWithFormattedTimeStamp.sName || " "}</td>
                <td>{newRecordWithFormattedTimeStamp.class || " "}</td>
                <td>{newRecordWithFormattedTimeStamp.tempReading || 0}</td>
                <td>{newRecordWithFormattedTimeStamp.complain || 0}</td>
                <td>{newRecordWithFormattedTimeStamp.ailment || 0}</td>
                <td>{newRecordWithFormattedTimeStamp.medication || 0}</td>
                <td>{newRecordWithFormattedTimeStamp.timestamp || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
