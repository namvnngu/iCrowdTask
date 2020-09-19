import React, { useEffect } from "react";
import countryList from "../data/country";

const Signup = () => {
  return (
    <div className="registration">
      <div className="form-name">
        <h2>Create an iCrowdTask account</h2>
      </div>
      <form className="form-body">
        <WaringSign />
        <WarningMessage />
        <CountryInput />
        <NameInput />
        <EmailInput />
        <PasswordInput />
        <AddressInput />
        <CityInput />
        <ZipCodeInput />
        <PhoneInput />
        <SubmitButton />
      </form>
      <LoginBack />
    </div>
  );
};

const CountryInput = () => {
  return (
    <div className="country" id="country-list">
      <label htmlFor="country">
        Country of residence<span className="warning-span">*</span>
      </label>
      <select name="country" id="country"></select>
    </div>
  );
};
const NameInput = () => {
  return (
    <div className="name">
      <div className="first-name">
        <label htmlFor="firstName">
          First name<span className="warning-span">*</span>
        </label>
        <input type="text" name="firstName" id="first-name" />
      </div>
      <div className="last-name">
        <label htmlFor="lastName">
          Last name<span className="warning-span">*</span>
        </label>
        <input type="text" name="lastName" id="last-name" />
      </div>
    </div>
  );
};
const EmailInput = () => {
  return (
    <div className="email">
      <label htmlFor="email">
        Email<span className="warning-span">*</span>
      </label>
      <input type="email" name="email" id="email" />
    </div>
  );
};
const PasswordInput = () => {
  return (
    <>
      <div className="password">
        <label htmlFor="password">
          Password<span className="warning-span">*</span>
        </label>
        <input type="password" name="password" id="password" />
      </div>
      <div className="re-password">
        <label htmlFor="rePassword">
          Confirm password<span className="warning-span">*</span>
        </label>
        <input type="password" name="rePassword" id="re-password" />
      </div>
    </>
  );
};
const AddressInput = () => {
  return (
    <div className="address">
      <label htmlFor="address">
        Address<span className="warning-span">*</span>
      </label>
      <input type="text" name="address1" id="address-1" />
      <input type="text" name="address2" id="address-2" />
    </div>
  );
};
const CityInput = () => {
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

  return (
    <div className="city">
      <div className="city-name">
        <label htmlFor="city">
          City<span className="warning-span">*</span>
        </label>
        <input type="text" name="city" id="city" />
      </div>
      <div className="state">
        <label htmlFor="state">
          State, Province or Region<span className="warning-span">*</span>
        </label>
        <input type="text" name="state" id="state" />
      </div>
    </div>
  );
};
const ZipCodeInput = () => {
  return (
    <div className="zip-code">
      <label htmlFor="zipCode">ZIP / Postal code</label>
      <input type="text" name="zipCode" id="zip-code" />
    </div>
  );
};
const PhoneInput = () => {
  return (
    <div className="phone-number">
      <label htmlFor="phoneNumber">Mobile phone number</label>
      <input type="text" name="phoneNumber" id="phone-number" />
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
      <a href="/login">Log In</a>
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
const WarningMessage = () => {
  return (
    <div className="incorrect" style={{}}>
      <div className="message"></div>
      <div className="symbol">
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
export default Signup;
