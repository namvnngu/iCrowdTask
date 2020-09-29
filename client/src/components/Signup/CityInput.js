import React from "react";

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

export default CityInput;
