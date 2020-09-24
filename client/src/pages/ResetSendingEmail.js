import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import validator from "validator";
import { URL } from "../utils/constants";

const ResetSendingEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      const { data } = await axios.post(`${URL}/recovery/forgot`, {
        email,
      });
      if (data.user === "") {
        setError(data.message);
      } else {
        setSent(data.message);
        setEmail("");
      }
    } else {
      setError("Please provide correct email");
    }
  };
  return (
    <div className="forgot-password">
      <div className="form-name">
        <p>Please enter your email to reset your password</p>
      </div>
      <form className="form-body" onSubmit={hanldeSubmit}>
        {error && <ErrorMessage error={error} setError={setError} />}
        {sent && <EmailSent />}
        <EmailInput setEmail={setEmail} setError={setError} email={email} />
        <SubmitButton />
      </form>
      <BackToLogin />
    </div>
  );
};
const EmailSent = () => {
  return (
    <div
      style={{
        fontSize: "0.8rem",
        textAlign: "center",
        margin: "10px",
        fontWeight: "bold",
        color: "#ff0099",
      }}
    >
      Email Sent
    </div>
  );
};
const SubmitButton = () => {
  return (
    <div className="submit">
      <button type="submit">Send email</button>
    </div>
  );
};
const EmailInput = ({ email, setEmail, setError }) => {
  const handleChange = (e) => {
    setError(null);
    setEmail(e.target.value);
  };
  return (
    <div className="email">
      <label forhtml="email"></label>
      <input
        type="email"
        name="email"
        id="email"
        required
        onChange={handleChange}
        value={email}
      />
    </div>
  );
};
const BackToLogin = () => {
  return (
    <div className="log-in">
      <Link to="/login">Back to Log in</Link>
    </div>
  );
};
const ErrorMessage = ({ error, setError }) => {
  return (
    <div className="incorrect">
      <div className="message">{error}</div>
      <XSymbol setError={setError} />
    </div>
  );
};
const XSymbol = ({ setError }) => {
  return (
    <div className="symbol" onClick={() => setError(null)}>
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default ResetSendingEmail;
