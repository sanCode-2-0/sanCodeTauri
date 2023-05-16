import "./screens.css";

const HomeScreen = () => {
  return (
      <div className="row">
          <div className="container-fluid">
            {/* Main Body Content */}
            <div className="col l12 section main">
                <h5>Choose a category : </h5>
                <p>Student</p>
                <p>Staff</p>

            </div>

              {/* Breadcrumbs section and logo */}
              <div className="sticky-bottom mt-auto">
              <hr />
            <div className="col l8 center-align">
                <nav>
                    <div className="nav-wrapper">
                        <a href="#!" className="breadcrumb">
                            Home
                        </a>
                        <a href="#!" className="breadcrumb">
                             Choose category
                        </a>
                    </div>
                </nav>
            </div>
            {/* Logo goes here */}
              <div className="col l4 right-align">
                  <img src="../../src/assets/images/lomogan-logo.png" height="65" width="65"/>
              </div>
              </div>
          </div>
      </div>
  );
};

export default HomeScreen;
