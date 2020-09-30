import React, { useState } from "react";
import validateSignUp from "../utils/validatorSignup";
import { Redirect } from "react-router-dom";
import { URL } from "../utils/constants";
import axios from "axios";
import Uploader from "../components/Uploader";
import CountryInput from "../components/Signup/ContryInput";
import NameInput from "../components/Signup/NameInput";
import EmailInput from "../components/Signup/EmailInput";
import PasswordInput from "../components/Signup/PasswordInput";
import AddressInput from "../components/Signup/AddressInput";
import CityInput from "../components/Signup/CityInput";
import ZipCodeInput from "../components/Signup/ZipCodeInput";
import WaringSign from "../components/Signup/WarningSign";
import WarningMessage from "../components/Signup/WarningMessage";
import PhoneInput from "../components/Signup/PhoneInput";
import SubmitButton from "../components/Signup/SubmitButton";
import LoginBack from "../components/Signup/LoginBack";
import SaveImage from "../components/Signup/SaveImage";
import ProgressNumber from "../components/Signup/Progress";
import saveStorage from "../firebase/useStorage";
import { firestore } from "../firebase/config";

const Signup = () => {
  const [user, setUser] = useState({
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [numberProgress, setNumberProgress] = useState(null);
  const [url, setUrl] = useState(null);

  const handleSubmit = async (e) => {
    const collectionRef = firestore.collection("images");
    e.preventDefault();
    const { success, message } = validateSignUp(user, setUser);
    if (image !== null) {
      if (!success) {
        setError(message);
      } else {
        const { data } = await axios.post(`${URL}/signup`, { ...user });
        if (data.error) {
          setError(data.error);
        } else {
          setRedirect(true);
          collectionRef.doc().set({ face: data._id, url });
        }
      }
    } else {
      setError("Please provide your face photo");
    }
  };

  const onSave = async () => {
    if (!image) {
      setError("Please provide your face photo");
    } else {
      saveStorage(image, setNumberProgress, setUrl, setError);
    }
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="registration">
      <div className="form-name">
        <h2>Create an iCrowdTask account</h2>
      </div>
      <form className="form-body" onSubmit={handleSubmit}>
        <WaringSign />
        {error && <WarningMessage error={error} setError={setError} />}
        <Uploader image={image} setImage={setImage} setError={setError} />
        {image && <SaveImage onSave={onSave} />}
        {numberProgress !== null && (
          <ProgressNumber
            setNumberProgress={setNumberProgress}
            numberProgress={numberProgress}
            url={url}
          />
        )}
        <CountryInput user={user} setUser={setUser} setError={setError} />
        <NameInput user={user} setUser={setUser} setError={setError} />
        <EmailInput user={user} setUser={setUser} setError={setError} />
        <PasswordInput user={user} setUser={setUser} setError={setError} />
        <AddressInput user={user} setUser={setUser} setError={setError} />
        <CityInput user={user} setUser={setUser} setError={setError} />
        <ZipCodeInput user={user} setUser={setUser} setError={setError} />
        <PhoneInput user={user} setUser={setUser} setError={setError} />
        <SubmitButton />
      </form>
      <LoginBack />
    </div>
  );
};

export default Signup;
