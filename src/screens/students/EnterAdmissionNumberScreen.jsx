import { useState } from "react";
// react-router-dom
import { Link, Outlet } from "react-router-dom";
//STYLESHEET
import "../screens.css";

// react icons
import { IoChevronForward } from "react-icons/io5";

// Initialize Materialize Modals
// Initialize Jquery using jsdom

$(document).ready(function () {
    $(".modal").modal();

    //Prevent the enter-admission-number-modal from being dismissed when user clicks on overlay
    $(".modal").modal({ dismissible: false });
});

let hasRun;
const EnterAdmissionNumber = () => {
    const [studentAdmNo, setStudentAdmNo] = useState(0);
    const [fName, setFirstName] = useState("");
    const [sName, setSecondName] = useState("");
    const [studentClass, setStudentClass] = useState("");


    const fetchAdmissionNumber = async () => {
        //Send student admission no. to the API endpoint : http://localhost:13256
        const response = await fetch(
            `http://localhost:3000/students/${studentAdmNo}`
        );
        if (response.ok) {
            const data = await response.json();

            //   Access the first element of the array

            if (data.length != 0) {
                const student = data[0];
                const { fName, sName, class: studentClass } = student;
                setFirstName(fName);
                setSecondName(sName);
                setStudentClass(studentClass);
            } else {
                setFirstName("");
            }
        } else {
            console.error("Failed to fetch data from API");
            alert("DATA API ENDPOINT IS DOWN!");
        }

        hasRun = true;
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
                                        onChange={(e) => setStudentAdmNo(e.target.value)}
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
                                    >
                                        SUBMIT
                                    </button>
                                </a>

                                {/* ENTER ADMISSION NUMBER BOTTOM MODAL */}
                                <div id="enter-admission-number-modal" className="modal">
                                    {fName != "" ? (
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
                                                <Link to={`../full-entry/? studentAdmNo=${studentAdmNo} fName=${fName} sName=${sName} studentClass=${studentClass}`}>
                                                    <button className="btn waves-effect waves-green">
                                                        Full Entry
                                                    </button>
                                                </Link>
                                                <button className="btn waves-effect waves-green">
                                                    Quick Update
                                                </button>
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
