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

const StaffFullEntryScreen = () => {
  const [tempReading, setTempReading] = useState(0.0);
  const [complain, setComplain] = useState([]);
  const [ailment, setAilment] = useState("");
  const [medication, setMedication] = useState("");
  const [complainInputValue, setComplainInputValue] = useState("");

  // useNavigate() hook to handle redirects in react-router-dom
  const redirectNavigation = useNavigate();

  const location = useLocation();

  let idNo_display;
  let tempReading_display;
  let complain_display;
  let ailment_display;
  let medication_display;
  let timestamp_display;

  const queryString = location.search.slice(1); // Remove the leading "?"
  const keyValuePairs = queryString.split(",");

  const params = {};
  keyValuePairs.forEach((keyValuePair) => {
    const equalsIndex = keyValuePair.indexOf("=");
    const key = keyValuePair.substring(0, equalsIndex);
    const value = keyValuePair.substring(equalsIndex + 1);
    params[key] = decodeURIComponent(value.replace(/\[|\]/g, ""));
  });

  // Access the individual parameters
  idNo_display = params["idNo"];
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
    if (complain.join(", ") == "") {
      updatedArray = [...complain, complainInputValue.trim()];
      setComplain(updatedArray);
      setComplainInputValue("");
    }

    if (tempReading == 0.0 || ailment == "" || medication == "") {
      M.toast({ html: "FILL IN ALL INPUTS!", classes: "red lighten-1" });
    } else {
      const api_endpoint = "http://localhost:3000/staff-full-entry";

      const staff_data = {
        idNo: idNo_display,
        tempReading: tempReading,
        complain: updatedArray.join(", ") || complain.join(", "),
        ailment: ailment,
        medication: medication,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staff_data),
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
                    redirectNavigation("/enter-id-number-screen?reload=true"),
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

  const redirectToEnterIdNoScreen = () => {
    window.location.href = "/enter-id-number-screen?reload=true";
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
                    onClick={redirectToEnterIdNoScreen}
                  >
                    <IoArrowBackCircleSharp size={"34"} color={"#fff"} />
                  </button>
                  <hr />
                </i>
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
                            <b>{complain_display}</b>
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
                      id="last_name"
                      ref={inputRef2}
                      type="text"
                      required
                      //   onKeyDown={handleKeyPressed}
                      //   onChange={grabComplain}
                      value={complainInputValue}
                      onChange={(entry) => {
                        setComplainInputValue(entry.target.value);
                      }}
                    />
                    <button className="btn" onClick={addComplain}>
                      <small>Add Complain+</small>
                    </button>
                    <label htmlFor="last_name">Complains *</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="first_name"
                      ref={inputRef3}
                      type="text"
                      autoFocus
                      required
                      onKeyDown={handleKeyPressed}
                      onChange={grabAilment}
                    />
                    <label htmlFor="first_name">Ailment *</label>
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
                Quick Tip : Use the arrow keys{" "}
                <small>
                  <b>Arrow Up</b>
                </small>{" "}
                and{" "}
                <small>
                  <b>Arrow Down</b>
                </small>{" "}
                to navigate.
              </div>
            </div>

            <div className="chip complain-text">
              <b>Complains :</b> {complain.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffFullEntryScreen;
