import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// COMPONENTS
import Table from "./components/Table";
import NewData from "./components/NewData";

// SCREENS
import HomeScreen from "./screens/HomeScreen";
import StudentDetailsUploadScreen from "./screens/StudentDetailsUploadScreen";
import EnterAdmissionNumberScreen from "./screens/students/EnterAdmissionNumberScreen";
import QuickUpdateScreen from "./screens/students/QuickUpdateScreen";
import FullEntry from "./screens/students/FullEntryScreen";
import FullEdit from "./screens/students/FullEditScreen";
import ReportScreen from "./screens/ReportScreen";
import AnalyticsScreen from "./screens/Analytics/AnalyticsScreen.jsx";
// STAFF
import EnterIDNumberScreen from "./screens/staff/EnterIDNumberScreen.jsx";
import StaffQuickUpdateScreen from "./screens/staff/StaffQuickUpdateScreen.jsx";
import StaffFullEntryScreen from "./screens/staff/StaffFullEntryScreen.jsx";

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
              path="excel-upload"
              element={<StudentDetailsUploadScreen />}
            />
            {/*STUDENT SCREENS*/}
            <Route
              path="enter-admission-number-screen"
              element={<EnterAdmissionNumberScreen />}
            />
            <Route path="quick-update-screen" element={<QuickUpdateScreen />} />
            <Route path="full-entry" element={<FullEntry />} />
            <Route path="full-edit" element={<FullEdit />} />

            {/*STAFF SCREENS*/}
            <Route
              path={"enter-id-number-screen"}
              element={<EnterIDNumberScreen />}
            />
            <Route
              path={"staff-quick-update-screen"}
              element={<StaffQuickUpdateScreen />}
            />
            <Route
              path={"staff-full-entry-screen"}
              element={<StaffFullEntryScreen />}
            />
            <Route path={"report-screen"} element={<ReportScreen />} />
            <Route
              path={"table-report"}
              element={<Table customStyles={customStyles} />}
            />
            {/*ANALYTICS*/}
            <Route path={"analytics-report"} element={<AnalyticsScreen />} />
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
