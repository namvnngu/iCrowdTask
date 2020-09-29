import React, { useContext, useEffect, useState } from "react";
import validateLogin from "../utils/validatorLogin";
import axios from "axios";
import { URL } from "../utils/constants";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../contexts/authContext";
import GoogleLogin from "../components/Login/GoogleLogin";
import CreateAccount from "../components/Login/CreateAccount";
import SubmitButton from "../components/Login/SubmitButton";
import PasswordConfig from "../components/Login/PasswordConfig";
import IncorrectMessage from "../components/Login/IncorrectMessage";
import PasswordInput from "../components/Login/PasswordInput";
import EmailInput from "../components/Login/EmailInput";
import LoginWithFace from "../components/Login/LoginWithFace";

const Login = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    savePassowrd: "off",
  });
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = validateLogin(user, setUser);
    if (!success) {
      setError(message);
    } else {
      const { data } = await axios.post(`${URL}/login`, { ...user });
      if (data.user) {
        let timeExpire;
        if (user.savePassowrd === "on") {
          timeExpire = new Date(new Date().getTime() + 60 * 60 * 1000);
        } else {
          timeExpire = new Date(new Date().getTime() + 60 * 1000);
        }
        Cookies.set("alias", data.user._id, {
          expires: timeExpire,
          sameSite: "strict",
        });
        setRedirect(true);
      } else {
        setUser({ ...user, password: "", email: "" });
        setError(data.info.message);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (redirect) {
        auth.setAuth(true);
      }
    };
  });

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <div className="form-name">
        <h2>iCrowdTask Login</h2>
      </div>
      <form className="form-body" onSubmit={handleSubmit}>
        {error && <IncorrectMessage error={error} setError={setError} />}
        <EmailInput user={user} setUser={setUser} setError={setError} />
        <PasswordInput user={user} setUser={setUser} setError={setError} />
        <PasswordConfig user={user} setUser={setUser} setError={setError} />
        <SubmitButton />
        <LoginWithFace />
        <GoogleLogin setError={setError} setRedirect={setRedirect} />
      </form>
      <CreateAccount />
    </div>
  );
};

export default Login;
