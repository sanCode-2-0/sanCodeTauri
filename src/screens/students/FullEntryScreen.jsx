import { useState, useRef, useEffect } from "react";

// React-router-dom
import { useNavigate } from "react-router-dom";

//STYLESHEET
import "../screens.css";

//REACT-ICONS
import { IoCloseCircle } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";

import { useLocation } from "react-router-dom";

// COMPONENTS
import DateFormat from "../../components/DateFormat";
import { Alert } from "@mui/material";

//React-widget dropdown
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import GoBackButton from "../../components/goBackButton";
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/disease");
    return response.json();
  } catch (error) {
    // Handle any errors
    console.error(error);
    throw error;
  }
}

async function loadData() {
  try {
    const diseaseValues = [];
    const response = await fetchData();
    const data = response;
    for (let counter = 0; counter < data.length; counter++) {
      diseaseValues.push(data[counter].disease);
    }
    return diseaseValues;
  } catch (error) {
    // Handle any errors
    console.error(error);
    throw error;
  }
}

const FullEntryScreen = () => {
  const [tempReading, setTempReading] = useState(0.0);
  const [complain, setComplain] = useState([]);
  const [ailment, setAilment] = useState("");
  const [medication, setMedication] = useState("");
  const [complainInputValue, setComplainInputValue] = useState("");
  const [filter, setFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  // useNavigate() hook to handle redirects in react-router-dom
  const redirectNavigation = useNavigate();

  const location = useLocation();

  let studentAdmNo_display;
  let tempReading_display;
  let complain_display;
  let ailment_display;
  let medication_display;
  let timestamp_display;

  const queryString = location.search.slice(1); // Remove the leading "?"
  const keyValuePairs = queryString.split("%3E"); // Split using "%3E" instead of ">"

  const params = {};
  keyValuePairs.forEach((keyValuePair) => {
    const equalsIndex = keyValuePair.indexOf("=");
    const key = keyValuePair.substring(0, equalsIndex);
    let value = keyValuePair.substring(equalsIndex + 1);

    // Check if the value is enclosed in square brackets
    if (value.startsWith("[") && value.endsWith("]")) {
      // Remove the square brackets and split the value by commas
      value = value.substring(1, value.length - 1).split(",");
      // Trim each element in the array
      value = value.map((element) => element.trim());
    } else {
      value = [value.trim()]; // Wrap single values in an array
    }

    // Assign the decoded value to the key
    params[key] = value.map((element) =>
      decodeURIComponent(element.replace(/\[|\]/g, ""))
    ); // Store the entire array as the value
  });

  // Access the individual parameters
  studentAdmNo_display = params["studentAdmNo"];
  tempReading_display = params["tempReading"];
  complain_display = params["complain"];
  ailment_display = params["ailment"];
  medication_display = params["medication"];
  timestamp_display = params["timestamp"];

  const grabTempReading = (event) => {
    setTempReading(event.target.value);
  };

  const grabComplain = (event) => {
    setComplain(event.target.value);
    console.log(complain);
  };

  const addComplain = (event) => {
    const trimmedValue = complainInputValue.trim();
    if (trimmedValue !== "") {
      const updatedArray = [...complain, trimmedValue];
      setComplain(updatedArray);
      setComplainInputValue("");
    }
  };

  //Ailment dropdown
  const handleAilmentInputChange = (event) => {
    const inputValue = event.target.value;
    setFilter(inputValue);
    setShowDropdown(inputValue !== "");
  };

  const handleDropdownSelect = (value) => {
    setSelectedValue(value);
    setFilter(value);
    setShowDropdown(false);
    setAilment(value);
  };

  const filteredValues = diseaseValues
    .filter((value) => value.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, 5); // Limit the number of items to 5

  const grabMedication = (event) => {
    setMedication(event.target.value);
  };

  //   Navigate inputs using ArrowKeys
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      const inputs = [inputRef1, inputRef2, inputRef3, inputRef4];

      if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = inputs.findIndex(
          (input) => input.current === document.activeElement
        );
        const nextIndex =
          key === "ArrowUp" ? currentIndex - 1 : currentIndex + 1;

        if (nextIndex >= 0 && nextIndex < inputs.length) {
          inputs[nextIndex].current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //   Submit button clicked when enter button is clicked
  const submitButtonRef = useRef();
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      submitButtonRef.current.click();
    }
  };

  //   Submit Data for Full Entry to the API endpoint
  const submitFullEntryData = () => {
    let updatedArray = [];
    if (complain.join(",") == "") {
      updatedArray = [...complain, complainInputValue.trim()];
      setComplain(updatedArray);
      setComplainInputValue("");
    }
    if (tempReading == 0.0 || selectedValue == "" || medication == "") {
      M.toast({ html: "FILL IN ALL INPUTS!", classes: "red lighten-1" });
    } else {
      const api_endpoint = "http://localhost:3000/student-full-entry";

      const student_data = {
        studentAdmNo: studentAdmNo_display,
        tempReading: tempReading,
        complain: updatedArray.join(",") || complain.join(","),
        ailment: ailment,
        medication: medication,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student_data),
      };

      fetch(api_endpoint, requestOptions)
        .then((response) => {
          if (response.ok) {
            M.toast({
              html: "Submitted!",
              classes: "light-green lighten-1",
              displayLength: 1000,
              completeCallback: () => {
                M.toast({
                  html: "You're being redirected back to the home page....!",
                  classes: "light-blue lighten-1",
                  displayLength: 3000,
                  inDuration: 500,
                  // Callback function when toast is dismissed
                  completeCallback: () =>
                    redirectNavigation(
                      "/enter-admission-number-screen?reload=true"
                    ),
                });
              },
            });
          } else {
            M.toast({
              html: "The Server is DOWN.!",
              classes: "red lighten-1",
            });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  //Block concerned with the
  return (
    <>
      <div className="row">
        <div className="container-fluid">
          <div className="col l12 section main">
            <div className="card full-entry-padding">
              <div className="card-content">
                <GoBackButton destination={"/enter-admission-number-screen"} />
                <i className="right">
                  <button className="activator btn">Add New Record</button>
                </i>
                <blockquote>
                  <span className="grey-text text-darken-3">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <p>Temperature Reading : </p>
                          </td>
                          <td>
                            <b>{tempReading_display}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Complain : </p>
                          </td>
                          <td>
                            <b>{complain_display.join(", ")}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Ailment : </p>
                          </td>
                          <td>
                            <b>{ailment_display}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Medication : </p>
                          </td>
                          <td>
                            <b>{medication_display}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Last time here : </p>
                          </td>
                          <td>
                            <b>{DateFormat(timestamp_display)}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </span>
                </blockquote>
              </div>
              <div className="card-reveal">
                <span className="card-title text-darken-4 right close-button">
                  CLOSE
                </span>
                <hr />
                <br />

                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="first_name"
                      ref={inputRef1}
                      type="number"
                      autoFocus
                      step="any"
                      required
                      onKeyDown={handleKeyPressed}
                      onChange={grabTempReading}
                    />
                    <label htmlFor="first_name">Temperature Reading *</label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="complain"
                      ref={inputRef2}
                      type="text"
                      required
                      // onKeyDown={handleKeyPressed}
                      // onChange={grabComplain}
                      value={complainInputValue}
                      onChange={(entry) =>
                        setComplainInputValue(entry.target.value)
                      }
                    />
                    <button className="btn" onClick={addComplain}>
                      <small>Add Complain+</small>
                    </button>
                    <label htmlFor="complain">Complains *</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="first_name"
                      type="text"
                      ref={inputRef3}
                      autoComplete="off"
                      required
                      value={filter}
                      onKeyDown={handleKeyPressed}
                      onChange={handleAilmentInputChange}
                    />
                    <label htmlFor="first_name">Ailment *</label>
                    {showDropdown && (
                      <ul className="dropdown-list">
                        {filteredValues.map((value) => (
                          <li
                            key={value}
                            onClick={() => handleDropdownSelect(value)}
                            className="dropdown-item"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="input-field col s6">
                    <input
                      id="last_name"
                      ref={inputRef4}
                      type="text"
                      required
                      onKeyDown={handleKeyPressed}
                      onChange={grabMedication}
                    />
                    <label htmlFor="last_name">Medication *</label>
                  </div>
                </div>
                <div className="card-action center-align">
                  <button
                    className="btn center-align"
                    ref={submitButtonRef}
                    onClick={submitFullEntryData}
                  >
                    SUBMIT{" "}
                    <small>
                      <IoReturnDownBackOutline /> Enter
                    </small>
                  </button>
                </div>
              </div>
            </div>
            <div className="chip complain-text">
              <b>Previous Complains :</b> {complain_display.join(", ")}
            </div>
            <div className="chip complain-text">
              <b>New Complains :</b> {complain.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullEntryScreen;
