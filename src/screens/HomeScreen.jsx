import "./screens.css";

const HomeScreen = () => {
  return (
    <div className="row">
      {/* Main Body Content */}
      <div className="col l12 section">
        <h5>Section Main</h5>
        <p>Some content</p>

        <hr />
      </div>

      {/* Breadcrumbs section and logo */}
      <div className="col l8">
        <nav>
          <div className="nav-wrapper">
            <a href="javascript:void(0)" className="breadcrumb">
              Home
            </a>
          </div>
        </nav>
      </div>
      {/* Logo goes here */}
      <div className="col l4"></div>
    </div>
  );
};

export default HomeScreen;
