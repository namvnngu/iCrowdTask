import React, { useEffect, useState } from "react";
import countryList from "../data/country";
import validateSignUp from "../utils/validatorSignup";
import { Link, Redirect } from "react-router-dom";
import { URL } from "../utils/constants";
import axios from "axios";
import Uploader from "../components/Uploader";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = validateSignUp(user, setUser);
    if (image !== null) {
      if (!success) {
        setError(message);
      } else {
        const { data } = await axios.post(`${URL}/signup`, { ...user });
        // console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setRedirect(true);
        }
      }
    } else {
      setError("Please provide your face photo");
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

const CountryInput = ({ user, setUser, setError }) => {
  useEffect(() => {
    let countrySelect = document.getElementById("country");
    const optionTemplate = (country) =>
      `<option value="${country}">${country}</option>`;
    let options = `<option value="" disabled hidden selected>Choose from list</option>`;
    countryList.map((country) => {
      options += optionTemplate(country);
    });
    countrySelect.innerHTML = options;
  }, []);
  const handleChange = (e) => {
    setError(null);
    setUser({ ...user, country: e.target.value });
  };
  return (
    <div className="country" id="country-list">
      <label htmlFor="country">
        Country of residence<span className="warning-span">*</span>
      </label>
      <select name="country" id="country" onChange={handleChange}></select>
    </div>
  );
};
const NameInput = ({ user, setUser, setError }) => {
  const handleFirstName = (e) => {
    setError(null);
    setUser({ ...user, firstName: e.target.value });
  };
  const handleLastName = (e) => {
    setError(null);
    setUser({ ...user, lastName: e.target.value });
  };
  return (
    <div className="name">
      <div className="first-name">
        <label htmlFor="firstName">
          First name<span className="warning-span">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          id="first-name"
          onChange={handleFirstName}
        />
      </div>
      <div className="last-name">
        <label htmlFor="lastName">
          Last name<span className="warning-span">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          id="last-name"
          onChange={handleLastName}
        />
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
      <label htmlFor="email">
        Email<span className="warning-span">*</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleChange}
        value={user.email}
      />
    </div>
  );
};
const PasswordInput = ({ user, setUser, setError }) => {
  const handlePassword = (e) => {
    setError(null);
    setUser({ ...user, password: e.target.value });
  };
  const handleRepassowrd = (e) => {
    setError(null);
    setUser({ ...user, rePassword: e.target.value });
  };
  return (
    <>
      <div className="password">
        <label htmlFor="password">
          Password<span className="warning-span">*</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePassword}
          value={user.password}
        />
      </div>
      <div className="re-password">
        <label htmlFor="rePassword">
          Confirm password<span className="warning-span">*</span>
        </label>
        <input
          type="password"
          name="rePassword"
          id="re-password"
          onChange={handleRepassowrd}
          value={user.rePassword}
        />
      </div>
    </>
  );
};
const AddressInput = ({ user, setUser, setError }) => {
  const handleAddress1 = (e) => {
    setError(null);
    setUser({ ...user, address1: e.target.value });
  };
  const handleAddress2 = (e) => {
    setError(null);
    setUser({ ...user, address2: e.target.value });
  };
  return (
    <div className="address">
      <label htmlFor="address">
        Address<span className="warning-span">*</span>
      </label>
      <input
        type="text"
        name="address1"
        id="address-1"
        onChange={handleAddress1}
      />
      <input
        type="text"
        name="address2"
        id="address-2"
        onChange={handleAddress2}
      />
    </div>
  );
};
const CityInput = ({ user, setUser, setError }) => {
  const handleCity = (e) => {
    setError(null);
    setUser({ ...user, city: e.target.value });
  };
  const handleState = (e) => {
    setError(null);
    setUser({ ...user, state: e.target.value });
  };
  return (
    <div className="city">
      <div className="city-name">
        <label htmlFor="city">
          City<span className="warning-span">*</span>
        </label>
        <input type="text" name="city" id="city" onChange={handleCity} />
      </div>
      <div className="state">
        <label htmlFor="state">
          State, Province or Region<span className="warning-span">*</span>
        </label>
        <input type="text" name="state" id="state" onChange={handleState} />
      </div>
    </div>
  );
};
const ZipCodeInput = ({ user, setUser, setError }) => {
  const handleZipcode = (e) => {
    setError(null);
    setUser({ ...user, zipCode: e.target.value });
  };
  return (
    <div className="zip-code">
      <label htmlFor="zipCode">ZIP / Postal code</label>
      <input
        type="text"
        name="zipCode"
        id="zip-code"
        onChange={handleZipcode}
      />
    </div>
  );
};
const PhoneInput = ({ user, setUser, setError }) => {
  const handlePhone = (e) => {
    setError(null);
    setUser({ ...user, phoneNumber: e.target.value });
  };
  return (
    <div className="phone-number">
      <label htmlFor="phoneNumber">Mobile phone number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phone-number"
        onChange={handlePhone}
        value={user.phoneNumber}
      />
    </div>
  );
};
const SubmitButton = () => {
  return (
    <div className="submit">
      <button type="submit">Create Account</button>
    </div>
  );
};
const LoginBack = () => {
  return (
    <div className="login-page">
      <Link to="/login">Log In</Link>
    </div>
  );
};
const WaringSign = () => {
  return (
    <div className="warning">
      <i>
        <small>
          <span className="warning-span">*</span>require
        </small>
      </i>
    </div>
  );
};
const WarningMessage = ({ error, setError }) => {
  return (
    <div className="incorrect">
      <div className="message">{error}</div>
      <div className="symbol">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => setError(null)}
        >
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
export default Signup;
