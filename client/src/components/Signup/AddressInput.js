import React from "react";

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

export default AddressInput;
