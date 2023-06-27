import { useState, useEffect } from "react";
import M from "materialize-css";

// date-fns date formatting library
import { formatDistanceToNow } from "date-fns";

const SummaryTable = () => {
  const [staffData, setStaffData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/staff-data")
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
            <th>staffRecordID</th>
            <th>idNo</th>
            <th>fName</th>
            <th>sName</th>
            <th>Temperature Reading</th>
            <th>complain</th>
            <th>ailment</th>
            <th>medication</th>
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
              <tr key={newRecordWithFormattedTimeStamp.staffRecordID}>
                {keysForRecordWithFormattedTimeStamp.map((eachKey) => (
                  <td
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    key={eachKey}
                  >
                    {newRecordWithFormattedTimeStamp[eachKey]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
