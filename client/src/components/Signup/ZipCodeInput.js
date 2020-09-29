import React from "react";

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

export default ZipCodeInput;
