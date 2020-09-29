import React from "react";

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

export default PasswordInput;
