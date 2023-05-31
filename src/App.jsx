import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// COMPONENTS
import Table from "./components/Table";
import NewData from "./components/NewData";

// SCREENS
import HomeScreen from "./screens/HomeScreen";
import EnterAdmissionNumberScreen from "./screens/students/EnterAdmissionNumberScreen";
import QuickUpdateScreen from "./screens/students/QuickUpdateScreen";
import FullEntry from "./screens/students/FullEntryScreen";
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
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<HomeScreen />} />
                        <Route path="report-screen" element={<ReportScreen />} />
                        <Route
                            path="enter-admission-number-screen"
                            element={<EnterAdmissionNumberScreen />}
                        />
                        <Route
                            path="quick-update-screen"
                            element={<QuickUpdateScreen />}
                        />
                        <Route path="full-entry" element={<FullEntry />} />
                    </Route>
                </Routes>
            </BrowserRouter>

            {/* HOME SCREEN */}
            {/*<HomeScreen />*/}

            {/*STUDENT SECTION*/}
            {/* <EnterAdmissionNumberScreen /> */}

            {/* To activate the Report Table, uncomment this */}
            {/* <ReportScreen customStyles={customStyles} /> */}
            {/* </div>  */}
        </>
    );
}

export default App;
