import { useState } from "react"
//STYLESHEET
import "../screens.css";

// react icons
import { IoChevronForward } from "react-icons/io5";

const EnterAdmissionNumber = () => {
    const [studentAdmNo, setStudentAdmNo] = useState(0);

    return (
        <div className="row">
            <div className="container-fluid">
                {/* Main Body Content */}
                <div className="col l12 section main">
                    <div className="card light-blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Enter an Admission Number : </span>

                            <div className="input-field row">
                                <input id="email" type="number" className="validate light-blue darken-2" autoFocus />
                                <label for="email" className="white-text">Admission Number</label>
                            </div>

                        </div>
                        <div class="card-action center-align">
                            <button className="waves-effect waves-light btn center-align">
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs section and logo */}
                <div className="sticky-bottom mt-auto">
                    <hr />
                    <div className="col l8">
                        <nav>
                            <div className="nav-wrapper light-blue darken-1">
                                <a href="">Home</a>
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
    );
}

export default EnterAdmissionNumber;