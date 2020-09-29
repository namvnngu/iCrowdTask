import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import { URL } from "../utils/constants";

const ResetPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState({
    password: "",
    rePassword: "",
  });
  const [invalid, setInvalid] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    axios.get(`${URL}/recovery/reset-password/${id}`).then(({ data }) => {
      if (data.message === "invalid") {
        setInvalid(true);
      }
    });
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = validatePassword(password);
    if (!success) {
      setError(message);
      setPassword({ password: "", rePassword: "" });
    } else {
      const { data } = await axios.post(
        `${URL}/recovery/reset-password/${id}`,
        {
          ...password,
        }
      );
      console.log(data);
      if (data.message === "login") {
        setRedirect(true);
      } else {
        setInvalid(true);
      }
    }
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : !invalid ? (
        <div className="reset-password">
          <div className="form-name">
            <h2>Reset Password</h2>
          </div>
          <form className="form-body" onSubmit={handleSubmit}>
            {error && <ErrorMessage error={error} />}
            <PasswordInput
              password={password}
              setPassword={setPassword}
              setError={setError}
            />
            <SubmitButton />
          </form>
          <BackToLogin />
        </div>
      ) : (
        <div className="success">
          <h2>This link expired</h2>
          <img src={"/img/invalid.svg"} alt="Success" />
          <a href="/login">Come back to Login</a>
        </div>
      )}
    </>
  );
};
const ErrorMessage = ({ error }) => {
  return (
    <div className="incorrect">
      <div className="message">{error}</div>
    </div>
  );
};

const BackToLogin = () => {
  return (
    <div className="login">
      <Link to="/login">Back to Log in</Link>
    </div>
  );
};
const PasswordInput = ({ setError, setPassword, password }) => {
  const handlePassword = (e) => {
    setError(null);
    setPassword({ ...password, password: e.target.value });
  };
  const handleRepassord = (e) => {
    setError(null);
    setPassword({ ...password, rePassword: e.target.value });
  };
  return (
    <>
      <div className="password">
        <label forhtml="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={handlePassword}
          value={password.password}
        />
      </div>
      <div className="re-password">
        <label forhtml="rePassword">Confirm Password</label>
        <input
          type="password"
          name="rePassword"
          id="rePassword"
          required
          onChange={handleRepassord}
          value={password.rePassword}
        />
      </div>
    </>
  );
};
const SubmitButton = () => {
  return (
    <div className="submit">
      <button type="submit">Reset</button>
    </div>
  );
};
const validatePassword = ({ password, rePassword }) => {
  let message;
  if (!validator.equals(password, rePassword)) {
    message = "Password doesn't match with Confirm password";
    return { success: false, message };
  }
  if (!validator.isLength(password, { min: 8 })) {
    message = "Your password must be at least 8 character";
    return { success: false, message };
  }
  return { success: true, message: "" };
};

export default ResetPassword;
