import { Dashboard } from "./components/Dashboard/index";
import { Login } from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { School } from "./components/Dashboard/components/School";
import { Home } from "./components/Dashboard/components/Home";
import { Course } from "./components/Dashboard/components/Course";
import { Student } from "./components/Dashboard/components/Student";
import { NewInput } from "./components/Dashboard/components/NewInput";
import { Average } from "./components/Dashboard/components/Average";
import { Settings } from "./components/Dashboard/components/Settings";
import { Period } from "./components/Dashboard/components/Period";
import { AllInput } from "./components/Dashboard/components/AllInput";
import { Qualify } from "./components/Dashboard/components/Qualify";
import { Protected } from "./components/Protected";
import { privateRoutes, publicRoutes } from "./components/constants/router";
import { Public } from "./components/Public";
import { InputTest } from "./components/Dashboard/components/InputTest"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={privateRoutes.DASHBOARD} />} />
          <Route element={<Public />}>
            <Route path={publicRoutes.LOGIN} element={<Login />} />
          </Route>
          <Route element={<Protected />}>
            <Route path={privateRoutes.DASHBOARD} element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path={privateRoutes.SCHOOL} element={<School />} />
              <Route path={privateRoutes.PERIODS} element={<Period />} />
              <Route path={privateRoutes.COURSES} element={<Course />} />
              <Route path={privateRoutes.STUDENTS} element={<Student />} />
              <Route path={privateRoutes.NEW_INPUT} element={<NewInput />} />
              <Route path={privateRoutes.QUALIFY} element={<Qualify />} />
              <Route path={privateRoutes.ALL_INPUTS} element={<AllInput />} />
              <Route path={privateRoutes.SETTINGS} element={<Settings />} />
              <Route path={privateRoutes.AVERAGE} element={<Average />} />
              <Route path={privateRoutes.INPUT_TEST} element={<InputTest />} />
            </Route>
          </Route>
          <Route path="*" element={<>PAGE NOT FOUND</>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
