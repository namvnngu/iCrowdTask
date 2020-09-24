import React, { useContext, useEffect, useState } from "react";
import validateLogin from "../utils/validatorLogin";
import axios from "axios";
import { URL, clientId } from "../utils/constants";
import { Redirect } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { addGoogleUser, checkUserExists } from "../utils/GoogleUser";
import Cookies from "js-cookie";
import AuthContext from "../contexts/authContext";
import { Link } from "react-router-dom";

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
        <GoogleLogin setError={setError} setRedirect={setRedirect} />
      </form>
      <CreateAccount />
    </div>
  );
};

const IncorrectMessage = ({ setError, error }) => {
  return (
    <div className="incorrect">
      <div className="message">{error}</div>
      <div className="symbol" onClick={() => setError(null)}>
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};
const EmailInput = ({ user, setUser, setError }) => {
  const handleChange = (e) => {
    setError(null);
    setUser({ ...user, email: e.target.value });
  };
  return (
    <div className="email">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        required
        onChange={handleChange}
        value={user.email}
      />
    </div>
  );
};
const PasswordInput = ({ user, setUser, setError }) => {
  const handleChange = (e) => {
    setError(null);
    setUser({ ...user, password: e.target.value });
  };
  return (
    <div className="password">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        onChange={handleChange}
        value={user.password}
      />
    </div>
  );
};
const PasswordConfig = ({ user, setUser, setError }) => {
  const handleChange = (e) => {
    setError(null);
    setUser({ ...user, savePassowrd: e.target.value });
  };

  return (
    <div className="password-config">
      <div className="save">
        <input type="checkbox" name="save" id="save" onChange={handleChange} />
        <label htmlFor="save">Save password</label>
      </div>
      <div className="forgot">
        <Link to="/recovery/forgot">Forgot?</Link>
      </div>
    </div>
  );
};
const SubmitButton = () => {
  return (
    <div className="submit">
      <button type="submit">Login</button>
    </div>
  );
};
const GoogleLogin = ({ setError, setRedirect }) => {
  const onSuccess = async (res) => {
    const existingUser = await checkUserExists(res.profileObj.googleId);
    if (!existingUser) {
      addGoogleUser(res.profileObj);
    }
    let timeExpire = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set("alias", res.profileObj.googleId, {
      expires: timeExpire,
      sameSite: "strict",
    });
    setRedirect(true);
  };
  const onFailure = (res) => {
    console.log("Failure");
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });
  return (
    <div className="google-login">
      <div className="google-button" id="google-button" onClick={signIn}>
        <span className="google-button-icon" onClick={() => setError(null)}>
          <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
              id="Shape"
              fill="#EA4335"
            />
            <path
              d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
              id="Shape"
              fill="#FBBC05"
            />
            <path
              d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
              id="Shape"
              fill="#4285F4"
            />
            <path
              d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
              fill="#34A853"
            />
          </svg>
        </span>
        <span className="google-button-text">Sign in with Google</span>
      </div>
    </div>
  );
};
const CreateAccount = () => {
  return (
    <div className="sign-up-account">
      <Link to="/signup">Create a new account</Link>
    </div>
  );
};
export default Login;
