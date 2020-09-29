import React, { useEffect, useState } from "react";
import "./styles/styles.css";
import Home from "./pages/Home";
import { Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ProtectedHome, ProtectedLogin } from "./components/ProtectedRoute";
import AuthContext from "./contexts/authContext";
import Cookies from "js-cookie";
import ResetSendingEmail from "./pages/ResetSendingEmail";
import ResetPassword from "./pages/ResetPassword";
import EmailInputToFace from "./pages/EmailInputToFace";
import FaceRecognition from "./pages/FaceRecognition";

function App() {
  const [auth, setAuth] = useState(false);
  const alias = Cookies.get("alias");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (alias) {
      setAuth(true);
    }
  }, [auth, setAuth, alias]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Switch>
          <ProtectedHome exact path="/" auth={auth} component={Home} />
          {loading ? (
            <></>
          ) : (
            <>
              <ProtectedLogin
                exact
                path="/signup"
                auth={auth}
                component={Signup}
              />
              <ProtectedLogin
                exact
                path="/login"
                auth={auth}
                component={Login}
              />
              <ProtectedLogin
                exact
                path="/recovery/forgot"
                auth={auth}
                component={ResetSendingEmail}
              />
              <ProtectedLogin
                exact
                path="/recovery/reset-password/:id"
                auth={auth}
                component={ResetPassword}
              />
              <ProtectedLogin
                exact
                path="/login/face/email"
                auth={auth}
                component={EmailInputToFace}
              />
              <ProtectedLogin
                exact
                path="/login/face/"
                auth={auth}
                component={FaceRecognition}
              />
            </>
          )}
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
