import "./App.css";
import Home from "./components/Home/Home";
import Professor from "./components/Professor/Professor";
import Header from "./components/Header/Header";
import Hod from "./components/HOD/Hod";
import Lecturers from "./components/Lecturers/Lecturers";
import Login from "./components/Login/Login";
import Students from "./components/Students/Students";
import { NoMatch } from "./components/NoMatch/NoMatch";
import { Routes, Route } from "react-router-dom";
import Workers from "./components/Workers/Workers";
import InvalidUser from "./components/InvalidUser/InvalidUser";
import AuthProvider from "./Authorization/AuthProvider";
import RequireAuth from "./RequireAuth/RequireAuth";
import Unauthorised from "./components/Unauthorised/Unauthorised";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/professors"
            element={
              <RequireAuth>
                <Professor />
              </RequireAuth>
            }
          />
          <Route
            path="/hods"
            element={
              <RequireAuth>
                <Hod />
              </RequireAuth>
            }
          />
          <Route
            path="/lecturers"
            element={
              <RequireAuth>
                <Lecturers />
              </RequireAuth>
            }
          />
          <Route
            path="/students"
            element={
              <RequireAuth>
                <Students />
              </RequireAuth>
            }
          />
          <Route
            path="/workers"
            element={
              <RequireAuth>
                <Workers />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/invaliduser" element={<InvalidUser />} />
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
