import { useState, useRef, useEffect } from "react";
// react-router-dom
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
//STYLESHEET
import "../screens.css";

// react icons
import { IoChevronForward } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

// import summary table
import SummaryTable from "../../components/staffSummary.jsx";

// Initialize Materialize Modals
// Initialize Jquery using jsdom

$(document).ready(function () {
    $(".modal").modal();

    //Prevent the enter-admission-number-modal from being dismissed when user clicks on overlay
    $(".modal").modal({ dismissible: false });
});

let hasRun;
const EnterIDNumberScreen = () => {
    // Grab Data in the URL
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let paramValue = params.get("reload");
    // If paramValue is not false, reload the page
    const redirectNavigation = useNavigate();

    useEffect(() => {
        if (paramValue != null) {
            // useNavigation() hook to handle redirects in react-router-dom
            window.location.href = "/enter-id-number-screen";
        }
    }, [paramValue]);

    const [idNo, setIdNo] = useState();
    const [fName, setFirstName] = useState("");
    const [sName, setSecondName] = useState("");
    const [tempReading, setTempReading] = useState("");
    const [complain, setComplain] = useState("");
    const [ailment, setAilment] = useState("");
    const [medication, setMedication] = useState("");
    const [timestamp, setTimeStamp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchIdNumber = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `http://localhost:3000/staff/${idNo}`
            );

            if (response.ok) {
                const data = await response.json();

                // Access the first element of the array
                if (data.length !== 0) {
                    const staff = data[0];
                    const {
                        fName,
                        sName,
                        tempReading,
                        complain,
                        ailment,
                        medication,
                        timestamp,
                    } = staff;

                    setFirstName(fName);
                    setSecondName(sName);
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

    const grabIdNo = (event) => {
        setIdNo(event.target.value);
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
                                <span className="card-title">Enter an ID Number : </span>

                                <div className="input-field row">
                                    <input
                                        id="id_no"
                                        type="text"
                                        className="light-blue darken-2"
                                        autoFocus
                                        autoComplete="on"
                                        onKeyDown={handleKeyPressed}
                                        onChange={grabIdNo}
                                    />
                                    <label htmlFor="id_no" className="white-text">
                                        ID No.
                                    </label>
                                    <span className={"helper-text white-text"}>( Kenyan National ID )</span>
                                </div>
                            </div>
                            <div className="card-action center-align">
                                <a
                                    className="modal-trigger"
                                    href="#enter-id-number-modal"
                                >
                                    <button
                                        className="waves-effect waves-light btn center-align"
                                        onClick={fetchIdNumber}
                                        ref={buttonRef}
                                    >
                                        SUBMIT (
                                        <small>
                                            <IoReturnDownBackOutline /> Enter
                                        </small>
                                        )
                                    </button>
                                    <hr />

                                </a>
                                <a
                                    className="modal-trigger"
                                    href="#view-summary-modal"
                                >
                                    <button className={"btn light-blue right"}>
                                        <small>
                                            <IoPersonOutline/>
                                            View Summary
                                        </small>
                                    </button>
                                </a>

                                {/*VIEW SUMMARY MODAL*/}
                                <div id="view-summary-modal" className="modal bottom-sheet modal-fixed-footer view-summary-modal">
                                    <>
                                        <div className="modal-content left-align">
                                            <SummaryTable/>
                                        </div>
                                        <div className={"modal-footer"}>
                                        <a
                                            href=""
                                            className="modal-close waves-effect waves-green"
                                        >
                                            <button className={"btn"}>CLOSE</button>
                                        </a>
                                        </div>
                                    </>
                                </div>



                                {/* ENTER ID NUMBER BOTTOM MODAL */}

                                <div id="enter-id-number-modal" className="modal">
                                    {fName !== "" ? (
                                        <>
                                            <div className="modal-content bottom-sheet left-align">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td>ID Number : </td>
                                                        <td>
                                                            <b>{idNo}</b>
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
                                                    </tbody>
                                                </table>
                                                <blockquote>Choose an action</blockquote>
                                                <Link
                                                    to={`../staff-full-entry-screen/?idNo=[${idNo}],fName=[${fName}],sName=[${sName}],tempReading=[${tempReading}],complain=[${complain}],ailment=[${ailment}],medication=[${medication}],timestamp=[${timestamp}]`}
                                                >
                                                    <button className="btn waves-effect waves-green">
                                                        Full Entry
                                                    </button>
                                                </Link>
                                                <Link
                                                    to={`../staff-quick-update-screen/?idNo=[${idNo}],fName=[${fName}],sName=[${sName}],tempReading=[${tempReading}],complain=[${complain}],ailment=[${ailment}],medication=[${medication}],timestamp=[${timestamp}]`}
                                                >
                                                    <button className="btn waves-effect waves-green">
                                                        Quick Update
                                                    </button>
                                                </Link>
                                                <br />
                                                <small>
                                                    * Full Entry : Create a new record for the staff member
                                                </small>
                                                <br />
                                                <small>
                                                    * Quick Update : Only update the temperature reading
                                                    of the staff member
                                                </small>
                                                <a
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
                                                    NO RECORD MATCHING THAT ID NUMBER{" "}
                                                    <b>({idNo})</b> FOUND!
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
                                    <a href="">Enter an ID number</a>
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

export default EnterIDNumberScreen;
