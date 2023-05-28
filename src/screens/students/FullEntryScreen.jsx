import { useState, useRef, useEffect } from "react";

// React-router-dom
import { useNavigate } from "react-router-dom";

//STYLESHEET
import "../screens.css";

//REACT-ICONS
import { IoPersonAddSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";

import { useLocation } from "react-router-dom";

// COMPONENTS
import DateFormat from "../../components/DateFormat";

const FullEntryScreen = () => {
  const [tempReading, setTempReading] = useState(0.0);
  const [complain, setComplain] = useState("");
  const [ailment, setAilment] = useState("");
  const [medication, setMedication] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  // useNavigate() hook to handle redirects in react-router-dom
  const redirectNavigation = useNavigate();

  const location = useLocation();
  let URL_data_array = [];
  URL_data_array = location.search.split("%20");

  //Get the key-value pairs
  const keyValuePairs = URL_data_array.map((eachElement) => {
    const [key, value] = eachElement.split("=");
    return { [key]: value };
  });

  const grabTempReading = (event) => {
    setTempReading(event.target.value);
  };

  const grabComplain = (event) => {
    setComplain(event.target.value);
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
    if (
      tempReading == 0.0 ||
      complain == "" ||
      ailment == "" ||
      medication == ""
    ) {
      M.toast({ html: "FILL IN ALL INPUTS!", classes: "red lighten-1" });
    } else {
      const api_endpoint = "http://localhost:3000/student-full-entry";

      const student_data = {
        studentAdmNo: keyValuePairs[11].studentAdmNo,
        tempReading: tempReading,
        complain: complain,
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
                  displayLength: 5000,
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

  return (
    <>
      <div className="row">
        <div className="container-fluid">
          {/* Main Body Content */}
          <div className="col l12 section main">
            <div className="card full-entry-padding">
              <div className="card-content">
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
                            <b>{keyValuePairs[5].tempReading}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Complain : </p>
                          </td>
                          <td>
                            <b>{keyValuePairs[6].complain}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Ailment : </p>
                          </td>
                          <td>
                            <b>{keyValuePairs[7].ailment}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Medication : </p>
                          </td>
                          <td>
                            <b>{keyValuePairs[8].medication}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Last time here : </p>
                          </td>
                          <td>
                            <b>
                              {DateFormat(
                                keyValuePairs[9].timestamp +
                                  " " +
                                  Object.keys(keyValuePairs[10])[0]
                              )}
                            </b>
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
                      onKeyDown={handleKeyPressed}
                      onChange={grabComplain}
                    />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullEntryScreen;
