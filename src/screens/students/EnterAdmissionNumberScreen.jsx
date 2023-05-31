import { useState, useRef, useEffect } from "react";
// react-router-dom
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
//STYLESHEET
import "../screens.css";

// react icons
import { IoChevronForward } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";

// Initialize Materialize Modals
// Initialize Jquery using jsdom

$(document).ready(function () {
  $(".modal").modal();

  //Prevent the enter-admission-number-modal from being dismissed when user clicks on overlay
  $(".modal").modal({ dismissible: false });
});

let hasRun;
const EnterAdmissionNumber = () => {
  // Grab Data in the URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let paramValue = params.get("reload");
  // If paramValue is not false, reload the page
  const redirectNavigation = useNavigate();

  useEffect(() => {
    if (paramValue != null) {
      // useNavigation() hook to handle redirects in react-router-dom
      window.location.href = "/enter-admission-number-screen";
    }
  }, [paramValue]);

  const [studentAdmNo, setStudentAdmNo] = useState();
  const [fName, setFirstName] = useState("");
  const [sName, setSecondName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [tempReading, setTempReading] = useState("");
  const [complain, setComplain] = useState("");
  const [ailment, setAilment] = useState("");
  const [medication, setMedication] = useState("");
  const [timestamp, setTimeStamp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdmissionNumber = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/students/${studentAdmNo}`
      );

      if (response.ok) {
        const data = await response.json();

        // Access the first element of the array
        if (data.length !== 0) {
          const student = data[0];
          const {
            fName,
            sName,
            class: studentClass,
            tempReading,
            complain,
            ailment,
            medication,
            timestamp,
          } = student;

          setFirstName(fName);
          setSecondName(sName);
          setStudentClass(studentClass);
          setTempReading(tempReading);
          setComplain(complain);
          setAilment(ailment);
          setMedication(medication);
          setTimeStamp(timestamp);
        } else {
          setFirstName("");
        }
      } else {
        console.error("Failed to fetch data from API");
        alert("DATA API ENDPOINT IS DOWN!");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      alert("An error occurred while fetching data");
    }

    setIsLoading(false);
    hasRun = true;
  };

  const grabAdmNo = (event) => {
    setStudentAdmNo(event.target.value);
  };

  const buttonRef = useRef();
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <>
      <div className="row">
        <div className="container-fluid">
          {/* Main Body Content */}
          <div className="col l12 section main">
            <div className="card light-blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Enter an Admission Number : </span>

                <div className="input-field row">
                  <input
                    id="adm_no"
                    type="text"
                    className="light-blue darken-2"
                    autoFocus
                    autoComplete="on"
                    onKeyDown={handleKeyPressed}
                    onChange={grabAdmNo}
                  />
                  <label htmlFor="email" className="white-text">
                    Admission Number
                  </label>
                </div>
              </div>
              <div className="card-action center-align">
                <a
                  className="modal-trigger"
                  href="#enter-admission-number-modal"
                >
                  <button
                    className="waves-effect waves-light btn center-align"
                    onClick={fetchAdmissionNumber}
                    ref={buttonRef}
                  >
                    SUBMIT (
                    <small>
                      <IoReturnDownBackOutline /> Enter
                    </small>
                    )
                  </button>
                </a>

                {/* ENTER ADMISSION NUMBER BOTTOM MODAL */}

                <div id="enter-admission-number-modal" className="modal">
                  {fName !== "" ? (
                    <>
                      <div className="modal-content bottom-sheet left-align">
                        <table>
                          <tbody>
                            <tr>
                              <td>Admission Number : </td>
                              <td>
                                <b>{studentAdmNo}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>First Name : </td>
                              <td>
                                <b>{fName}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>Second Name : </td>
                              <td>
                                <b>{sName}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>Class : </td>
                              <td>
                                <b>{studentClass}</b>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <blockquote>Choose an action</blockquote>
                        <Link
                          to={`../full-entry/?studentAdmNo=[${studentAdmNo}],fName=[${fName}],sName=[${sName}],studentClass=[${studentClass}],tempReading=[${tempReading}],complain=[${complain}],ailment=[${ailment}],medication=[${medication}],timestamp=[${timestamp}]`}
                        >
                          <button className="btn waves-effect waves-green">
                            Full Entry
                          </button>
                        </Link>
                        <Link
                            to={`../quick-update-screen/?studentAdmNo=[${studentAdmNo}],fName=[${fName}],sName=[${sName}],studentClass=[${studentClass}],tempReading=[${tempReading}],complain=[${complain}],ailment=[${ailment}],medication=[${medication}],timestamp=[${timestamp}]`}
                        >
                          <button className="btn waves-effect waves-green">
                            Quick Update
                          </button>
                        </Link>
                        <br />
                        <small>
                          * Full Entry : Create a new record for the student
                        </small>
                        <br />
                        <small>
                          * Quick Update : Only update the temperature reading
                          of the student
                        </small>
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green btn-flat"
                        >
                          CLOSE
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="modal-content">
                        <blockquote>
                          NO RECORD MATCHING THAT ADMISSION NUMBER{" "}
                          <b>({studentAdmNo})</b> FOUND!
                        </blockquote>
                        <p>{fName}</p>
                      </div>
                      <div className="modal-footer left-align">
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green"
                        >
                          Retry
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Breadcrumbs section and logo */}
          <div className="sticky-bottom mt-auto">
            <hr />
            <div className="col l8">
              <nav>
                <div className="nav-wrapper light-blue darken-1">
                  <Link to={"/"}>Home</Link>
                  <IoChevronForward />
                  <a href="">Enter an admission number</a>
                </div>
              </nav>
            </div>
            {/* Logo goes here */}
            <div className="col l4 right-align">
              <img
                src="../../src/assets/images/lomogan-logo.png"
                height="65"
                width="65"
              />
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default EnterAdmissionNumber;
