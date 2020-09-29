import React from "react";

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

export default PhoneInput;
