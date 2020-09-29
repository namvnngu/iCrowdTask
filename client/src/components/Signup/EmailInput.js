import React from "react";

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

export default EmailInput;
