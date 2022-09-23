import "./App.css";
import Home from "./components/Home/Home";
import Professor from "./components/Professor/Professor";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Students from "./components/Students/Students";
import { NoMatch } from "./components/NoMatch/NoMatch";
import { Routes, Route } from "react-router-dom";
import InvalidUser from "./components/InvalidUser/InvalidUser";
import AuthProvider from "./Authorization/AuthProvider";
import RequireAuth from "./RequireAuth/RequireAuth";
import Loading from "./components/Loading/Loading";
import Unauthorised from "./components/Unauthorised/Unauthorised";
import Register from "./components/Register/Register";

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
            path="/students"
            element={
              <RequireAuth>
                <Students />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/invaliduser" element={<InvalidUser />} />
          <Route path="/unauthorised" element={<Unauthorised />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
