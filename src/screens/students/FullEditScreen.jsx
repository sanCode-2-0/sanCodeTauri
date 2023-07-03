import { useState, useRef, useEffect } from "react";

// React-router-dom
import { useNavigate } from "react-router-dom";

//STYLESHEET
import "../screens.css";

//REACT-ICONS
import { IoArrowBackCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";

import { useLocation } from "react-router-dom";

// COMPONENTS
import DateFormat from "../../components/DateFormat";
import { Alert } from "@mui/material";

const FullEntryScreen = () => {
  const [tempReading, setTempReading] = useState(0.0);
  const [complain, setComplain] = useState([]);
  const [ailment, setAilment] = useState("");
  const [medication, setMedication] = useState("");
  const [complainInputValue, setComplainInputValue] = useState("");

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

  const grabAilment = (event) => {
    setAilment(event.target.value);
  };

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
    updatedArray = [...complain, complainInputValue.trim()];
    setComplain(updatedArray);
    setComplainInputValue("");

    const api_endpoint = "http://localhost:3000/student-full-entry";

    const student_data = {
      studentAdmNo: studentAdmNo_display,
      tempReading: tempReading_display,
      complain: updatedArray.join(","),
      ailment: ailment_display,
      medication: medication_display,
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
  };

  const redirectToEnterAdmissionScreen = () => {
    window.location.href = "/enter-admission-number-screen?reload=true";
  };
  return (
    <>
      <div className="row">
        <div className="container-fluid">
          <div className="col l12 section main">
            <div className="card full-entry-padding">
              <div className="card-content">
                <i className={"right"}>
                  <button
                    className={"btn light-blue darken-1"}
                    onClick={redirectToEnterAdmissionScreen}
                  >
                    <IoArrowBackCircleSharp size={"34"} color={"#fff"} />
                  </button>
                  <hr />
                </i>
                <i className="right">
                  <button className="activator btn">Edit Last Entry</button>
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
                      value={tempReading_display}
                      disabled
                      step="any"
                      required
                      onKeyDown={handleKeyPressed}
                      onChange={grabTempReading}
                    />
                    <label htmlFor="first_name" className="active">
                      Temperature Reading *
                    </label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="complain"
                      ref={inputRef2}
                      type="text"
                      required
                      autoFocus
                      value={complainInputValue}
                      onChange={(entry) =>
                        setComplainInputValue(entry.target.value)
                      }
                    />
                    <button className="btn" onClick={addComplain}>
                      <small>Add Complain+</small>
                    </button>
                    <label htmlFor="complain">Add a complain *</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="disabled"
                      ref={inputRef3}
                      type="text"
                      disabled
                      value={ailment_display}
                      onKeyDown={handleKeyPressed}
                      onChange={grabAilment}
                    />
                    <label htmlFor="disabled" className="active">
                      Ailment *
                    </label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="disabled"
                      ref={inputRef4}
                      type="text"
                      disabled
                      value={medication_display}
                      onKeyDown={handleKeyPressed}
                      onChange={grabMedication}
                    />
                    <label htmlFor="disabled" className="active">
                      Medication *
                    </label>
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

            {/* {complain == []
              ? complain.map((eachComplain) => (
                  <span
                    className="chip"
                    key={complain.indexOf(eachComplain) + Math.random()}
                  >
                    {eachComplain}
                  </span>
                ))
              : null} */}
            {/* Check if the complain state is being properly updated. Verify that the addComplain function is correctly updating the state with the new complainInputValue.
              Ensure that the complain state remains an array and doesn't accidentally become an object. Double-check that you're not inadvertently assigning an object to complain elsewhere in your code.
              Verify that the complain state is not being mutated directly. React requires immutable state updates, so make sure you're using the proper methods to update the state array.
              Confirm that the <span> elements are being rendered correctly. Check if any of the elements within the complain array contain objects instead of strings or numbers. If that's the case, you need to extract the required string or number from those objects before rendering them in the <span> elements. */}
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
