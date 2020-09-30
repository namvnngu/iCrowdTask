import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { URL } from "../utils/constants";
import BackToLogin from "../components/Face/BackToLogin";
import SubmitButton from "../components/Face/SubmitButton";
import EmailInput from "../components/Face/EmailInput";
import ErrorMessage from "../components/Face/ErrorMessage";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const EmailInputToFace = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      const { data } = await axios.get(`${URL}/workers/email/${email}`);
      if (data.user === "") {
        setError(data.message);
        setEmail("");
      } else {
        let timeExpire = new Date(new Date().getTime() + 60 * 10 * 1000);
        Cookies.set("face", data.user._id, {
          expires: timeExpire,
          sameSite: "strict",
        });
        setRedirect(true);
      }
    } else {
      setError("Please provide correct email");
      setEmail("");
    }
  };
  if (redirect) {
    return <Redirect to="/login/face" />;
  }
  return (
    <div className="forgot-password">
      <div className="form-name">
        <p>Please enter your email to start with face login</p>
      </div>
      <form className="form-body" onSubmit={hanldeSubmit}>
        {error && <ErrorMessage error={error} setError={setError} />}
        <EmailInput setEmail={setEmail} setError={setError} email={email} />
        <SubmitButton />
      </form>
      <BackToLogin />
    </div>
  );
};

export default EmailInputToFace;
