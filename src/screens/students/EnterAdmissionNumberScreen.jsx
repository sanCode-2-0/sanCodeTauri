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

const EnterAdmissionNumber = () => {
  const [studentAdmNo, setStudentAdmNo] = useState(0);

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
                  <button className="waves-effect waves-light btn center-align">
                    SUBMIT
                  </button>
                </a>

                {/* ENTER ADMISSION NUMBER BOTTOM MODAL */}
                <div id="enter-admission-number-modal" className="modal">
                  <div className="modal-content bottom-sheet">
                    <h4>Modal Header</h4>
                    <p>{studentAdmNo}</p>
                  </div>
                  <div className="modal-footer">
                    <a
                      href="#!"
                      className="modal-close waves-effect waves-green btn-flat"
                    >
                      Agree
                    </a>
                  </div>
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
