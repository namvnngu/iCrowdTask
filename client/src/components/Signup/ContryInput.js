import React, { useEffect } from "react";
import countryList from "../../data/country";

const CountryInput = ({ user, setUser, setError }) => {
  useEffect(() => {
    let countrySelect = document.getElementById("country");
    const optionTemplate = (country) =>
      `<option value="${country}">${country}</option>`;
    let options = `<option value="" disabled hidden selected>Choose from list</option>`;
    countryList.map((country) => {
      options += optionTemplate(country);
      return [];
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

export default CountryInput;
