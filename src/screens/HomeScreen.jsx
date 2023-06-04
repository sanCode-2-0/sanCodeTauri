import "./screens.css";

// react-router-dom
import { Link, Outlet } from "react-router-dom";

// react icons
import { IoChevronForward } from "react-icons/io5";

const HomeScreen = () => {
  return (
    <>
      <div className="row">
        <div className="container-fluid">
          {/* Main Body Content */}
          <div className="col l12 section main">
            <div className="card light-blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Choose a category : </span>
              </div>
              <div className="card-action">
                <div className="row">
                  <Link to="/enter-admission-number-screen?reload=true">
                    <button className="waves-effect waves-light btn">
                      STUDENTS
                    </button>
                  </Link>

                  <Link to="/enter-id-number-screen?reload=true">
                    <button className="waves-effect waves-light btn">
                      STAFF
                    </button>
                  </Link>

                  <Link to="/report-screen">
                    <button className="waves-effect waves-light btn">
                      REPORT
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Breadcrumbs section and logo */}
          <div className="bottom sticky-bottom mt-auto">
            <hr />
            <div className="col l8">
              <nav>
                <div className="nav-wrapper light-blue darken-1">
                  <Link to={"/"}>Home</Link>
                  <IoChevronForward />
                  <Link to={"/"}>Select a category</Link>
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

export default HomeScreen;
