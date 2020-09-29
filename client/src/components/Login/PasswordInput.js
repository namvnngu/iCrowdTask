import React from "react";

const PasswordInput = ({ user, setUser, setError }) => {
  const handleChange = (e) => {
    setError(null);
    setUser({ ...user, password: e.target.value });
  };
  return (
    <div className="password">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        onChange={handleChange}
        value={user.password}
      />
    </div>
  );
};

export default PasswordInput;
