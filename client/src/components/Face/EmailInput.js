import React from "react";

const EmailInput = ({ email, setEmail, setError }) => {
  const handleChange = (e) => {
    setError(null);
    setEmail(e.target.value);
  };
  return (
    <div className="email">
      <label forhtml="email"></label>
      <input
        type="email"
        name="email"
        id="email"
        required
        onChange={handleChange}
        value={email}
      />
    </div>
  );
};

export default EmailInput;
