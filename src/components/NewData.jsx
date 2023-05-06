import React, { useState } from "react";

function NewData() {
  const [data, setData] = useState([
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
    // ... other data objects
  ]);

  const handleAddData = () => {
    const newData = {
      disease: "New Disease",
      " 1": 1,
      " 2": 2,
      " 3": 3,
      " 4": 4,
      " 5": 5,
    };
    setData([...data, newData]);
  };

  return (
    <div>
      <button onClick={handleAddData}>Add Data</button>
      {/* render the data array */}
      {data.map((eachItem) => {
        return eachItem.disease;
      })}
    </div>
  );
}

export default NewData;
