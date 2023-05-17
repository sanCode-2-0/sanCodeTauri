import React from "react";

// COMPONENTS
import Table from "./components/Table";
import NewData from "./components/NewData";

// SCREENS
import HomeScreen from "./screens/HomeScreen";
import EnterAdmissionNumberScreen from "./screens/students/EnterAdmissionNumberScreen";
import ReportScreen from "./screens/ReportScreen";

// Report table custom styles
const customStyles = {
    cells: {
        padding: "1cm",
    },
    header: {
        fontWeight: "bold",
    },
    table: {
        border: "1px solid black",
        borderCollapse: "collapse",
    },
    row: {
        borderBottom: "1px solid black",
    },
};

function App() {
    return (
        <div className="light-grey">
            {/*Add routing using Navigator Later*/}

            {/* HOME SCREEN */}
            {/*<HomeScreen />*/}

            {/*STUDENT SECTION*/}
            <EnterAdmissionNumberScreen />

            {/* To activate the Report Table, uncomment this */}
            {/* <ReportScreen customStyles={customStyles} /> */}
        </div>
    );
}

export default App;
