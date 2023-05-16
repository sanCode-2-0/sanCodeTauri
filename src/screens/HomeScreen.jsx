import "./screens.css";

// react icons
import { IoChevronForward } from "react-icons/io5";

const HomeScreen = () => {
  return (
    <div className="row">
      <div className="container-fluid">
        {/* Main Body Content */}
        <div className="col l12 section main">
          <div class="card light-blue darken-1">
            <div class="card-content white-text">
              <span class="card-title">Choose a category : </span>
            </div>
            <div class="card-action">
              <div className="row">
                <button className="waves-effect waves-light btn">
                  STUDENTS
                </button>
                <button className="waves-effect waves-light btn">STAFF</button>
                <button className="waves-effect waves-light btn">REPORT</button>
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
                <a href="">Home</a>
                <IoChevronForward />
                <a href="">Select a category</a>
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
};

export default HomeScreen;
